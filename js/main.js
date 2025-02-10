const moon = document.querySelector(".fa-moon"),
    sun = document.querySelector(".fa-sun"),
    input = document.getElementById("input"),
    form = document.querySelector("form"),
    span = document.querySelector("span"),
    todoTaskes = document.querySelector(".todo_added_item"),
    showToDoRes = document.querySelector(".show_toDo_res"),
    clearBtn = document.querySelector(".clearBtn"),
    itemCounter = document.querySelector("#item_counter"),
    showModal = document.querySelector(".showModal"),
    closeModal = document.querySelector(".closeModal"),
    lists = document.querySelectorAll("li")

let names = JSON.parse(localStorage.getItem("names")) || [];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const updateTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
    moon.style.display = theme === "dark" ? "none" : "block";
    sun.style.display = theme === "dark" ? "block" : "none";
    localStorage.setItem("theme", theme);
};

updateTheme(localStorage.getItem("theme") || "light");
moon.onclick = () => updateTheme("dark");
sun.onclick = () => updateTheme("light");

form.onsubmit = (e) => {
    e.preventDefault();
    const taskTitle = input.value.trim();
    if (taskTitle.length < 4) {
        alert("Please fill out this field.");
        return;
    }
    const now = new Date(), amOrPm = now.getHours() >= 12 ? "pm" : "am";
    names.push({
        title: input.value,
        description: `This task created at ${now.getFullYear()} year ${now.getDate()} ${months[now.getMonth()]}...`,
        createdDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${daysOfWeek[now.getDay()]}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${amOrPm}`,
        status: "active",
        id: Date.now()
    });
    localStorage.setItem("names", JSON.stringify(names));
    input.value = "";
    span.style.visibility = "visible";
    resTesk();
};

input.oninput = () => span.style.visibility = input.value ? "hidden" : "visible";

const resTesk = () => {
    todoTaskes.innerHTML = names.map(({ id, title }) =>
        `<div class="todo_taskes">
            <div class="todo_taskes_task">
                <input type="checkbox" class="custom-checkbox" data-id="${id}">
                <p class="text" data-id="${id}">${title}</p>
            </div>
            <i class="fa-solid fa-xmark" data-id="${id}"></i>
        </div>`).join("");

    document.querySelectorAll(".fa-xmark").forEach(btn =>
        btn.onclick = (e) => deleteItem(Number(e.target.dataset.id)));

    document.querySelectorAll(".custom-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            const id = Number(e.target.dataset.id);
            const task = names.find((task) => task.id === id);
            if (task) {
                task.status = e.target.checked ? "completed" : "active";
            }
        });
    });

    showToDoRes.style.display = names.length ? "flex" : "none";
    itemCounter.textContent = names.length;

    document.querySelectorAll(".text").forEach((item) => {
        item.addEventListener("click", () => {
            showModal.style.display = "flex";
            const id = Number(item.dataset.id);
            const task = names.find((task) => task.id === id);
            if (task) {
                showModal.innerHTML =
                    `<div class="modal">
                        <div class="modalText">
                            <h1>Task details</h1>
                            <i class="fa-solid fa-xmark closeModal"></i>
                        </div>
                            <p>Title: <span> ${task.title}</span></p>
                            <p>Description: <span> ${task.description}</span></p>
                            <p>Created date: <span> ${task.createdDate}</span></p>
                            <p>Status: <span> ${task.status}</span></p>
                            <p>Task ID: <span> ${task.id}</span></p>
                     </div>
                    `
            }
        })

    })

};
const deleteItem = (id) => {
    names = names.filter(item => item.id !== id);
    localStorage.setItem("names", JSON.stringify(names));
    resTesk();
};

window.onload = resTesk;

clearBtn.addEventListener("click", () => {
    names = names.filter(item => ![...document.querySelectorAll(".custom-checkbox:checked")].map(checkbox => +checkbox.closest(".todo_taskes").querySelector(".fa-xmark").dataset.id).includes(item.id)
    );
    localStorage.setItem("names", JSON.stringify(names));
    resTesk();
});

document.addEventListener("click", (e) => {
    const showModal = document.querySelector(".showModal");
    const closeModal = document.querySelector(".closeModal");
    if (e.target === closeModal) {
        showModal.style.display = "none";
    }
});

lists.forEach((list) => {
    list.addEventListener("click", () => {
        
    })
})
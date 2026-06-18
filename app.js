const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

// load tasks when page opens
window.addEventListener("load", function () {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => renderTask(task));
    }
});

// save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// render task on screen
function renderTask(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        span.style.textDecoration = "line-through";
    }

    span.addEventListener("click", function () {
        task.completed = !task.completed;
        saveTasks();
        taskList.innerHTML = "";
        tasks.forEach(renderTask);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        taskList.innerHTML = "";
        tasks.forEach(renderTask);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// add task
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTask(task);

    taskInput.value = "";
});
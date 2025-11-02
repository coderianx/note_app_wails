import { LoadTasks, SaveTasks } from "../wailsjs/go/main/App.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector("#taskInput");
  const addBtn = document.querySelector("#addBtn");
  const loadBtn = document.querySelector("#loadBtn");
  const saveBtn = document.querySelector("#saveBtn");
  const toggleThemeBtn = document.querySelector("#toggleThemeBtn");
  const taskList = document.querySelector("#taskList");

  let tasks = [];

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      li.className = task.completed ? "completed" : "";
      li.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const delBtn = document.createElement("button");
      delBtn.innerHTML = '<i class="fas fa-trash"></i>';
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        renderTasks();
      });

      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  };

  addBtn.addEventListener("click", () => {
    const title = taskInput.value.trim();
    if (title === "") return;
    tasks.push({ title, completed: false });
    taskInput.value = "";
    renderTasks();
  });

  loadBtn.addEventListener("click", async () => {
    const loaded = await LoadTasks();
    if (loaded) tasks = loaded;
    renderTasks();
  });

  saveBtn.addEventListener("click", async () => {
    const msg = await SaveTasks(tasks);
    alert(msg);
  });

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});

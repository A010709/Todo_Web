// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <span class="action-btn complete-btn" title="Mark Complete">✅  </span>
        <span class="action-btn delete-btn" title="Delete Task">❌</span>
      </div>
    `;

    // Complete button
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
  }
});

// Add task on Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Initial render
renderTasks();


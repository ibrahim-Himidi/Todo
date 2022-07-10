const submitBtn = document.querySelector(".add");
const input = document.getElementById("value");
const tasksBox = document.querySelector(".tasks .container");
const confirmContainer = document.querySelector(".confrim-box");
const cancelBtn = document.querySelector(".confrim-box .cancel");
const confrimToDeleteBtn = document.querySelector(
  ".confrim-box .confirm-delete"
);
("use strict");

let tasks = [];
function TaskFromLocalStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  retrievedTasks == null ? (tasks = []) : (tasks = retrievedTasks);
}
TaskFromLocalStorage();
storeTasks();

function readTasksFromArray() {
  let index = 0;
  tasksBox.innerHTML = "";
  for (let property of tasks) {
    tasksBox.innerHTML += `
            <div class="task ${property.taskDone ? "completed" : ""} ">
            <div class="text">
              <p>${property.taskTitle}</p>
              <time> <i class="fa-solid fa-hourglass-end"></i> ${
                property.date
              }</time>
            </div>
            <div>
            ${
              property.taskDone
                ? `
            <i class="fa-solid fa-xmark check bg-red"  onclick="completeTheTasks(${index})" ></i>
            `
                : `
            <i class="fa-solid fa-check check " onclick="completeTheTasks(${index})"></i>
            `
            }
               
               <i class="fa-solid fa-trash remove-btn" onclick="deleteTask(${index})" ></i>
            </div>
          </div>
    `;
    index++;
  }
}
readTasksFromArray();

submitBtn.addEventListener("click", () => {
  let taskVlue = input.value;
  let time = new Date();
  if (taskVlue) {
    let taskObj = {
      taskTitle: taskVlue,
      taskDone: false,
      date: `${time.toDateString()} | ${time.getHours()}:${time.getMinutes()}`,
    };

    tasks.push(taskObj);
    input.value = "";
    storeTasks();
    readTasksFromArray();
  }
});

// delete tasks
{
  let clobalIndex;
  function deleteTask(index) {
    clobalIndex = index;
    confirmContainer.style.display = "flex";
  }
  function confrimToDelete() {
    tasks.splice(clobalIndex, 1);
    confirmContainer.style.display = "none";
    storeTasks();
    readTasksFromArray();
  }
  function cancel() {
    confirmContainer.style.display = "none";
  }
}

// Complete the tasks
function completeTheTasks(index) {
  if (tasks[index].taskDone) {
    tasks[index].taskDone = false;
    storeTasks();
    readTasksFromArray();
  } else {
    tasks[index].taskDone = true;
    storeTasks();
    readTasksFromArray();
  }
}

// *************** localStorage ************************

function storeTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}

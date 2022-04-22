"use strict";
let submit = document.querySelector(".add");
let input = document.getElementById("value");
let tasksBox = document.querySelector(".tasks .container");
let tsk = document.querySelector(".tasks .container .task");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

dataFromLocalSt();




// add task
submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

function addTaskToArray(task) {
  let taskData = {
    id: Date.now(),
    title: task,
    completed: false,
  };
  arrayOfTasks.push(taskData);
  showData(arrayOfTasks); // ad element to page
  localStorageData(arrayOfTasks);
  // test
  console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));
}

function showData(arrayOfTasks) {
  tasksBox.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    tasksBox.innerHTML += `
    <div class="task" data-id="${task.id}" >
    <p>${task.title}</p>
    <div>
        <span   class="icon-check" id="tick" ></span>
        <span  class="icon-trash-o  del"></span>
    </div>
    </div>
    `;
    if (task.completed) {
      tsk.className = "task done";
    }
  });
}

function localStorageData(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function dataFromLocalSt() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    showData(tasks);
  }
}




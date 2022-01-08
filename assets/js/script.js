var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {

  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskPriceInput = document.querySelector("input[name='price']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
  var taskDataObj = {
    name1: "taskNameInput",
    name2: "taskPriceInput",
    type: "taskTypeInput"
  };

  createTaskEl(taskDataObj);
  
}; 

  var createTaskEl = function(taskDataObj) {
    

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  taskInfoEl.innerHTML = "<h5 class='task-name'>" + taskDataObj.name1 +  "</h5><h3 class='price'>" + taskDataObj.name2 + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);


  tasksToDoEl.appendChild(listItemEl);
  }
  
  formEl.addEventListener("submit", taskFormHandler); 
  
  
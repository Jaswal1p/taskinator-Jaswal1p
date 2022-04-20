var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskIdCounter = 0;

var taskFormHandler = function() {
  event.preventDefault();
  
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // validation: check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  var isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit);

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl
  // createTaskEl(taskDataObj);

  // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };

      createTaskEl(taskDataObj);
    }
  
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute

    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    // create div to hold task info and add to list item, give it class name and add HTML to div
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span";
    
    // add taskinfo to a list-item
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
  
    // add entire list-item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

}

var createTaskActions = function(taskId) {

  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleButtonEl = document.createElement("button");
  deleButtonEl.textContent = "Delete";
  deleButtonEl.className = "btn delete-btn";
  deleButtonEl.setAttribute("data-task-id", taskId)

  actionContainerEl.appendChild(deleButtonEl);

  var statusSelectEl = document.createElement("select");

  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create  option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;

};


var taskButtonHandler = function(event) {
  //console.log(event.target);

  var targetEl = event.target;

  // edit button was clicked

  if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    }

  // delete button was clicked

  else if (event.target.matches(".delete-btn")) {
    //console.log("you clicked a delete button!");

    // get the element's task id

    var taskId = event.target.getAttribute("data-task-id");
    // console.log(taskId);
    deleteTask(taskId);

  }

};

var editTask = function(taskId) {
  console.log("editing task #" + taskId);

  // get task list item element  
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // taskSelected.edit();

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  document.querySelector("input[name='task-name']").value = taskName;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
    
}

var completeEditTask = function(taskName, taskType, taskId) {
  // console.log(taskName, taskType, taskId);

  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";


};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // console.log(taskSelected);
  taskSelected.remove();
  
};

var taskStatusChangeHandler = function(event) {
   
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //console.log(event.target);

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};


pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);

  
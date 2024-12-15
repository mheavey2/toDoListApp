console.log("JS loaded");

// list html elements as variables
const addTaskButton = document.querySelector("#submit-button");
const userInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

// form event listener
// when submitted call add task function

todoForm.addEventListener("submit", function (event) {
  // prevent defalult form action, which refreshes the page
  event.preventDefault();
  const newTask = userInput.value.trim();

  if (newTask === "") {
    alert("Please enter a task");
    return;
  }
  addTask(newTask);
  //reset input field after adding task
  userInput.value = "";
});

// add tasks function
function addTask(task) {
  const listItem = document.createElement("li");

  // task details and checkbox section of each task item
  //   add task details
  const taskItem = document.createElement("span");
  taskItem.setAttribute("id", "task-item-span");
  listItem.appendChild(taskItem);
  const taskDetails = document.createElement("span");
  taskDetails.setAttribute("id", "task-details");
  taskDetails.textContent = task;
  taskItem.appendChild(taskDetails);
  // TODO: remove log
  console.log(taskItem.childNodes);

  // add checkbox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  taskItem.insertBefore(checkBox, taskDetails);

  //modify task section of each task item with edit & delete buttons
  const modifyTask = document.createElement("span");
  modifyTask.setAttribute("id", "modify-task-span");
  listItem.appendChild(modifyTask);
  // add edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<img src="./img/edit.png" alt="edit"  />';
  modifyTask.appendChild(editButton);

  // add delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<img src="./img/bin.png" alt="bin" />';
  // deleteButton.textContent = "Delete";
  modifyTask.appendChild(deleteButton);

  todoList.appendChild(listItem);

  // task completion update style to line through
  checkBox.addEventListener("change", function () {
    if (this.checked) {
      taskDetails.style.textDecoration = "line-through";
    } else {
      taskDetails.style.textDecoration = "none";
    }
  });

  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem);
  });

  // when edit button is clicked add contenteditable to allow edits and save them
  editButton.addEventListener("click", function () {
    if (!taskDetails.isContentEditable) {
      taskDetails.setAttribute("contenteditable", "true");
      taskDetails.classList.add("editing");

      taskDetails.focus();

      editButton.innerHTML = '<img src="./img/save.png" alt="save"   />';
    } else {
      taskDetails.setAttribute("contenteditable", "false");
      taskDetails.classList.remove("editing");
      taskDetails.blur();
      editButton.innerHTML = '<img src="./img/edit.png" alt="edit"  />';
    }
  });
}

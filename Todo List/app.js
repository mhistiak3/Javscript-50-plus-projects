// local state
let todos = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

let todoUpdate = "0";
// localstorage

// select dom elements
let todoInput = document.getElementById("todoInput");
let addBtn = document.querySelector(".addBtn");
let updateBtn = document.querySelector(".updateBtn");
let todosBox = document.querySelector(".todos");
showTodo();
todoInput.value = "";
// add task evens
addBtn.addEventListener("click", function () {
  // call addTodo
  addTodo();
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
});
// keyboard event
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodo();
  }
});
// Update Event
updateBtn.addEventListener("click", function () {
  updateTodo();
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
});
// todo add in array function
function addTodo() {
  let value = todoInput.value;
  if (value === "" || value.length > 100) {
    alartFun();
  } else {
    let data = {
      id: Date.now(),
      todo: value,
      isCompleted: false,
    };
    todos.push(data);
    todoInput.value = "";
  }
}

// input is empty and charecter is over 100
function alartFun() {
  alert("your text should between 1 and 100 caharecter");
}

// show data

function showTodo() {
  let allTodo = JSON.parse(localStorage.getItem("todos"))
    ? JSON.parse(localStorage.getItem("todos"))
    : todos;

  if (allTodo.length !== 0) {
    let totalHtml = "";
    totalHtml += allTodo
      .map(({ id, todo, isCompleted }) => {
        return `<div class="todo ${isCompleted ? "border-show" : ""}">
              <label class="checkboxCustom" for="checkBox-${id}">
                <input type="checkbox" ${
                  isCompleted ? "checked" : ""
                } id="checkBox-${id}" onchange="changeCompleteState(${id}, this.checked)" />
                <span class="checkmark"></span>
              </label>
              <p>${todo}</p>
              <div class="icons">
              <i class="fa-solid fa-pen-to-square" onclick="editTodo(${id})"></i>
             <i class="fa-solid fa-trash-can" onclick="deleteTodo(${id})"></i>
              </div>
            </div>`;
      })
      .join("");

    todosBox.innerHTML = totalHtml;
  } else {
    todosBox.innerHTML = "<h2>No Data found</h2>";
  }
}

// todo is completed or not function
function changeCompleteState(id, isCompleted) {
  todos = todos.map((todo) => {
    if (todo.id == id) {
      todo.isCompleted = isCompleted;
      return todo;
    } else {
      return todo;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

// delete todo
function deleteTodo(id) {
  let removeItem = todos.findIndex((todo) => todo.id == id);
  todos.splice(removeItem, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}
// edit todo
function editTodo(id) {
  let todo = todos.filter((todo) => {
    return todo.id === id;
  });
  todoInput.value = todo[0].todo;
  todoUpdate = todo[0].id;
  addBtn.classList.remove("showBtn");
  updateBtn.classList.add("showBtn");
}

//  updateTodo
function updateTodo() {
  todos = todos.map((todo) => {
    if (todo.id == todoUpdate) {
      todo.todo = todoInput.value;
      return todo;
    } else {
      return todo;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  todoUpdate = "0";
  addBtn.classList.add("showBtn");
  updateBtn.classList.remove("showBtn");
  todoInput.value = "";
}

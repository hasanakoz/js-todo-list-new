//* ======================================================
//*                     TODO APP
//* ======================================================

const addBtn = document.querySelector("#todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};
renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("please enter a task");
  } else {
    const newToDo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };
    createListElement(newToDo);
    todos.push(newToDo);
    localStorage.setItem("TODOS", JSON.stringify(todos));
    todoInput.value = "";
  }
});

function createListElement(newToDo) {
  const li = document.createElement("li");
  li.setAttribute("id", newToDo.id);

  newToDo.completed && li.classList.add("completed");

  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(newToDo.text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);
  todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todos = todos.filter((todo) => todo.id != id);
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }

  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("completed");
    todos.map((obj) => {
      if (obj.id == id) {
        obj.completed == true
          ? (obj.completed = false)
          : (obj.completed = true);
      }
      localStorage.setItem("TODOS", JSON.stringify(todos));
    });
    console.log(todos);
  }
});

todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

window.onload = function () {
  todoInput.focus();
};

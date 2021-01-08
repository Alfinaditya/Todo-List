const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter=document.querySelector('.filter')

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheckItem);
filter.addEventListener('click',filterItem)
document.addEventListener('DOMContentLoaded',showTodoLocalStorage)
function addTodo(event) {
    event.preventDefault();

    // todo div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo')

    //li
    const todoli = document.createElement('li')
    todoli.innerText = todoInput.value;
    todoli.classList.add('todo-item')
    tododiv.appendChild(todoli)

    // Store To Local Storage
    storeTodoLocalStorage(todoInput.value)

    //check mark button
    const checkButton = document.createElement('button')
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add('check-btn');
    tododiv.appendChild(checkButton)

    //delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn')
    tododiv.appendChild(deleteButton)

    //menaruh todo di list
    todoList.appendChild(tododiv)

    // membersihkan value input
    todoInput.value = "";
}
function filterItem(e) {
const todoItems=todoList.childNodes
switch (e.target.value) {
    case "all":
        todoItems.forEach(todoItem => {            
           todoItem.style.display='flex'
        });
        break;

    case "completed":     
        todoItems.forEach(todoItem => {           
           if (todoItem.classList.contains('completed')) {
               todoItem.style.display='flex'
           }else{
            todoItem.style.display='none'
           }
        });
        break;

        case "uncompleted":     
        todoItems.forEach(todoItem => {           
           if (todoItem.classList.contains('completed')) {
               todoItem.style.display='none'
           }else{
            todoItem.style.display='flex'
           }
        });
        break;     
    default:
        break;
}
}

function deleteAndCheckItem(x) {
    const item = x.target
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add("falling");
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        deleteLocalStorage(todo)
    }

    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle('completed')
    }
}

function storeTodoLocalStorage(todoInputValue) {
if (todoInputValue===undefined) {
    return
}
if (localStorage.getItem('todo-list')===null) {
    localStorage.setItem('todo-list','[]')
}
let todo_data=JSON.parse(localStorage.getItem('todo-list'))
todo_data.push(todoInputValue)
localStorage.setItem('todo-list',JSON.stringify(todo_data))
}

function showTodoLocalStorage() {
    let todo_data=JSON.parse(localStorage.getItem('todo-list'))
    todo_data.forEach(data => {
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo')

    //li
    const todoli = document.createElement('li')
    todoli.innerText=data
    todoli.classList.add('todo-item')
    tododiv.appendChild(todoli)

    //check mark button
    const checkButton = document.createElement('button')
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add('check-btn');
    tododiv.appendChild(checkButton)

    //delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn')
    tododiv.appendChild(deleteButton)

    //menaruh todo di list
    todoList.appendChild(tododiv)
});
}

function deleteLocalStorage(deleteTodoItem) {
let todo_data=JSON.parse(localStorage.getItem('todo-list'))
const todoItem= deleteTodoItem.childNodes[0].innerText   
let indexTodoData= todo_data.indexOf(todoItem)
todo_data.splice(indexTodoData,1)
localStorage.setItem('todo-list',JSON.stringify(todo_data))
}
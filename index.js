// VARIABLES

const $add = document.querySelector('.add');
const $btn = document.querySelector('.btn');
const $filter = document.querySelector('.todoFilter');
const $todo = document.querySelector('.todoList');

// EVENTS

$btn.addEventListener('click',addTodo);
$todo.addEventListener('click',removeTodo);
$filter.addEventListener('change',filterTodo);
document.addEventListener('DOMContentLoaded',loadPage);

// FUNCTIONS

function addTodo(e){
    e.preventDefault();
   if(!$add.value.trim())return;
   const div = document.createElement('div');
   div.classList.add('todo');
   const span1 = document.createElement('span');
   const span2 = document.createElement('span');
   span1.innerText = $add.value;
   span2.innerHTML = '<i class="fa-solid fa-check"></i>';
   span2.innerHTML += '<i class="fa-solid fa-trash"></i>';
   div.appendChild(span1);
   div.appendChild(span2);
   $todo.appendChild(div);
   saveInLocalStorage($add.value);
   $add.value = '';
}
function removeTodo(e){
    const item = e.target;
    const todo = item.parentElement.parentElement;
    if(item.classList[1] === 'fa-check'){
        todo.classList.toggle('completed');
    }
    if(item.classList[1] === 'fa-trash'){
        todo.classList.add('fall');
        removeFromLocalStorage(todo.children[0].innerText);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })
    }
}
function filterTodo(e){
    const todos = document.querySelectorAll('todo');
    todos.forEach(todo=>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
        }
    })
}
function saveInLocalStorage(text){
    let todos;
    if(localStorage.getItem('todos') === null)todos=[];
    else todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(text);
    localStorage.setItem('todos',JSON.stringify(todos))
}
function removeFromLocalStorage(text){
    let todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(text);
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos))
}
function loadPage(){
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(text=>{
        const div = document.createElement('div');
        div.classList.add('todo');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        span1.innerText = text;
        span2.innerHTML = '<i class="fa-solid fa-check"></i>';
        span2.innerHTML += '<i class="fa-solid fa-trash"></i>';
        div.appendChild(span1);
        div.appendChild(span2);
        $todo.appendChild(div);
    })
}
//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption  = document.querySelector(".filter-todo");

//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo);
document.addEventListener('DOMContentLoaded',getTodos);
//functions

function addTodo(event)
{
    //prevent from page loading...
    event.preventDefault();

    //creating todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //creating li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);


    //saving todos locally
    saveLocalTodos(todoInput.value);


    //check button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //delete button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //appent do list

    todoList.appendChild(todoDiv);

    //clear todo input
    todoInput.value = "";

}

function deleteCheck(event)
{
    const item  = event.target;
    //delete todo

    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;
        //to animation to take place before removing todo    
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        todo.classList.add('fall');
        removeLocalTodos(todo);
        
    }

    //check mark

    if(item.classList[0] === 'complete-btn')
    {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e)
{
    const todos = todoList.childNodes;
    //console.log(todos);
    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo)
{
    //checking existed todo list
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos()
{
    //console.log('hello');
    //checking existed todo list
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    
    
        //creating todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //creating li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    
    
    //check button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //delete button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //appent do list

    todoList.appendChild(todoDiv);
    });
    
    
}


function removeLocalTodos(todo)
{
    //checking existed todo list
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
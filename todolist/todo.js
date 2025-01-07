let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');
let todos = [];  //list to strore the todo items 

// Load todos from localStorage on window load
window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; // getItem - to get an item. if there is an item in local storage parse it else(||) store it as an empty array
    todos.forEach(todo => addtodo(todo)); // iterating through the todos list and calls the function addtodo() to store the items in todos list in the paragraph
    updateTaskCount();
};

// Add button click event listener
button.addEventListener('click', () => {
    let task = input.value.trim(); // Trim any whitespace

    // Check if input is not empty
    if (task != "") {
        todos.push(task);  //adds into the list that we created 
        localStorage.setItem('todos', JSON.stringify(todos));
        addtodo(task);  // calls the addtodo  function to display the item below the i/p box like a para
        input.value = ""; // Clears the input field after appending in list and calling function
        updateTaskCount();
    } else {
        alert("Please enter a task.");
    }
});

// Function to add a todo item to the list
function addtodo(todo) {
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');

    let para = document.createElement('p');  // creates a para element
    para.innerText = todo;                  // this will show the todo items entered as a paragraph
    
    let deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '&#10060;'; // Unicode for a delete (cross) icon
    deleteIcon.classList.add('delete-icon');
    
    // Add delete functionality
    deleteIcon.addEventListener('click', () => {
        todoList.removeChild(todoContainer);
        remove(todo);
        updateTaskCount();
    });
    
    todoContainer.appendChild(para);  // adds the todo items in para (shown below the i/p box)
    todoContainer.appendChild(deleteIcon);  // adds del icon along with the item
    todoList.appendChild(todoContainer); // adds in list
    
    // Add single-click event for marking as complete
    para.addEventListener('click', () => {
        para.style.textDecoration = 'line-through';
        remove(todo);
        updateTaskCount();
    });
}

// Function to remove a todo item from the list and update localStorage
function remove(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {                     // to check if there is a todo to remove (index > -1)
        todos.splice(index, 1);           // splice -- to remove ; 1 -- one element 
    }
    localStorage.setItem('todos', JSON.stringify(todos));  // updating the local storage(del removed elem) with updated list
}

function updateTaskCount() {
    taskCount.innerText = `You have ${todos.length} task(s) to complete!`;
}  

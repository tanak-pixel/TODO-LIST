// Select DOM Elements 
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todoList');

// Try to load saved todos from local storage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Function to Save todo array to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo object and append it to the list 
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // Checkbox to mark todo as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    });

    // Text of the todo 
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Add double click event listener to edit todo 
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button to remove todo
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    // Append elements to li
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// Render the whole todo list from todo array 
function render() {
    list.innerHTML = '';

    // Recreate each item 
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    // Push a new todo object 
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener('click', addTodo);

// Allow pressing Enter to add
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render 
render();

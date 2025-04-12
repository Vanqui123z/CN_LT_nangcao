


function navigateTo(path, btnId, event) {
    if (event) {
        event.preventDefault(); // Prevent default link behavior
    }

    // Update URL without page reload
    history.pushState({ path: path }, '', path);

    // Update the UI to show the correct tab
    changeTabByPath(path);
}

// Handle browser back/forward buttons
window.onpopstate = function (event) {
    const path = window.location.pathname;
    changeTabByPath(path);
};


// Change tab based on URL path
function changeTabByPath(path) {
    let tabName;

    // Convert path to tab name
    if (path === '/' || path === '/calendar') {
        tabName = 'calendar';
    } else if (path === '/todolist') {
        tabName = 'todolist';
    } else if (path === '/plan') {
        tabName = 'plan';
    } else if (path === '/profile') {
        tabName = 'profile';
    } else {
        // Default to calendar if path is unknown
        tabName = 'calendar';
    }

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('d-none');
    });

    // Show selected tab content
    document.getElementById(tabName + '-content').classList.remove('d-none');

    // Update active button styling
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName + 'Btn').classList.add('active');
}

// Todo list functionality
let todoItems = [
    { id: 1, text: 'Edit Project Video', isCompleted: true },
    { id: 2, text: 'Upload Project Video', isCompleted: true },
    { id: 3, text: 'Record New Video', isCompleted: false },
    { id: 4, text: 'Thanks for Watching', isCompleted: false }
];

function renderTodoItems() {
    const todoList = document.getElementById('todo-items');
    if (!todoList) return;

    todoList.innerHTML = '';
    todoItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'task-item';
        itemElement.innerHTML = `
            <span class="${item.isCompleted ? 'completed-task' : ''}">${item.text}</span>
            <div>
                <button class="btn btn-sm" onclick="toggleComplete(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
                <button class="btn btn-sm" onclick="deleteTodoItem(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>
            </div>
        `;
        todoList.appendChild(itemElement);
    });
}

function addTodoItem() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText) {
        const newId = todoItems.length > 0 ? Math.max(...todoItems.map(item => item.id)) + 1 : 1;
        todoItems.push({ id: newId, text: taskText, isCompleted: false });
        newTaskInput.value = '';
        renderTodoItems();

        // Show success message
        const successMsg = document.getElementById('success-message');
        successMsg.classList.remove('d-none');
        setTimeout(() => {
            successMsg.classList.add('d-none');
        }, 3000);
    }
}

function deleteTodoItem(id) {
    todoItems = todoItems.filter(item => item.id !== id);
    renderTodoItems();
}

function toggleComplete(id) {
    todoItems = todoItems.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    renderTodoItems();
}

// Handle the "Enter" key in the todo input
document.addEventListener('DOMContentLoaded', function () {

    const path = window.location.pathname;
    changeTabByPath(path === '/' ? '/calendar' : path);

    // Handle the "Enter" key in the todo input
    const newTaskInput = document.getElementById('new-task');
    if (newTaskInput) {
        newTaskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addTodoItem();
            }
        });
    }

    // Initialize the todo list
    renderTodoItems();

    // Initialize collapsible plan months
    const collapseButtons = document.querySelectorAll('.plan-collapse-btn');
    collapseButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-bs-target');
            const icon = this.querySelector('.bi');
            if (icon.classList.contains('bi-chevron-down')) {
                icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
            } else {
                icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
            }
        });
    });

    const toggleBtn = document.getElementById('toggleSizeBtn');
    const toggleIcon = document.getElementById('toggleIcon');
    // const contentArea = document.querySelector('.content-area'); 

    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        if (isExpanded) {
            toggleIcon.classList.replace('bi-arrows-fullscreen', 'bi-arrows-angle-contract');
            contentArea.classList.add('expanded-mode');
        } else {
            toggleIcon.classList.replace('bi-arrows-angle-contract', 'bi-arrows-fullscreen');
            contentArea.classList.remove('expanded-mode');
        }
    });
});

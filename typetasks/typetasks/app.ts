import { Task, TaskStatus, addTask, completeTask, filterStatus, deleteTask } from './model.js';

let tasks: Task[] = [];
let currentFilter: 'all' | TaskStatus = 'all';

// DOM Elements with Type Casting
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
const filterContainer = document.getElementById('filter-controls') as HTMLDivElement;

// Render function updates the DOM based on our typed data
function render() {
    taskList.innerHTML = '';
    
    // Apply filter
    let displayedTasks = tasks;
    if (currentFilter !== 'all') {
        displayedTasks = filterStatus(tasks, currentFilter);
    }

    // Build the UI for each task
    displayedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-card ${task.status}`;
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;
        titleSpan.className = 'task-title';

        const badgeSpan = document.createElement('span');
        badgeSpan.textContent = task.status.replace('-', ' ').toUpperCase();
        badgeSpan.className = `badge badge-${task.status}`;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        if (task.status !== 'done') {
            const completeBtn = document.createElement('button');
            completeBtn.textContent = '✓ Done';
            completeBtn.className = 'btn-complete';
            completeBtn.onclick = () => {
                tasks = completeTask(tasks, task.id);
                render();
            };
            actionsDiv.appendChild(completeBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(titleSpan);
        li.appendChild(badgeSpan);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}

// Add a new task
addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
        tasks = addTask(tasks, title);
        taskInput.value = '';
        render();
    }
});

// Filter tasks
filterContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
        // Update active button styling
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Update state and re-render
        currentFilter = target.dataset.filter as 'all' | TaskStatus;
        render();
    }
});
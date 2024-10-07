class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.columns = [
            { id: 'todo', title: 'TO DO', number: 1 },
            { id: 'inprogress', title: 'IN PROGRESS', number: 2 },
            { id: 'done', title: 'DONE', number: 3 }
        ];
    }

    initializeBoard() {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = '';

        this.columns.forEach(column => {
            const columnElement = this.createColumnElement(column);
            boardContainer.appendChild(columnElement);
        });

        this.renderAllTasks();
    }

    createColumnElement(column) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'col-12 col-md-4';
        columnDiv.innerHTML = `
            <div class="task-column">
                <div class="column-header">
                    <div class="status-indicator">
                        <span class="circled-number bg-primary rounded-circle task-counter" data-column="${column.id}">
                            ${this.getTasksByStatus(column.id).length}
                        </span>
                        <span class="column-title">${column.title}</span>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" data-status="${column.id}">
                        <span class="oi oi-plus">+</span> New Task
                    </button>
                </div>
                <div class="tasks-container" id="${column.id}-tasks"></div>
            </div>
        `;

        const addButton = columnDiv.querySelector(`button[data-status="${column.id}"]`);
        addButton.addEventListener('click', () => window.modalController.openTaskModal(column.id));

        return columnDiv;
    }

    addTask(task) {
        task.id = Date.now();
        this.tasks.push(task);
        this.saveTasks();
        this.renderAllTasks();
    }

    updateTask(taskId, updatedTask) {
        const index = this.tasks.findIndex(task => task.id === parseInt(taskId));
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            this.saveTasks();
            this.renderAllTasks();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== parseInt(taskId));
        this.saveTasks();
        this.renderAllTasks();
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    getTaskById(taskId) {
        return this.tasks.find(task => task.id === parseInt(taskId));
    }

    renderAllTasks() {
        this.columns.forEach(column => {
            const container = document.getElementById(`${column.id}-tasks`);
            container.innerHTML = '';
            
            this.getTasksByStatus(column.id).forEach(task => {
                const taskCard = new TaskCard(task);
                container.appendChild(taskCard.createCard());
            });

            const counter = document.querySelector(`.task-counter[data-column="${column.id}"]`);
            counter.textContent = this.getTasksByStatus(column.id).length;
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

window.taskManager = new TaskManager();
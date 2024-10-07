class ModalController {
    constructor() {
        this.modal = null;
        this.currentTaskId = null;
        this.initialize();
    }

    initialize() {
        this.modal = new bootstrap.Modal(document.getElementById('taskModal'));
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.saveTask());
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });
    }

    openTaskModal(status = 'todo', taskId = null) {
        this.currentTaskId = taskId;
        const form = document.getElementById('taskForm');
        const modalTitle = document.getElementById('taskModalLabel');

        if (taskId) {
            const task = window.taskManager.getTaskById(taskId);
            if (task) {
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description;
                document.getElementById('taskStatus').value = task.status;
                modalTitle.textContent = 'Edit Task';
            }
        } else {
            form.reset();
            document.getElementById('taskStatus').value = status;
            modalTitle.textContent = 'New Task';
        }

        this.modal.show();
    }

    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const status = document.getElementById('taskStatus').value;

        if (!title) return;

        const taskData = { title, description, status };

        if (this.currentTaskId) {
            window.taskManager.updateTask(this.currentTaskId, taskData);
        } else {
            window.taskManager.addTask(taskData);
        }

        this.modal.hide();
    }
}

window.modalController = new ModalController();
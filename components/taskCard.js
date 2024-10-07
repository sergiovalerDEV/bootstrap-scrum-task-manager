class TaskCard {
    constructor(task) {
        this.task = task;
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = this.getCardHTML();
        this.attachEventListeners(card);
        return card;
    }

    getCardHTML() {
        return `
            <div class="task-content">
                <h5 class="task-title" title="${this.escapeHtml(this.task.title)}">
                    ${this.escapeHtml(this.task.title)}
                </h5>
                <p class="task-description" title="${this.escapeHtml(this.task.description)}">
                    ${this.escapeHtml(this.task.description)}
                </p>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-outline-primary edit-btn" data-task-id="${this.task.id}">
                    Edit
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-task-id="${this.task.id}">
                    Delete
                </button>
            </div>
        `;
    }

    attachEventListeners(card) {
        const editBtn = card.querySelector('.edit-btn');
        const deleteBtn = card.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => {
            window.modalController.openTaskModal(this.task.status, this.task.id);
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                window.taskManager.deleteTask(this.task.id);
            }
        });
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
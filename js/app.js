document.addEventListener('DOMContentLoaded', () => {
    window.taskManager.initializeBoard();
    
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const taskModal = document.getElementById('taskModal');
    taskModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('taskForm').reset();
    });
});
class TaskService {
    constructor(repository) {
        this.repository = repository;
    }

    createTask(title) {
        return this.repository.create(title);
    }

    getAllTasks() {
        return this.repository.getAll();
    }

    getTask(id) {
        return this.repository.getById(id);
    }

    deleteTask(id) {
        return this.repository.delete(id);
    }
}

module.exports = TaskService;
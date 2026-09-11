class TaskService {
    constructor(repository) {
        this.repository = repository;
    }

    async createTask(title) {
        return await this.repository.create(title);
    }

    async getAllTasks() {
        return await this.repository.getAll();
    }

    async getTask(id) {
        return await this.repository.getById(id);
    }

    async deleteTask(id) {
        return await this.repository.delete(id);
    }
}

module.exports = TaskService;
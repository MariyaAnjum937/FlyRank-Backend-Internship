class MemoryRepository {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    create(title) {
        const task = {
            id: this.nextId,
            title: title
        };

        this.tasks.push(task);
        this.nextId++;

        return task;
    }

    getAll() {
        return this.tasks;
    }

    getById(id) {
        return this.tasks.find(task => task.id === id);
    }

    delete(id) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return false;
        }

        this.tasks.splice(index, 1);
        return true;
    }
}

module.exports = MemoryRepository;
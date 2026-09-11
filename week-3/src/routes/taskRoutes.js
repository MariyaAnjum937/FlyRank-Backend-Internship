const express = require("express");

const MemoryRepository = require("../repositories/memoryRepository");
const TaskService = require("../services/taskService");

const router = express.Router();

const repository = new MemoryRepository();
const service = new TaskService(repository);


router.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const task = service.createTask(title);

    res.status(201).json(task);
});


router.get("/tasks", (req, res) => {
    const tasks = service.getAllTasks();

    res.json(tasks);
});


router.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = service.getTask(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});


router.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const deleted = service.deleteTask(id);

    if (!deleted) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json({
        message: "Task deleted successfully"
    });
});


module.exports = router;
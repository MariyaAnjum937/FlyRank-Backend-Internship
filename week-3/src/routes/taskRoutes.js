const express = require("express");
const service = require("../container");
const router = express.Router();

router.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const task = await service.createTask(title);

    res.status(201).json(task);
});


router.get("/tasks", async (req, res) => {
    const tasks = await service.getAllTasks();

    res.json(tasks);
});


router.get("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const task = await service.getTask(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});


router.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const deleted = await service.deleteTask(id);

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
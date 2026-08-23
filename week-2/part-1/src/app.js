const express = require('express');
const app = express();

//middleware
app.use(express.json());


let tasks = [
    {
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build CRUD API",
        done: false
    },
    {
        id: 3,
        title: "Practice REST APIs",
        done: true
    }
];



// getting taks

app.get('/get-tasks', (req, res)=>{
    res.json({
        message : 'fetched tasks successfully.',
        tasks : tasks
    })
})


// get a particular task

app.get('/get-tasks/:id', (req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);


    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(200).json({
        message : "fetched task successfully.",
        task : task
    })
})





app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message : "task created successfully.",
        task : newTask
    });
});


// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (done !== undefined) {
        task.done = done;
    }

    res.json(task);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json(deletedTask);
});


module.exports = app;
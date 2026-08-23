const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res)=> {
    res.json({
        message : 'Hello from FlyRank!'
    });
});

app.get('/about', (req, res)=>{
    res.json({
        name : 'Mariya',
        role : 'Backend AI Engineering Intern'
    });
});

app.listen(PORT, ()=>{
    console.log(`server running on port http://localhost:${PORT}`);
})


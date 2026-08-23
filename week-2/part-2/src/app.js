const express = require('express');
const db = require('../src/db/db');
const app = express();

app.use(express.json());



app.get('/get', (req, res)=>{
    res.status(200).json({
        message : "api running successfully."
    })
})


app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(rows);
    });
});




app.post("/items", (req, res) => {
    const { name } = req.body;

    db.run(
        "INSERT INTO items (name) VALUES (?)",
        [name],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Database error" });
            }

            res.status(201).json({
                id: this.lastID,
                name: name
            });
        }
    );
});




app.put("/items/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.run(
        "UPDATE items SET name = ? WHERE id = ?",
        [name, id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Database error" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Item not found" });
            }

            res.json({
                id: Number(id),
                name: name
            });
        }
    );
});


app.delete("/items/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM items WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Database error" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Item not found" });
            }

            res.json({
                message: "Item deleted successfully"
            });
        }
    );
});

module.exports = app;
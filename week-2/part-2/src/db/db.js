const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database("./database.sqlite", (err)=>{
    if(err){
        console.log('error connecting to database', err.message);
    }else{
        console.log('connected to sqlite3 Database');
    }
})

db.run(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`);


module.exports = db;
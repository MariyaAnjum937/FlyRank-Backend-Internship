const pool = require("../db");

class PostgresRepository {
    async getAll() {
        const result = await pool.query("SELECT * FROM tasks");
        return result.rows;
    }
    
    async create(title) {
        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING id, title",
            [title]
        );

        return result.rows[0];
    }

    async getById(id) {
        const result = await pool.query(
            "SELECT id, title FROM tasks WHERE id = $1",
            [id]
        );

        return result.rows[0];
    }   

    async delete(id) {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );

        return result.rowCount > 0;
    }
}




module.exports = PostgresRepository;
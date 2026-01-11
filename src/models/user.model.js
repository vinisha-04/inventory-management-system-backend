import { pool } from '../config/db.js';

export const UserModel = {
    create: async ({ name, email, password, role }) => {
        const query =
            `INSERT INTO users (name, email, password, role) 
        VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role, created_at`;
        const values = [name, email, password, role];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = `SELECT * FROM users WHERE email = $1`;
        const values = [email];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    findById: async (user_id) => {
        const query = `SELECT user_id, name, email, role, created_at FROM users WHERE user_id = $1`;
        const values = [user_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}
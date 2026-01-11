import { pool } from "../config/db.js";

export const CustomerModel = {
  create: async ({ name, email, password, phone, address }) => {
    const { rows } = await pool.query(
      `INSERT INTO customers (name, email, password, phone,address)
       VALUES ($1, $2, $3, $4,$5)
       RETURNING customer_id, name, email, phone, address, created_at`,
      [name, email, password, phone, address]
    );
    return rows[0];
  },

  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT customer_id, name, email, phone, created_at
       FROM customers`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query(
      `SELECT customer_id, name, email, phone, created_at
       FROM customers WHERE customer_id = $1`,
      [id]
    );
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query(
      `SELECT * FROM customers WHERE email = $1`,
      [email]
    );
    return rows[0];
  },

  update: async (id, { name, phone }) => {
    const { rows } = await pool.query(
      `UPDATE customers
       SET name = $1, phone = $2
       WHERE customer_id = $3
       RETURNING customer_id, name, email, phone`,
      [name, phone, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    await pool.query(
      `DELETE FROM customers WHERE customer_id = $1`,
      [id]
    );
  }
};

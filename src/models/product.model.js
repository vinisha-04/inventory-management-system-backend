import { pool } from "../config/db.js";

export const ProductModel = {
  // Create product
  create: async ({ name, description, price, stock_level }) => {
    const query = `
      INSERT INTO product (name, description, price, stock_level)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, description, price, stock_level];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Get all products
  findAll: async () => {
    const { rows } = await pool.query("SELECT * FROM product ORDER BY product_id DESC");
    return rows;
  },

  // Get product by ID
  findById: async (id) => {
    const { rows } = await pool.query(
      "SELECT * FROM product WHERE product_id = $1",
      [id]
    );
    return rows[0];
  },

  // Update product
  update: async (id, { name, description, price, stock_level }) => {
    const query = `
      UPDATE product
      SET name=$1, description=$2, price=$3, stock_level=$4, updated_at=NOW()
      WHERE product_id=$5
      RETURNING *;
    `;
    const values = [name, description, price, stock_level, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Delete product
  delete: async (id) => {
    await pool.query("DELETE FROM product WHERE product_id=$1", [id]);
  }
};

import { pool } from "../config/db.js";

export const OrderModel = {

  // Create order + items
  create: async ({ customer_id, items }) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Create order
      const orderRes = await client.query(
        `INSERT INTO orders (customer_id)
         VALUES ($1)
         RETURNING *`,
        [customer_id]
      );

      const order = orderRes.rows[0];

      // Insert order items
      for (const item of items) {
        const productRes = await client.query(
          `SELECT price FROM product WHERE product_id = $1`,
          [item.product_id]
        );

        if (!productRes.rows.length) {
          throw new Error(`Product ${item.product_id} not found`);
        }

        const unitPrice = productRes.rows[0].price;
        const totalPrice = unitPrice * item.quantity;

        await client.query(
          `INSERT INTO order_items
           (order_id, product_id, quantity, price_at_order)
           VALUES ($1, $2, $3, $4)`,
          [order.order_id, item.product_id, item.quantity, totalPrice]
        );
      }

      await client.query("COMMIT");
      return order;

    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  // Get all orders
  findAll: async () => {
    const { rows } = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return rows;
  },

  // Get order by ID (with items)
  findById: async (id) => {
    const orderRes = await pool.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [id]
    );

    if (!orderRes.rows.length) return null;

    const itemsRes = await pool.query(
      `SELECT oi.*, p.name
       FROM order_items oi
       JOIN product p ON p.product_id = oi.product_id
       WHERE oi.order_id = $1`,
      [id]
    );

    return {
      order: orderRes.rows[0],
      items: itemsRes.rows
    };
  },

  // Update order status
  updateStatus: async (id, status) => {
    const { rows } = await pool.query(
      `UPDATE orders
       SET status = $1
       WHERE order_id = $2
       RETURNING *`,
      [status, id]
    );
    return rows[0];
  }
};

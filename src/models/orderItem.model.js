export const OrderItemModel = {

  create: async (client, data) => {
    const { order_id, product_id, quantity, price_at_order } = data;

    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price_at_order)
       VALUES ($1, $2, $3, $4)`,
      [order_id, product_id, quantity, price_at_order]
    );
  },

  findByOrderId: async (orderId, pool) => {
    const { rows } = await pool.query(
      `SELECT oi.*, p.name
       FROM order_items oi
       JOIN products p ON p.product_id = oi.product_id
       WHERE oi.order_id = $1`,
      [orderId]
    );
    return rows;
  }
};

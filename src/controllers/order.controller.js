import { OrderModel } from "../models/order.model.js";

export const OrderController = {

  createOrder: async (req, res) => {
    try {
      const { customer_id, items } = req.body;

      // Check permissions
      if (req.user.role === "CUSTOMER" && req.user.id !== customer_id) {
        return res.status(403).json({ message: "You can only create orders for yourself" });
      }

      const order = await OrderModel.create({ customer_id, items });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    const orders = await OrderModel.findAll();
    res.json(orders);
  },

  getOrderById: async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check permissions
    if (req.user.role === "CUSTOMER" && order.customer_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  },

  updateOrderStatus: async (req, res) => {
    const order = await OrderModel.updateStatus(
      req.params.id,
      req.body.status
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  }
};

import express from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create order
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "MANAGER", "STAFF", "CUSTOMER"),
  OrderController.createOrder
);

// Get all orders
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "MANAGER"),
  OrderController.getAllOrders
);

// Get order by ID
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "MANAGER", "STAFF", "CUSTOMER"),
  OrderController.getOrderById
);

// Update order status
router.put(
  "/:id/status",
  authMiddleware,
  authorize("ADMIN", "MANAGER"),
  OrderController.updateOrderStatus
);

export default router;

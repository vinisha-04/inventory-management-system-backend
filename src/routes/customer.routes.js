import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", CustomerController.registerCustomer);
router.post("/login", CustomerController.loginCustomer);

// Protected
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  CustomerController.createCustomer
);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "MANAGER"),
  CustomerController.getAllCustomers
);

router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "MANAGER", "CUSTOMER"),
  CustomerController.getCustomerById
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "CUSTOMER"),
  CustomerController.updateCustomer
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  CustomerController.deleteCustomer
);

export default router;

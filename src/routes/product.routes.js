import express from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",
    authMiddleware,
    authorize("ADMIN", "MANAGER", "STAFF"),
    ProductController.createProduct);
router.get("/",
    authMiddleware,
    authorize("ADMIN", "MANAGER", "STAFF"),
    ProductController.getAllProducts);
router.get("/:id",
    authMiddleware,
    authorize("ADMIN", "MANAGER", "STAFF"),
    ProductController.getProductById);
router.put("/:id",
    authMiddleware,
    authorize("ADMIN", "MANAGER"),
    ProductController.updateProduct);
router.delete("/:id",
    authMiddleware,
    authorize("ADMIN"),
    ProductController.deleteProduct);

export default router;




import express from "express";
import productRoutes from "./routes/product.routes.js";
import authRoutes from './routes/auth.routes.js';
import customerRoutes from './routes/customer.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

export default app;

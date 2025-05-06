import express from "express";
import cors from "cors";
import adminProductRouter from "./routes/admin/product.routes.js";
import adminOrderRouter from "./routes/admin/order.routes.js";
import authRouter from "./routes/auth/auth.routes.js";
import cartRouter from "./routes/shop/cart.routes.js";
import addressRouter from "./routes/shop/address.routes.js";
import orderRouter from "./routes/shop/order.routes.js";
import productReviewRouter from "./routes/shop/review.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//product route
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/reviews", productReviewRouter);

export default app;

import express from "express";
import cors from "cors";
import adminProductRouter from "./routes/admin/product.routes.js";
import adminOrderRouter from "./routes/admin/order.routes.js";
import authRouter from "./routes/auth/auth.routes.js";
import cartRouter from "./routes/shop/cart.routes.js";
import addressRouter from "./routes/shop/address.routes.js";
import orderRouter from "./routes/shop/order.routes.js";
import cookieParser from "cookie-parser";
const app = express();

//cors configure
const allowedOrigins = [
  process.env.FRONTEND_LOCAL_ORIGIN, // local development
  process.env.FRONTEND_ORIGIN, // netlify frontend
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

export default app;

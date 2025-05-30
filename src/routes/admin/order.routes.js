import express from "express";
import {
  getOrderDetailsForAdmin,
  getOrdersForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";
const route = express.Router();

route.get("/list", getOrdersForAdmin);
route.get("/details/:id", getOrderDetailsForAdmin);
route.patch("/update/:orderId", updateOrderStatus);

export default route;

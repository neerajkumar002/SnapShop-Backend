import express from "express";
import {
  capturePayment,
  createOrder,
  fetehOrdersList,
  getOrderDetails,
} from "../../controllers/shop/order.controller.js";

const route = express.Router();

route.post("/create", createOrder);
route.post("/capture", capturePayment);
route.get("/list/:userId", fetehOrdersList);
route.get("/details/:id", getOrderDetails);

export default route;

import express from "express";
import {
  addProductReviews,
  getProductReviews,
} from "../../controllers/shop/review.controller.js";

const route = express.Router();

route.post("/add", addProductReviews);
route.get("/:productId", getProductReviews);

export default route;

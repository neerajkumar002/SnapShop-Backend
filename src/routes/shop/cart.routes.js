import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../../controllers/shop/cart.controller.js";

const route = express.Router();

route.post("/add", addToCart);
route.get("/:userId", getCart);
route.delete("/clear/:userId/:cartId", clearCart);
route.delete("/:userId/:productId", removeCartItem);
route.patch("/updateCartItemQuantity", updateCartItemQuantity);

export default route;

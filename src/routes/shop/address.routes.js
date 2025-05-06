import express from "express";
import {
  addAddress,
  deleteAddress,
  fetchAllAddresses,
  getAddress,
  updateAddress,
} from "../../controllers/shop/address.controller.js";

const route = express.Router();

route.post("/add", addAddress);
route.get("/list/:userId", fetchAllAddresses);
route.get("/:id", getAddress);
route.put("/update/:userId/:addressId", updateAddress);
route.delete("/delete/:userId/:addressId", deleteAddress);

export default route;

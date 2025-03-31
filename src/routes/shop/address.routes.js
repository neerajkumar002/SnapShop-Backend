import express from "express";
import {
  addAddress,
  fetchAllAddresses,
  getAddress,
} from "../../controllers/shop/address.controller.js";

const route = express.Router();

route.post("/add", addAddress);
route.get("/:userId", fetchAllAddresses);
route.get("/:addressId", getAddress);

export default route;

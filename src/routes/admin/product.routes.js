import express from "express";
import {
  createProduct,
  fetchAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const route = express.Router();

route.post("/add", upload.single("image"), createProduct);
route.put("/update/:productId", upload.single("image"), updateProduct);
route.get("/get", fetchAllProducts);
route.delete("/:productId", deleteProduct);
route.get("/:productId", getProductById);

export default route;

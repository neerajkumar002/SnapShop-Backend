import express from "express";
import {
  checkAuth,
  login,
  register,
} from "../../controllers/auth/auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/checkAuth", authMiddleware, checkAuth);

export default route;

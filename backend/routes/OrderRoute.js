import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrder,
  placeOrder,
  updateStatus,
  usersOrder,
  verifyOrder,
} from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/placed", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, usersOrder);
orderRouter.get("/list", listOrder);
orderRouter.post("/status", updateStatus);

export default orderRouter;

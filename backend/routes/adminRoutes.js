import express from "express";
import { adminLogin, verifyToken } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/verify-token", verifyToken);

export default router;

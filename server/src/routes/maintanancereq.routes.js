import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createMaintenanceRequest, getMaintenanceRequestsByUser } from "../controllers/maintanancereq.controller.js";
const router = express.Router();

router.post("/create", authMiddleware, createMaintenanceRequest);
router.get("/getReqByUser", authMiddleware, getMaintenanceRequestsByUser);
export default router;

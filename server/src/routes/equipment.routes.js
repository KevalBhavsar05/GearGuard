import express from "express";
import { getAllEquipmentByDeptComp } from "../controllers/equipment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get(
  "/getAllEquipmentByDeptComp",
  authMiddleware,
  getAllEquipmentByDeptComp
);

export default router;

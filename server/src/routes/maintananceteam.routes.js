import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getTechnicianEquipmentByStage } from "../controllers/maintananceteam.controller.js";

const router = express.Router();

// router.get(
//   "/dashboard",
//   authMiddleware,
//   maintenanceTeamManagerDashboard
// );
router.get(
  "/technician/dashboard",
  authMiddleware,
  getTechnicianEquipmentByStage
);

export default router;

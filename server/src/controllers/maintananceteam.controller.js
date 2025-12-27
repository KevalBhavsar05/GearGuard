import maintananceteamModel from "../models/maintananceteam.model.js";
import maintenanceRequestModel from "../models/maintainancerequest.model.js";
import DepartmentModel from "../models/department.model.js";
import equipmentModel from "../models/equipment.model.js";
import mongoose from "mongoose";
// export const maintenanceTeamManagerDashboard = async (req, res) => {
//   try {
//     const userId = req.user._id;
    
//     const maintenanceTeam = await maintananceteamModel.findOne({
//       teamManager: userId,
//     });
//     console.log("Maintenance Team found:", maintenanceTeam);
//     const teamId = maintenanceTeam._id;

//     // 2️⃣ Total requests
//     const totalRequests = await maintenanceRequestModel.countDocuments({
//       maintenance_team_id: teamId,
//     });

//     const overdueRequests = await maintenanceRequestModel.countDocuments({
//       maintenance_team_id: teamId,
//       scheduled_date: { $lt: new Date() },
//       stage: { $nin: ["Repaired", "Scrap"] },
//     });

//     // 6️⃣ Recent requests (table)
//     const recentRequests = await maintenanceRequestModel
//       .find({ maintenance_team_id: teamId })
//       .populate("department_id")
//       .sort({ createdAt: -1 });

//     // 7️⃣ Final response
//     res.status(200).json({
//       totalRequests,
//       overdueRequests,
//       recentRequests,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };


export const getTechnicianEquipmentByStage = async (req, res) => {
  try {
    const technicianId = req.user._id;

    // 1️⃣ Find & populate using model refs
    const requests = await maintenanceRequestModel
      .find({ technician_id: technicianId })
      .populate("equipment_id")          // equipment.model.js
      .populate("department_id")         // department.model.js
      .populate("maintenance_team_id")   // maintananceteam.model.js
      .lean();

    // 2️⃣ Group by stage
    const grouped = requests.reduce((acc, req) => {
      const stage = req.stage || "New";
      acc[stage] = acc[stage] || [];
      acc[stage].push(req);
      return acc;
    }, {});

    // 3️⃣ Format response
    const result = Object.keys(grouped).map(stage => ({
      _id: stage,
      requests: grouped[stage],
    }));

    res.status(200).json({
      message: "Equipment grouped by stage",
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
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
    console.log("Technician ID:", technicianId);
   
    const result = await maintenanceRequestModel.aggregate([
      {
        $match: {
          technician_id: new mongoose.Types.ObjectId(technicianId),
        },
      },
      {
        $group: {
          _id: "$stage",
          requests: { $push: "$$ROOT" },
        },
      },
    ]);

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

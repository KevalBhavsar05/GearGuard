import MaintenanceRequest from "../models/maintainancerequest.model.js";
import Equipment from "../models/equipment.model.js";
import Department from "../models/department.model.js";
import MaintenanceTeam from "../models/maintananceteam.model.js";

export const createMaintenanceRequest = async (req, res) => {
  try {
    const {
      subject,
      request_type,
      equipment_id,
      department_id,
      maintenance_team_id,
      scheduled_date,
      duration_hours,
      notes,
    } = req.body;

    const maintananceteam = await MaintenanceTeam.findById(maintenance_team_id);
    const technician_id = maintananceteam
      ? maintananceteam.defaultTechnician // assign first technician
      : null;
    const userId = req.user.userId._id; // set by auth middleware

    // 🔍 Basic validation
    if (!subject || !request_type || !equipment_id || !department_id) {
      return res.status(400).json({
        message: "Subject, request type, equipment and department are required",
      });
    }

    // ✅ Optional: verify references exist (recommended)
    const equipment = await Equipment.findById(equipment_id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (maintenance_team_id) {
      const team = await MaintenanceTeam.findById(maintenance_team_id);
      if (!team) {
        return res.status(404).json({ message: "Maintenance team not found" });
      }
    }

    // 🧱 Create request
    const maintenanceRequest = await MaintenanceRequest.create({
      subject,
      request_type,
      equipment_id,
      department_id,
      maintenance_team_id,
      technician_id,
      scheduled_date,
      duration_hours: duration_hours ? duration_hours : 0,
      notes,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Maintenance request created successfully",
      data: maintenanceRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getMaintenanceRequestsByUser = async (req, res) => {
  try {
    const user = req.user;
    const requests = await MaintenanceRequest.find({
      created_by: user.userId._id,
    })
      .populate("equipment_id")
      .populate("technician_id", "-password");
    return res.status(200).json({ requests });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

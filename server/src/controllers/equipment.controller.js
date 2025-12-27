import Department from "../models/department.model.js";
import equipmentModel from "../models/equipment.model.js";

const addEquipment = async (req, res) => {};

export const getAllEquipmentByDeptComp = async (req, res) => {
  try {
    const user = req.user;
    const equipments = await equipmentModel
      .find({
        department_id: user.departmentId,
        companyId: user.companyId,
      })
      .populate("department_id")
      .populate("assigned_to", "-password");
    if (equipments.length === 0) {
      return res.status(404).json({
        message: "No equipment found for this department and company.",
      });
    }

    return res.status(200).json({ equipments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

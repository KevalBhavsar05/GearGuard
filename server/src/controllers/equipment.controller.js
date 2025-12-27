import maintainancerequest from "../models/maintainancerequest.model.js";
import equipmentModel from "../models/equipment.model.js";
const addEquipment = async (req, res) => {};
export const getAllEquipmentByDeptComp = async (req, res) => {
  try {
    const user = req.user;
    console.log();
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

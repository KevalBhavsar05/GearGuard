import api from "./axiosInstance";

export const getTechnicianEquipmentByStage = async () => {
  const res = await api.get("/maintenance/technician-equipment-by-stage");
  return res.data;
};
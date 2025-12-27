import api from "./axiosInstance";

export const getTechnicianEquipmentByStage = async () => {
  const res = await api.get("/maintenance/technician/dashboard");
  return res.data;
};

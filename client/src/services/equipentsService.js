import api from "./axiosInstance";

export const getEquipmentsByDeptAndCompany = async () => {
  const response = await api.get("/equipment/getAllEquipmentByDeptComp");
  return response.data;
};

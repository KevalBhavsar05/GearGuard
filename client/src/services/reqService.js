import api from "./axiosInstance";
export const raiseMaintenanceRequest = async (requestData) => {
  const response = await api.post("/maintanancereq/create", requestData);
  return response.data;
};
export const getMaintenanceRequestsByUser = async () => {
  const response = await api.get("/maintanancereq/getReqByUser");
  return response.data;
};

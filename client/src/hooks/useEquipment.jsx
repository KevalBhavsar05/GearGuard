import { getEquipmentsByDeptAndCompany } from "@/services/equipentsService";
import { useQuery } from "@tanstack/react-query";

export const useGetEquipmentsByDeptAndCompany = () =>
  useQuery({
    queryKey: ["equipmentsByDeptAndCompany"],
    queryFn: getEquipmentsByDeptAndCompany,
  });

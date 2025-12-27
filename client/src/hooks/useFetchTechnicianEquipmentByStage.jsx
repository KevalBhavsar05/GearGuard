import { getTechnicianEquipmentByStage } from "@/services/technician";
import { useQuery } from "@tanstack/react-query";


export const useFetchTechnicianEquipmentByStage = () => {
  return useQuery({
    queryKey: ["TechnicianEquipmentByStage"],
    queryFn: getTechnicianEquipmentByStage,
    staleTime: 5 * 60 * 1000, // optional: cache 5 minutes
  });
};

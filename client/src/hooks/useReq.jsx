import { getMaintenanceRequestsByUser, raiseMaintenanceRequest } from "@/services/reqService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateReq = () =>
    useMutation({
        mutationFn: raiseMaintenanceRequest
    });

export const useGetReqByUser = () =>
    useQuery({
        queryKey: ["maintenanceRequestsByUser"],
        queryFn: () => getMaintenanceRequestsByUser()
    });
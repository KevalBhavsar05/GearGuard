import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ChevronDownIcon,
  CheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import EmpHeader from "../components/emp/EmpHeader";
import EmpFooter from "../components/emp/EmpFooter";
import { useGetEquipmentsByDeptAndCompany } from "@/hooks/useEquipment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReq } from "@/hooks/useReq";
import { useApp } from "@/contexts/AppContext";

const RaiseComplaintPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user } = useApp();
  const [isEqOpen, setIsEqOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEq, setSelectedEq] = useState(null);

  const [departmentId, setDepartmentId] = useState("");
  const [maintenanceTeamId, setMaintenanceTeamId] = useState("");

  const { data } = useGetEquipmentsByDeptAndCompany();
  const equipments = data?.equipments || [];

  const queryClient = useQueryClient();
  const mutation = useCreateReq();
  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsEqOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- AUTO-FILL FROM EQUIPMENT ---------------- */
  useEffect(() => {
    if (!selectedEq) return;

    setDepartmentId(selectedEq.department_id?._id || "");
    setMaintenanceTeamId(selectedEq.maintenance_team_id || "");
  }, [selectedEq]);

  /* ---------------- FILTERED EQUIPMENT ---------------- */
  const filteredEquipment = useMemo(() => {
    return equipments.filter(
      (eq) =>
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [equipments, searchTerm]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedEq) {
      toast.error("Please select equipment");
      return;
    }

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);

    const payload = {
      subject: data.subject,
      request_type: data.request_type,
      notes: data.notes || "",
      scheduled_date: data.scheduled_date || null,
      duration_hours: data.duration_hours || null,

      equipment_id: selectedEq._id,
      department_id: selectedEq.department_id._id,
      maintenance_team_id: selectedEq.maintenance_team_id,
    };

    console.log(payload);
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Maintenance request created successfully");
        navigate("/employee-dashboard");
      },
      onError: (error) => {
        console.log(error);

        toast.error("Failed to create maintenance request");
      },
    });

  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] flex flex-col">
      <EmpHeader empName={user?.email || "Employee"} empId={`ID: #${user?.employeeId || "8821"}`} />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 py-8">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* ---------------- LEFT ---------------- */}
          <div className="lg:col-span-8 space-y-6">
            {/* SUBJECT */}
            <div className="bg-white rounded-3xl p-8 shadow-sm relative">
              <Input
                type={"text"}
                name="subject"
                required
                placeholder="Briefly describe the issue..."
                className="w-full bg-slate-50 rounded-xl py-4 px-12 text-lg"
              />
              <TagIcon className="h-6 w-6 text-slate-300 absolute left-12 top-10" />
            </div>

            {/* EQUIPMENT SELECT */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsEqOpen(!isEqOpen)}
                className="bg-slate-50 rounded-xl py-4 px-6 cursor-pointer flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {selectedEq ? selectedEq.name : "Select Equipment"}
                  </p>
                  {selectedEq && (
                    <p className="text-xs text-indigo-500">
                      {selectedEq.serial_number}
                    </p>
                  )}
                </div>
                <ChevronDownIcon className="h-5 w-5" />
              </div>

              {isEqOpen && (
                <div className="absolute w-full bg-white shadow-xl rounded-xl mt-2 z-50">
                  <input
                    className="w-full p-3 border-b"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {filteredEquipment.map((eq) => (
                    <div
                      key={eq._id}
                      onClick={() => {
                        setSelectedEq(eq);
                        setIsEqOpen(false);
                      }}
                      className="p-4 hover:bg-indigo-50 cursor-pointer flex justify-between"
                    >
                      <div>
                        <p className="font-bold">{eq.name}</p>
                        <p className="text-xs text-gray-400">
                          {eq.serial_number}
                        </p>
                      </div>
                      {selectedEq?._id === eq._id && (
                        <CheckIcon className="h-5 w-5 text-indigo-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NOTES */}
            <Textarea
              name="notes"
              rows="5"
              placeholder="Describe the issue in detail..."
              className="w-full bg-slate-50 rounded-xl p-6"
            />
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="lg:col-span-4 space-y-6">
            {/* TYPE */}
            <select
              name="request_type"
              className="w-full bg-slate-50 rounded-xl py-3 px-6"
            >
              <option value="Corrective">Corrective Maintenance</option>
              <option value="Preventive">Preventive Maintenance</option>
            </select>

            {/* DEPARTMENT (AUTO-FILLED) */}
            <select
              value={departmentId}
              disabled
              className="w-full bg-slate-100 rounded-xl py-3 px-6 cursor-not-allowed"
            >
              <option value={departmentId}>
                {selectedEq?.department_id?.name || "Department"}
              </option>
            </select>

            {/* MAINTENANCE TEAM (AUTO-FILLED) */}
            <select
              value={maintenanceTeamId}
              disabled
              className="w-full bg-slate-100 rounded-xl py-3 px-6 cursor-not-allowed"
            >
              <option value={maintenanceTeamId}>
                Assigned Maintenance Team
              </option>
            </select>

            {/* TIMING */}
            <Input
              type="date"
              name="scheduled_date"
              className="w-full bg-slate-50 rounded-xl py-3 px-6"
            />
            <Input
              type="number"
              name="duration_hours"
              placeholder="Estimated hours"
              min="0"
              className="w-full bg-slate-50 rounded-xl py-3 px-6"
            />

            <button
              disabled={mutation.isPending}
              className={`w-full px-6 py-4 rounded-full cursor-pointer text-lg font-semibold transition-all duration-200
    ${mutation.isPending
                  ? "bg-blue-300 text-white cursor-not-allowed shadow"
                  : "bg-blue-950 text-white shadow hover:bg-blue-900 hover:shadow-lg"
                }`}
            >
              {mutation.isPending ? "Submitting..." : "Log Maintenance Request"}
            </button>
          </div>
        </form>
      </main>

      <EmpFooter />
    </div>
  );
};

export default RaiseComplaintPage;

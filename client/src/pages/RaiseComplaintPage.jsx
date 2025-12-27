import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  TagIcon,
  ChatBubbleBottomCenterIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import EmpHeader from "../components/emp/EmpHeader";
import EmpFooter from "../components/emp/EmpFooter";
import { useGetEquipmentsByDeptAndCompany } from "@/hooks/useEquipment";

const departments = [
  { id: "64f300000000000000000002", name: "Engineering" },
  { id: "65a2", name: "Quality Control" },
];

const teams = [
  { id: "64f500000000000000000102", name: "Precision Mechanics" },
  { id: "65b2", name: "Electrical Engineering" },
];

const RaiseComplaintPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isEqOpen, setIsEqOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEq, setSelectedEq] = useState(null);

  const [departmentId, setDepartmentId] = useState("");
  const [maintenanceTeamId, setMaintenanceTeamId] = useState("");

  const { data } = useGetEquipmentsByDeptAndCompany();
  const equipments = data?.equipments || [];

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

  /* ---------------- AUTO-FILL WHEN EQUIPMENT CHANGES ---------------- */
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

  /* ---------------- SUBMIT ---------------- */
  const mutation = useMutation({
    mutationFn: async (payload) => {
      console.log("Submitting payload:", payload);
      return new Promise((res) => setTimeout(res, 1000));
    },
    onSuccess: () => {
      toast.success("Request Logged Successfully");
      navigate("/employee-dashboard");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedEq) {
      toast.error("Please select equipment");
      return;
    }

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);

    const payload = {
      ...data,
      equipment_id: selectedEq._id,
      department_id: departmentId,
      maintenance_team_id: maintenanceTeamId,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] flex flex-col">
      <EmpHeader empName="Alexander" empId="ID: #8821" />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 py-8">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* ---------------- LEFT ---------------- */}
          <div className="lg:col-span-8 space-y-6">
            {/* SUBJECT */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <input
                name="subject"
                required
                placeholder="Briefly describe the issue..."
                className="w-full bg-slate-50 rounded-xl py-4 px-12 text-lg"
              />
              <TagIcon className="h-6 w-6 text-slate-300 absolute" />
            </div>

            {/* EQUIPMENT SELECT */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsEqOpen(!isEqOpen)}
                className="bg-slate-50 rounded-xl py-4 px-12 cursor-pointer flex justify-between"
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

            {/* DESCRIPTION */}
            <textarea
              name="notes"
              rows="5"
              placeholder="Describe the issue..."
              className="w-full bg-slate-50 rounded-xl p-6"
            />
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="lg:col-span-4 space-y-6">
            {/* TYPE */}
            <select
              name="request_type"
              className="w-full bg-slate-50 rounded-xl py-3 px-10"
            >
              <option value="Corrective">Corrective Maintenance</option>
              <option value="Preventive">Preventive Maintenance</option>
            </select>

            {/* DEPARTMENT */}
            <select
              name="department_id"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full bg-slate-50 rounded-xl py-3 px-10"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* TEAM */}
            <select
              name="maintenance_team_id"
              value={maintenanceTeamId}
              onChange={(e) => setMaintenanceTeamId(e.target.value)}
              className="w-full bg-slate-50 rounded-xl py-3 px-10"
            >
              <option value="">Select Team</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* TIMING */}
            <input
              type="date"
              name="scheduled_date"
              className="w-full bg-slate-50 rounded-xl py-3 px-10"
            />
            <input
              type="number"
              name="duration_hours"
              placeholder="Hours"
              className="w-full bg-slate-50 rounded-xl py-3 px-10"
            />

            <button
              disabled={mutation.isPending}
              className="w-full bg-indigo-500 text-white py-4 rounded-xl font-bold"
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

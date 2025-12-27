import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  TagIcon,
  ChatBubbleBottomCenterIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import EmpHeader from "../components/emp/EmpHeader";
import EmpFooter from "../components/emp/EmpFooter";
import { useGetEquipmentsByDeptAndCompany } from "@/hooks/useEquipment";

const equipmentData = [
  { id: "65a01", name: "CNC Milling Machine - Haas VF2", code: "CNC-VF2-01" },
  { id: "65a02", name: "Industrial Air Compressor", code: "AIR-COMP-08" },
  { id: "65a03", name: "Hydraulic Press - 50 Ton", code: "HYD-PRS-05" },
  { id: "65a04", name: "Laser Cutting System", code: "LSR-CUT-12" },
  { id: "65a05", name: "Forklift - Toyota 8-Series", code: "FRK-LFT-03" },
  { id: "65a06", name: "Conveyor Belt System - Line A", code: "CNV-LIN-A" },
  { id: "65a07", name: "3D Printer - Stratasys F170", code: "3DP-STR-01" },
  { id: "65a08", name: "Main Server Rack - IT Room", code: "SRV-RK-09" },
  { id: "65a09", name: "Central HVAC Unit", code: "HVC-CTR-02" },
  { id: "65a10", name: "Welding Robot - Fanuc", code: "WLD-ROB-04" },
  { id: "65a11", name: "Water Cooling Tower", code: "WTR-CL-06" },
  { id: "65a12", name: "Packaging Machine - Vertical", code: "PKG-VRT-11" },
  { id: "65a13", name: "Industrial Generator - 500kVA", code: "GEN-500-01" },
  { id: "65a14", name: "Overhead Crane - 10 Ton", code: "CRN-OVH-07" },
  { id: "65a15", name: "Automated Storage System", code: "ASTS-01" },
];

const departments = [
  { id: "65a1", name: "Manufacturing" },
  { id: "65a2", name: "Quality Control" },
];
const teams = [
  { id: "65b1", name: "Precision Mechanics" },
  { id: "65b2", name: "Electrical Engineering" },
];

const RaiseComplaintPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEqOpen, setIsEqOpen] = useState(false);
  const [selectedEq, setSelectedEq] = useState(null);
  const { data: equipmentDataList } = useGetEquipmentsByDeptAndCompany();
  const [selectedEqp, setSelectedEqp] = useState(null);
  console.log("Fetched Equipment Data:", equipmentDataList);
  const eqp = equipmentDataList?.equipments;
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsEqOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredEquipment = useMemo(
    () =>
      eqp.filter(
        (eq) =>
          eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.code.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return new Promise((res) => setTimeout(res, 1000));
    },
    onSuccess: () => {
      toast.success("Request Logged Successfully");
      navigate("/employee-dashboard");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedEq) return toast.error("Please select equipment");
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    data.equipment_id = selectedEq.id;
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] flex flex-col font-sans">
      <EmpHeader empName="Alexander" empId="ID: #8821" />

      {/* Responsive Container: Full width on mobile, max-width on desktop */}
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Section: Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/employee-dashboard")}
              className="p-2 sm:p-3 bg-white border border-slate-100 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-all shadow-sm group"
            >
              <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-indigo-500" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Maintenance Ticket
              </h1>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Creation Portal
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8"
        >
          {/* LEFT COLUMN: Main Inputs (Spans all on mobile, 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Subject & Equipment Card */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 p-5 sm:p-8 shadow-sm">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block ml-2">
                Primary Details
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    name="subject"
                    required
                    className="w-full bg-slate-50 border-none rounded-xl sm:rounded-2xl py-4 sm:py-5 px-12 sm:px-14 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-base sm:text-lg font-medium"
                    placeholder="Briefly describe the issue..."
                  />
                  <TagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300 absolute left-4 sm:left-5 top-4 sm:top-5" />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsEqOpen(!isEqOpen)}
                    className="w-full bg-slate-50 border-none rounded-xl sm:rounded-2xl py-4 sm:py-5 px-12 sm:px-14 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-all"
                  >
                    <div className="flex flex-col text-left">
                      <span
                        className={`text-sm sm:text-base ${
                          selectedEq
                            ? "text-slate-700 font-semibold"
                            : "text-slate-400"
                        }`}
                      >
                        {selectedEq ? selectedEq.name : "Select Equipment..."}
                      </span>
                      {selectedEq && (
                        <span className="text-[9px] sm:text-[10px] text-indigo-500 font-bold uppercase tracking-tighter">
                          ID: {selectedEq.serial_number}
                        </span>
                      )}
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-slate-300 transition-transform ${
                        isEqOpen ? "rotate-180" : ""
                      }`}
                    />
                    <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300 absolute left-4 sm:left-5 top-4 sm:top-5" />
                  </div>

                  {isEqOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-3 sm:p-4 bg-slate-50/50 border-b border-slate-100">
                        <input
                          autoFocus
                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl py-2 px-4 text-xs sm:text-sm outline-none"
                          placeholder="Search by Name or Asset ID..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-2">
                        {filteredEquipment.map((eq) => (
                          <div
                            key={eq.id}
                            onClick={() => {
                              setSelectedEq(eq);
                              setIsEqOpen(false);
                            }}
                            className="flex items-center justify-between p-3 px-4 sm:px-6 hover:bg-indigo-50 rounded-lg sm:rounded-xl cursor-pointer group transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-indigo-600">
                                {eq.name}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
                                {eq.code}
                              </span>
                            </div>
                            {selectedEq?.id === eq.id && (
                              <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Card */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 p-5 sm:p-8 shadow-sm">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block ml-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  name="notes"
                  rows="6"
                  className="w-full bg-slate-50 border-none rounded-xl sm:rounded-[2rem] py-4 sm:py-6 px-12 sm:px-14 text-sm sm:text-base text-slate-700 outline-none resize-none"
                  placeholder="Describe context, symptoms, and impact..."
                ></textarea>
                <ChatBubbleBottomCenterIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300 absolute left-4 sm:left-5 top-5 sm:top-6" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Metadata (Spans all on mobile, 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 p-5 sm:p-8 shadow-sm space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-2">
                Classification
              </label>

              <div className="relative">
                <select
                  name="request_type"
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-10 text-xs sm:text-sm font-medium text-slate-600 appearance-none outline-none"
                >
                  <option value="Corrective">Corrective Maintenance</option>
                  <option value="Preventive">Preventive Maintenance</option>
                </select>
                <SparklesIcon className="h-4 w-4 text-slate-300 absolute left-4 top-3" />
              </div>

              {
                <div className="relative">
                  <select
                    name="department_id"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-10 text-xs sm:text-sm font-medium text-slate-600 appearance-none outline-none"
                    value={eqp.department_id}
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <BuildingOfficeIcon className="h-4 w-4 text-slate-300 absolute left-4 top-3" />
                </div>
              }

              <div className="relative">
                <select
                  name="maintenance_team_id"
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-10 text-xs sm:text-sm font-medium text-slate-600 appearance-none outline-none"
                >
                  <option value="">Select Target Team</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <UserGroupIcon className="h-4 w-4 text-slate-300 absolute left-4 top-3" />
              </div>

              <div className="pt-2">
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase">
                    Initial Stage
                  </span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">
                    New
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 p-5 sm:p-8 shadow-sm space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-2">
                Timing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="date"
                    name="scheduled_date"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-10 text-[10px] sm:text-[11px] font-medium text-slate-600 outline-none"
                  />
                  <CalendarDaysIcon className="h-4 w-4 text-slate-300 absolute left-4 top-3" />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="duration_hours"
                    placeholder="Hrs"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-10 text-xs sm:text-sm font-medium text-slate-600 outline-none"
                  />
                  <ClockIcon className="h-4 w-4 text-slate-300 absolute left-4 top-3" />
                </div>
              </div>
            </div>

            <button
              disabled={mutation.isPending}
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 sm:py-5 rounded-xl sm:rounded-[2rem] shadow-xl shadow-indigo-100 transition-all active:scale-95 uppercase tracking-[0.2em] text-[10px] sm:text-xs"
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

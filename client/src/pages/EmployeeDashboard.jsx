import React from "react";
import { PlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import EmpHeader from "../components/emp/EmpHeader";
import EmpFooter from "../components/emp/EmpFooter";
import ComplaintProgress from "../components/emp/ComplaintProgress";
import { useGetReqByUser } from "@/hooks/useReq";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetReqByUser();
  const { user } = useApp();
  /* ---------------- TRANSFORM BACKEND DATA ---------------- */
  const complaints =
    data?.requests?.map((req) => ({
      id: req._id,
      subject: req.subject,
      equipment: req.equipment_id?.name || "Unknown Equipment",
      category: req.request_type,
      stage: req.stage,
      technician: req.technician_id
        ? req.technician_id.email
        : "Unassigned",
      createdAt: req.createdAt,
    })) || [];

  return (
    <div className="min-h-screen bg-[#F9FBFC] flex flex-col font-sans">
      <EmpHeader empName={user?.email || "Employee"} empId={`EMP-ID: #${user?.employeeId || "8821"}`} />

      <main className="flex-grow max-w-6xl mx-auto w-full p-6 md:p-12 space-y-16">
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md text-center md:text-left space-y-3">
            <h2 className="text-3xl font-semibold text-slate-800">
              Report an Issue
            </h2>
            <p className="text-slate-400 text-sm">
              Facing a breakdown? Submit a maintenance request.
            </p>
          </div>

          <Button
            onClick={() => navigate("/raise-complaint")}
            variant="btn"
            className="group flex cursor-pointer  md:w-120 items-center gap-3 py-5 rounded-[2.5rem] font-semibold text-lg transition-all"
          >
            <PlusIcon className="h-6 w-6 group-hover:rotate-90 transition-transform" />
            New Complaint
          </Button>
        </section>

        {/* ---------------- STATUS SECTION ---------------- */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <ChartBarIcon className="w-4 h-4 text-indigo-300" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Live Progress Status
            </h3>
          </div>

          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-white/50 rounded-[2.5rem] animate-pulse" />
              <div className="h-64 bg-white/50 rounded-[2.5rem] animate-pulse" />
            </div>
          ) : (
            <ComplaintProgress complaints={complaints} />
          )}
        </div>
      </main>

      <EmpFooter />
    </div>
  );
};

export default EmployeeDashboard;

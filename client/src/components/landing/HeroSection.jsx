import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center 
    bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden pt-20">

      {/* Soft Glows */}
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-blue-700/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-blue-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-white/85 tracking-wide">
                Reliable • Secure • Industry Ready
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
              Smart & Reliable{" "}
              <span className="text-yellow-400">Maintenance Management</span>
              {" "}Platform
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/75 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              GearGuard helps you manage equipment, automate maintenance tasks,
              track performance, and reduce breakdowns — all in one powerful dashboard.
            </p>

            {/* Highlights Row */}
            <div className="mt-9 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-xl font-bold">50K+</div>
                <p className="text-xs text-white/65">Assets Tracked</p>
              </div>
              <div>
                <div className="text-xl font-bold">99.9%</div>
                <p className="text-xs text-white/65">Uptime</p>
              </div>
              <div>
                <div className="text-xl font-bold">40%</div>
                <p className="text-xs text-white/65">Less Downtime</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-sm text-white/70">
              Trusted by Industrial Teams, Manufacturing Plants & Enterprises
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

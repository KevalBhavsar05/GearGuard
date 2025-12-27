import { motion } from "framer-motion";
import { Wrench, Clock, TrendingUp, Shield, Bell, BarChart3 } from "lucide-react";

const benefits = [
  { icon: Wrench, title: "Centralized Tracking", description: "View and manage all equipment in one place." },
  { icon: Clock, title: "Auto Scheduling", description: "Never miss preventive maintenance again." },
  { icon: TrendingUp, title: "Less Downtime", description: "Reduce failures with proactive maintenance." },
  { icon: Shield, title: "Warranty Tracking", description: "Track warranties and service validity." },
  { icon: Bell, title: "Smart Alerts", description: "Instant notifications when issues occur." },
  { icon: BarChart3, title: "Performance Analytics", description: "Data-driven maintenance decisions." },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-12 bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-3 inline-block">
            Why GearGuard?
          </span>

          <h2 className="text-3xl font-bold mb-2">
            Built to Support{" "}
            <span className="text-yellow-400">Real Maintenance Teams</span>
          </h2>

          <p className="text-sm text-white/70">
            Practical features that actually solve real operational problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15">

              <div className="w-10 h-10 bg-yellow-400/20 border border-yellow-400/50 rounded-lg flex items-center justify-center mb-3">
                <b.icon className="text-yellow-400" />
              </div>

              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-sm text-white/70 mt-1">{b.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

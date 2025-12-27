import { motion } from "framer-motion";
import { ClipboardPlus, UserCheck, Wrench, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: ClipboardPlus, step: "01", title: "Create Request", desc: "Log maintenance request & auto-link machine data." },
  { icon: UserCheck, step: "02", title: "Assign & Schedule", desc: "Allocate technicians, set priorities & timelines." },
  { icon: Wrench, step: "03", title: "Execute Work", desc: "Technicians update live progress and logs." },
  { icon: CheckCircle2, step: "04", title: "Complete & Report", desc: "Close task, verify, and analyze performance." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-3">
            Simple Workflow
          </span>

          <h2 className="text-3xl font-bold mb-2">
            How <span className="text-yellow-400">GearGuard Works</span>
          </h2>

          <p className="text-sm text-white/70">
            Streamlined maintenance from request to completion
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
            >
              <div className="relative inline-flex mb-4">
                <div className="w-14 h-14 rounded-xl bg-yellow-400 flex items-center justify-center">
                  <s.icon className="text-black w-7 h-7" />
                </div>

                <span className="absolute -top-3 -right-3 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                  {s.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

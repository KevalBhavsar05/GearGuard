import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Users2, ClipboardList, Kanban, Calendar, LineChart, Zap, RefreshCcw } from "lucide-react";

const features = [
  { icon: Package, title: "Asset Records", description: "Track every machine with complete history." },
  { icon: Users2, title: "Team Control", description: "Organize technicians and assignments smartly." },
  { icon: ClipboardList, title: "Request Lifecycle", description: "Full workflow for corrective & preventive tasks." },
  { icon: Kanban, title: "Kanban View", description: "Visualize real-time maintenance tasks." },
  { icon: Calendar, title: "Scheduling", description: "Calendar-based preventive maintenance." },
  { icon: LineChart, title: "Reports", description: "Track efficiency and maintenance trends." },
  { icon: Zap, title: "Quick Actions", description: "Jump to important tasks instantly." },
  { icon: RefreshCcw, title: "Scrap Logic", description: "Handle end-of-life assets smartly." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-3">
            Powerful Features
          </span>

          <h2 className="text-3xl font-bold mb-3">
            Built for{" "}
            <span className="text-yellow-400">Real Maintenance Operations</span>
          </h2>

          <p className="text-sm text-white/70">
            Everything you need to streamline maintenance workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
                      <f.icon className="text-yellow-400" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-white/70">{f.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

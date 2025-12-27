import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "What equipment can GearGuard track?", answer: "Industrial machines, vehicles, IT systems, facility equipment — anything requiring maintenance." },
  { question: "Does it support automatic team assignment?", answer: "Yes. GearGuard auto-assigns correct teams and alerts them instantly." },
  { question: "Does it integrate with ERPs?", answer: "Supports APIs, ERP integration, Slack, Teams, and business tools." },
  { question: "Preventive vs Corrective maintenance?", answer: "Handles both flawlessly — scheduled checks + emergency breakdown workflows." },
  { question: "Is it mobile friendly?", answer: "Yes. Technicians update live status using phone or tablet." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-12 bg-blue-900 text-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-3">
            FAQ
          </span>

          <h2 className="text-3xl font-bold mb-2">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>

          <p className="text-sm text-white/70">
            Everything you need to know about GearGuard
          </p>
        </motion.div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white/10 border border-white/20 rounded-xl px-4"
            >
              <AccordionTrigger className="text-left font-semibold py-4">
                {f.question}
              </AccordionTrigger>

              <AccordionContent className="pb-4 text-sm text-white/70">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}

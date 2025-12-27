import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Dashboard", href: "#dashboard" },
  { name: "Features", href: "#features" },
  { name: "Workflow", href: "#how-it-works" },
  { name: "Benefits", href: "#benefits" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950/95 backdrop-blur-xl border-b border-white/10 shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        
        <a className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <Shield className="text-yellow-400" />
          </div>
          <span className="text-lg font-bold text-white">
            Gear<span className="text-yellow-400">Guard</span>
          </span>
        </a>

        <div className="hidden lg:flex gap-6 text-sm">
          {navLinks.map(l => (
            <a key={l.name} href={l.href} className="text-white/70 hover:text-white">
              {l.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex gap-3">
          <Link className="px-6 py-2 bg-white text-blue-800 rounded-full font-semibold shadow hover:text-blue-700" to="/login">
            Login
          </Link>

        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}}
            className="bg-blue-900 border-t border-white/10 lg:hidden px-4 pb-4">

            {navLinks.map(l => (
              <a key={l.name} href={l.href} onClick={()=>setOpen(false)} className="block py-2 text-white/80">
                {l.name}
              </a>
            ))}

            <Link to="/login" className="block mt-3 px-6 py-2 bg-white text-blue-800 rounded-full text-center font-semibold">
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

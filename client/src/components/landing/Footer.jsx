import { Shield, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
                <Shield className="text-black w-4 h-4" />
              </div>
              <span className="text-lg font-bold">
                Gear<span className="text-yellow-400">Guard</span>
              </span>
            </div>

            <p className="text-xs text-white/70 mb-3 leading-relaxed">
              Powerful maintenance platform for reliable operations.
            </p>

            <div className="space-y-1 text-xs text-white/70">
              <div className="flex gap-2 items-center"><Mail size={14}/> hello@gearguard.io</div>
              <div className="flex gap-2 items-center"><Phone size={14}/> +1 (800) 555-0123</div>
              <div className="flex gap-2 items-center"><MapPin size={14}/> San Francisco, CA</div>
            </div>
          </div>

          {/* Links */}
          {[
            { title:"Product", links:["Features","Pricing","API"]},
            { title:"Company", links:["About","Careers","Blog"]},
            { title:"Support", links:["Docs","Help","Status"]},
            { title:"Legal", links:["Privacy","Terms"]},
          ].map((g,i)=>(
            <div key={i}>
              <h4 className="font-semibold text-sm mb-2">{g.title}</h4>
              <ul className="space-y-1">
                {g.links.map(l=>(
                  <li key={l} className="text-xs text-white/70 hover:text-yellow-400 cursor-pointer transition">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/15 text-xs flex flex-col sm:flex-row justify-between gap-2 text-white/60">
          <p>© {new Date().getFullYear()} GearGuard — All Rights Reserved</p>

          <div className="flex gap-3">
            <span className="hover:text-yellow-400 cursor-pointer">Twitter</span>
            <span className="hover:text-yellow-400 cursor-pointer">LinkedIn</span>
            <span className="hover:text-yellow-400 cursor-pointer">GitHub</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

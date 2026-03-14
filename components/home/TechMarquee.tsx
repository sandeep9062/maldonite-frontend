"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs, SiTypescript,
  SiFigma, SiSupabase, SiPostgresql, SiAmazon, SiDocker,
  SiKubernetes, SiTerraform, SiGo, SiRust, SiPython, SiOpenai,
  SiRedis, SiApachekafka, SiVercel
} from "react-icons/si";
import { Combine, Terminal, ArrowRight } from "lucide-react";

// --- CUSTOM WHATSAPP ICON ---
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Tech Data Row 1
const row1 = [
  { icon: SiNextdotjs, name: "Next.js", color: "text-slate-900", shadow: "#000000" },
  { icon: SiReact, name: "React", color: "text-[#61DAFB]", shadow: "#61DAFB" },
  { icon: SiTypescript, name: "TypeScript", color: "text-[#3178C6]", shadow: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-[#06B6D4]", shadow: "#06B6D4" },
  { icon: SiSupabase, name: "Supabase", color: "text-[#3ECF8E]", shadow: "#3ECF8E" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "text-[#4169E1]", shadow: "#4169E1" },
  { icon: SiAmazon, name: "AWS", color: "text-[#FF9900]", shadow: "#FF9900" },
  { icon: SiVercel, name: "Vercel", color: "text-slate-900", shadow: "#000000" },
  { icon: SiFigma, name: "Figma", color: "text-[#F24E1E]", shadow: "#F24E1E" },
];

// Tech Data Row 2
const row2 = [
  { icon: SiNodedotjs, name: "Node.js", color: "text-[#339933]", shadow: "#339933" },
  { icon: SiPython, name: "Python", color: "text-[#3776AB]", shadow: "#3776AB" },
  { icon: SiGo, name: "Go", color: "text-[#00ADD8]", shadow: "#00ADD8" },
  { icon: SiRust, name: "Rust", color: "text-orange-600", shadow: "#ea580c" },
  { icon: SiDocker, name: "Docker", color: "text-[#2496ED]", shadow: "#2496ED" },
  { icon: SiKubernetes, name: "Kubernetes", color: "text-[#326CE5]", shadow: "#326CE5" },
  { icon: SiTerraform, name: "Terraform", color: "text-[#7B42BC]", shadow: "#7B42BC" },
  { icon: SiOpenai, name: "OpenAI", color: "text-[#412991]", shadow: "#412991" },
  { icon: SiRedis, name: "Redis", color: "text-[#DC382D]", shadow: "#DC382D" },
  { icon: SiApachekafka, name: "Kafka", color: "text-slate-900", shadow: "#000000" },
];

const Tag = ({ icon: Icon, name, color, shadow }: { icon: any, name: string, color: string, shadow: string }) => (
  <div className="group relative mx-4 min-w-[150px]">
    <div 
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md translate-y-2"
      style={{ backgroundColor: shadow }}
    />
    <div className="relative flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
        {name}
      </span>
    </div>
  </div>
);

export const TechMarquee = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #cbd5e1 1px, transparent 1px),
            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/80 via-transparent to-white/80 z-0 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold tracking-widest uppercase text-slate-500 mb-4"
        >
           <Combine className="w-3 h-3 text-[#E65A00]" />
           Integrated Stack
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
        >
           Precision Engineering.
        </motion.h3>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">
           A curated selection of the world's most robust technologies.
        </p>
      </div>

      {/* Side Fades for Marquee Smoothness */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

      {/* Scrolling Rows */}
      <div className="flex flex-col gap-8 relative z-10 mb-20">
        <div className="flex overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex mt-2 flex-shrink-0"
          >
            {[...row1, ...row1, ...row1].map((tech, i) => <Tag key={`r1-${i}`} {...tech} />)}
          </motion.div>
        </div>
        <div className="flex overflow-hidden">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="flex mt-2 flex-shrink-0"
          >
            {[...row2, ...row2, ...row2].map((tech, i) => <Tag key={`r2-${i}`} {...tech} />)}
          </motion.div>
        </div>
      </div>

      {/* REFINED TECHNICAL CTA CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 text-center relative z-20"
      >
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-sm">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            Review Your Architecture with Us
          </h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto text-base leading-relaxed">
            Discuss migration strategies, cloud optimization, or AI integration directly with our engineering team. No sales fluff—just technical deep dives.
          </p>
          
          {/* Action Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Primary Pill Button */}
            <Link 
              href="/schedule-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#E65A00] transition-all hover:scale-105 group shadow-lg"
            >
              <Terminal className="w-4 h-4 text-[#E65A00] group-hover:text-white transition-colors" />
              Sync with a Lead Architect
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* WhatsApp Button */}
            <a 
                href="https://wa.me/917814448091" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 group"
                aria-label="Chat on WhatsApp"
             >
                <WhatsAppIcon className="w-6 h-6" />
             </a>

          </div>
          
          <p className="mt-5 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            30-Min Technical Consultation
          </p>
        </div>
      </motion.div>
      
    </section>
  );
};

export default TechMarquee;
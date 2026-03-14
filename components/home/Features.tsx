"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Link2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "SaaS Development",
    desc: "Scalable cloud platforms tailored to your workflow.",
    icon: <Code2 className="w-7 h-7 text-[#d4af37]" />,
  },
  {
    title: "Next.js & MERN",
    desc: "Powerful modern web apps built with proven stacks.",
    icon: <Layers className="w-7 h-7 text-[#d4af37]" />,
  },
  {
    title: "API Integration",
    desc: "Robust backend services & third-party API integrations.",
    icon: <Link2 className="w-7 h-7 text-[#d4af37]" />,
  },
];

const Features = () => {
  return (
    <section className="bg-white dark:bg-darkbg1 text-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Key Offerings
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400 mt-3 mb-12 text-base md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Fast-track your success with custom digital solutions designed to scale.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 
              bg-gradient-to-br from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#111]
              hover:shadow-2xl hover:border-gold hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="p-3 rounded-full bg-[#f5f5f5] dark:bg-[#2c2c2c] 
                  group-hover:ring-2 group-hover:ring-[#d4af37] transition-all"
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            href="/services"
            className="inline-block px-8 py-3 bg-[#d4af37] text-black rounded font-semibold 
            shadow-md hover:shadow-xl hover:bg-[#c29e2f] transition-all duration-300 text-base"
          >
            See All Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;

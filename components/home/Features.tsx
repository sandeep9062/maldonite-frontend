"use client";

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
    <section className="bg-white dark:bg-darkbg1 text-center py-12 sm:py-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white px-2">
          Our Key Offerings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
          Fast-track your success with custom digital solutions designed to
          scale.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-left">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 
              bg-gradient-to-br from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#111]
              hover:shadow-2xl hover:border-gold hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div
                  className="p-2 sm:p-3 rounded-full bg-[#f5f5f5] dark:bg-[#2c2c2c] 
                  group-hover:ring-2 group-hover:ring-[#d4af37] transition-all"
                >
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-14">
          <Link
            href="/services"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#d4af37] text-black rounded font-semibold 
            shadow-md hover:shadow-xl hover:bg-[#c29e2f] transition-all duration-300 text-sm sm:text-base"
          >
            See All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;

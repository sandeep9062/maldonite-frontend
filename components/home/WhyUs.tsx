"use client";

import {
  ShieldCheck,
  LayoutDashboard,
  TrendingUp,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { useGetWebsiteImageByContextQuery } from "@/services/websiteImagesApi";

const points = [
  {
    icon: ShieldCheck,
    label: "Experience",
    title: "10+ Years of Engineering",
    desc: "We've scaled startups into million-dollar ventures. Whether it's an MVP or an enterprise system, we build products that stand the test of time.",
  },
  {
    icon: LayoutDashboard,
    label: "Process",
    title: "Agile, Transparent & Reliable",
    desc: "Weekly sprints, real-time reporting, fast iterations — you're always in the loop and always moving forward.",
  },
  {
    icon: TrendingUp,
    label: "Architecture",
    title: "Future-Proof Tech Stack",
    desc: "Next.js, MongoDB, microservices — we craft backend and frontend systems that are secure, scalable, and blazing fast.",
  },
  {
    icon: Lightbulb,
    label: "Vision",
    title: "Product-Focused Collaboration",
    desc: "We align with your goals and timelines, not just your tickets. Every line of code is written with your business outcome in mind.",
  },
];

const WhyUs = () => {
  const {
    data: imageData,
    isLoading,
    isError,
  } = useGetWebsiteImageByContextQuery("why-us");

  return (
    <section className="py-16 sm:py-28 bg-white dark:bg-darkbg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold mb-3">
            Why Maldonite
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4">
            Built different,
            <br className="hidden sm:block" /> for a reason.
          </h2>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            We go beyond coding — we partner with you. With deep product insight
            and a relentless focus on results, we turn your vision into
            scalable, revenue-driving software.
          </p>
        </div>

        {/* ── Body: points + image ── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col bg-white dark:bg-darkbg2 rounded-2xl border border-slate-100 dark:border-white/[0.06] hover:border-gold/40 dark:hover:border-gold/25 hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.12)] p-5 transition-all duration-300"
                >
                  {/* Icon + label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-700">
                      {point.label}
                    </span>
                  </div>

                  <h3 className="text-[14px] font-bold leading-[1.25] tracking-[-0.01em] text-slate-900 dark:text-white group-hover:text-gold dark:group-hover:text-gold transition-colors duration-200 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[12.5px] text-slate-500 dark:text-slate-500 leading-relaxed flex-1">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Image block */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06]">
              {isLoading && (
                <div className="w-full aspect-[4/3] animate-pulse bg-slate-200 dark:bg-white/[0.06] rounded-2xl" />
              )}
              {isError && (
                <div className="w-full aspect-[4/3] flex items-center justify-center text-sm text-slate-400 dark:text-slate-600">
                  Image unavailable
                </div>
              )}
              {imageData?.data?.url && (
                <Image
                  src={imageData.data.url}
                  alt={imageData.data.altText}
                  width={700}
                  height={525}
                  className="w-full h-auto object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-white/[0.06]">
          <p className="text-[15px] text-slate-500 dark:text-slate-400 max-w-md text-center sm:text-left">
            Ready to build something that lasts? Let's talk about your project.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gold hover:bg-gold text-black text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.4)] whitespace-nowrap"
          >
            Book a Free Consultation
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

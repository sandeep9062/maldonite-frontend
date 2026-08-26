"use client";

import { Code2, Layers, Link2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Code2,
    label: "Cloud",
    title: "SaaS Development",
    desc: "We architect multi-tenant cloud platforms built for scale — from onboarding flows to billing infrastructure, every layer is production-ready from day one.",
    stat: "50+ platforms",
    href: "/service/saas-app-development",
  },
  {
    icon: Layers,
    label: "Frontend & Backend",
    title: "Next.js & MERN Stack",
    desc: "Lightning-fast web apps powered by Next.js, React, Node, and MongoDB. Server-side rendering, API routes, and optimised Core Web Vitals — out of the box.",
    stat: "Sub-100ms loads",
    href: "/service/website-design-development",
  },
  {
    icon: Link2,
    label: "Integrations",
    title: "API & Backend Services",
    desc: "Stripe, Twilio, Auth0, OpenAI — we connect your product to the ecosystem it needs. Robust REST and GraphQL APIs designed for reliability and developer experience.",
    stat: "100+ integrations",
    href: "/service/api-integration-automation",
  },
];

const Features = () => {
  return (
    <section className="py-16 sm:py-28 bg-white dark:bg-darkbg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold mb-3">
              What we build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Our core
              <br className="hidden sm:block" /> offerings.
            </h2>
          </div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm sm:text-right">
            Custom digital solutions designed to ship fast and scale further.
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                className="group relative flex flex-col bg-white dark:bg-darkbg2 rounded-2xl border border-slate-100 dark:border-white/[0.06] hover:border-gold/40 dark:hover:border-gold/25 hover:shadow-[0_16px_48px_-8px_rgba(212,175,55,0.13)] p-6 sm:p-7 transition-all duration-300 overflow-hidden"
              >
                {/* Large background index number */}
                <span className="absolute top-4 right-5 text-[64px] font-sans font-bold text-slate-50 dark:text-white/[0.03] leading-none select-none pointer-events-none">
                  0{i + 1}
                </span>

                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />

                {/* Icon + label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-700">
                    {item.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] sm:text-[18px] font-bold leading-[1.2] tracking-[-0.01em] text-slate-900 dark:text-white group-hover:text-gold dark:group-hover:text-gold transition-colors duration-200 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-slate-500 dark:text-slate-500 leading-relaxed flex-1 mb-6">
                  {item.desc}
                </p>

                {/* Stat + arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06] group-hover:border-gold/12 transition-colors duration-200">
                  <span className="text-[11px] font-bold text-gold uppercase tracking-[0.12em]">
                    {item.stat}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-slate-200 dark:border-white/[0.08] flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/8 transition-all duration-200">
                    <ArrowUpRight
                      size={12}
                      className="text-slate-400 dark:text-slate-600 group-hover:text-gold transition-colors duration-200"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA row ── */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-slate-100 dark:border-white/[0.05]">
          <p className="text-[13.5px] text-slate-500 dark:text-slate-500 text-center sm:text-left">
            Not sure what you need?{" "}
            <Link
              href="/contact"
              className="text-gold font-semibold hover:underline underline-offset-2"
            >
              Let's talk first.
            </Link>
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gold hover:bg-gold text-black text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.4)] whitespace-nowrap"
          >
            See All Services
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;

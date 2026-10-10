"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Link2 } from "lucide-react";
import * as FaIcon from "react-icons/fa";
import { useGetServicesQuery } from "@/services/servicesApi";

// Resolve a service's dynamic icon name to a react-icons/fa component.
// Same pattern as components/Services.tsx & app/service/page.tsx.
const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;
  const IconComponent = FaIcon[iconName as keyof typeof FaIcon];
  return IconComponent || null;
};

// Staggered reveal for each quick-link card.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const QuickLinks = () => {
  // Fetch ALL services (not just a slice) so every service link is shown.
  const { data: services = [], isLoading, isError } = useGetServicesQuery();

  const hasServices = services.length > 0;

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-navy overflow-hidden">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-72 h-72 bg-navy/5 dark:bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-text dark:text-gold mb-3">
              <Link2 size={13} />
              Quick Links
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Explore every
              <br className="hidden sm:block" /> service we offer.
            </h2>
          </div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm sm:text-right">
            One-tap access to the full range of Maldonite solutions — from
            product design to AI-powered automation.
          </p>
        </div>

        {/* ── Loading skeleton ── */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-28 sm:h-32 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-darkbg2 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {isError && !isLoading && (
          <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 p-8 text-center">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              Couldn&rsquo;t load services right now.
            </p>
            <p className="mt-1 text-xs text-red-500/80 dark:text-red-400/70">
              Please refresh the page or try again later.
            </p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !isError && !hasServices && (
          <div className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-darkbg2 p-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No services available yet. Please check back soon.
            </p>
          </div>
        )}

        {/* ── Services quick-link grid ── */}
        {!isLoading && !isError && hasServices && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {services.map((service) => {
              const ServiceIcon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.slug || service._id}
                  variants={cardVariants}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={`/service/${service.slug}`}
                    className="group relative flex flex-col h-full gap-3 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-white dark:bg-darkbg2 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_-12px_rgba(212,175,55,0.18)] overflow-hidden"
                  >
                    {/* Gold top accent on hover */}
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />

                    {/* Icon + arrow */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold/15 transition-colors duration-300">
                        {ServiceIcon ? (
                          <ServiceIcon className="text-xl sm:text-2xl" />
                        ) : (
                          <Sparkles className="w-5 h-5" />
                        )}
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-slate-300 dark:text-slate-600 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-[15px] font-semibold leading-snug text-slate-900 dark:text-white group-hover:text-gold-text dark:group-hover:text-gold transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Short description (desktop only to keep cards compact) */}
                    {service.desc && (
                      <p className="hidden sm:block text-[12.5px] text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2">
                        {service.desc}
                      </p>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ── Footer CTA ── */}
        {!isLoading && !isError && hasServices && (
          <div className="mt-12 sm:mt-14 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gold text-black text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.4)]"
            >
              View All Services
              <ArrowUpRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickLinks;


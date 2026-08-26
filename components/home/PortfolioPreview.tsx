"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGetProjectsQuery } from "@/services/projectsApi";

const PortfolioPreview = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  const sorted = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || "").getTime() -
        new Date(a.updatedAt || a.createdAt || "").getTime(),
    )
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-darkbg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold mb-2">
              Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gold/40 hover:border-gold bg-transparent hover:bg-gold/8 text-gold dark:text-gold text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200"
          >
            All Projects
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* ── States ── */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-100 dark:bg-white/[0.04] animate-pulse"
              >
                <div className="aspect-[4/3] rounded-t-2xl bg-slate-200 dark:bg-white/[0.06]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-white/[0.06]" />
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-white/[0.04]" />
                  <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="py-16 text-center text-sm text-slate-400 dark:text-slate-600">
            Could not load projects. Please try again later.
          </div>
        )}

        {/* ── Grid ── */}
        {!isLoading && !isError && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sorted.map((project, i) => {
              const coverImage =
                project.image && project.image.length > 0
                  ? project.image[0]
                  : "/placeholder.png";

              return (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col bg-white dark:bg-darkbg2 rounded-2xl overflow-hidden border border-slate-100 dark:border-white/[0.06] hover:border-gold/40 dark:hover:border-gold/25 hover:shadow-[0_20px_60px_-12px_rgba(212,175,55,0.14)] dark:hover:shadow-[0_20px_60px_-12px_rgba(212,175,55,0.08)] transition-all duration-300 ease-out"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      height={400}
                      width={600}
                      src={coverImage}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Type badge */}
                    {project.type && (
                      <span className="absolute top-3.5 left-3.5 inline-flex items-center px-2.5 py-1 rounded-full bg-gold text-[9px] font-bold uppercase tracking-[0.16em] text-black z-10">
                        {project.type}
                      </span>
                    )}

                    {/* Arrow icon */}
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/12 border border-white/20 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 z-10">
                      <ArrowUpRight size={14} className="text-gold" />
                    </div>

                    {/* Index number */}
                    <div className="absolute bottom-3.5 right-3.5 text-[10px] font-bold tabular-nums text-white/30 tracking-widest z-10">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 relative">
                    {/* Accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />

                    <h3 className="text-[15px] sm:text-[17px] font-bold leading-[1.2] tracking-[-0.01em] text-slate-900 dark:text-white group-hover:text-gold dark:group-hover:text-gold transition-colors duration-200 mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-[12.5px] text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-white/[0.06] group-hover:border-gold/12 transition-colors duration-200">
                      <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-slate-400 dark:text-slate-600 group-hover:text-gold transition-colors duration-200 flex items-center gap-1">
                        View project
                        <ArrowUpRight
                          size={12}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── CTA ── */}
        {!isLoading && !isError && sorted.length > 0 && (
          <div className="flex justify-center mt-12 sm:mt-16">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gold hover:bg-gold text-black text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.4)]"
            >
              Explore All Projects
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPreview;

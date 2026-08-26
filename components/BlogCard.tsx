"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight, Clock, Tags } from "lucide-react";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  image?: string;
  images?: string[];
  category: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime?: number;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="group relative flex flex-col bg-white dark:bg-darkbg2 rounded-2xl overflow-hidden border border-slate-100 dark:border-white/[0.06] hover:border-gold/40 dark:hover:border-gold/25 transition-all duration-500 ease-out shadow-sm hover:shadow-[0_20px_60px_-12px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_20px_60px_-12px_rgba(212,175,55,0.1)]">
      <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
        {/* ── Image ── */}
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={blog.images?.[0] || blog.image || ""}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
          />

          {/* Scrim — stronger at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-[10px] font-bold tracking-[0.18em] uppercase text-black shadow-md">
              <Tags size={8} className="shrink-0" />
              {blog.category}
            </span>
          </div>

          {/* Arrow icon — appears on hover */}
          <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <ArrowUpRight size={15} className="text-gold" />
          </div>

          {/* Date + read time at bottom of image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3 text-[11px] text-white/70 uppercase tracking-widest font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={11} className="text-gold/80" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {blog.readTime && (
                <>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} className="text-gold/80" />
                    {blog.readTime} min
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 relative">
          {/* Gold accent bar — slides in on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

          {/* Title */}
          <h3 className="text-[16px] sm:text-[18px] leading-[1.25] font-bold tracking-[-0.01em] text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-gold dark:group-hover:text-gold transition-colors duration-300">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] sm:text-[13.5px] text-slate-500 dark:text-slate-400 leading-[1.65] line-clamp-2 flex-1 mb-5">
            {blog.desc}
          </p>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06] group-hover:border-gold/15 transition-colors duration-300">
            {/* Author */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-7 h-7 rounded-full overflow-hidden ring-[1.5px] ring-gold/25 group-hover:ring-gold/60 flex-shrink-0 transition-all duration-300">
                {blog.authorImage ? (
                  <Image
                    src={blog.authorImage}
                    alt={blog.author}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-[10px] font-bold text-black">
                    {blog.author[0]}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate uppercase tracking-[0.1em] font-medium">
                  {blog.author}
                </p>
              </div>
            </div>

            {/* Read CTA */}
            <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300 dark:text-slate-600 group-hover:text-gold transition-colors duration-300 shrink-0 ml-2">
              Read
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

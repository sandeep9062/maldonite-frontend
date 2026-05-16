"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
  Code,
  Palette,
  Globe,
  Zap,
  BarChart3,
  Cloud,
  Rocket,
  Tags,
} from "lucide-react";

// --- Interfaces ---
interface Blog {
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

const categories = [
  "All",
  "SaaS",
  "AI",
  "DevTools",
  "UI/UX",
  "Web Development",
  "Product",
  "SEO",
  "Marketing",
  "Cloud",
];

const categoryIcons: Record<string, React.ReactNode> = {
  All: <Sparkles size={10} />,
  SaaS: <Rocket size={10} />,
  AI: <Zap size={10} />,
  DevTools: <Code size={10} />,
  "UI/UX": <Palette size={10} />,
  "Web Development": <Globe size={10} />,
  Product: <TrendingUp size={10} />,
  SEO: <BarChart3 size={10} />,
  Marketing: <TrendingUp size={10} />,
  Cloud: <Cloud size={10} />,
};

const POSTS_PER_PAGE = 15;

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = useMemo(
    () =>
      activeCategory === "All"
        ? blogs
        : blogs.filter((b) => b.category === activeCategory),
    [activeCategory, blogs],
  );

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 transition-colors duration-500 pb-20">
      {/* Header Section */}
      <header className="relative pt-20 md:pt-24 pb-10 md:pb-16 px-4 md:px-6 text-center overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none hidden md:block" />
        <div className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none hidden md:block" />

        <div className="relative">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-4 md:mb-6 tracking-tight leading-[1.1]">
            Insights &{" "}
            <span className="text-[#D4AF37] italic bg-clip-text">
              Perspectives
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-sm md:text-lg px-2 leading-relaxed">
            Exploring the intersection of design, code, and the future of SaaS.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <nav className="sticky top-4 md:top-6 z-50 mx-auto max-w-fit px-2 sm:px-4 mb-10 md:mb-16">
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-2xl border border-slate-200/50 dark:border-white/8 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-tighter whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/25 scale-105"
                  : "text-slate-500 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
              }`}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 max-w-[1440px] mx-auto">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {paginatedBlogs.map((blog, i) => (
              <article
                key={blog._id}
                className="group relative flex flex-col bg-white dark:bg-[#0f0f0f] rounded-2xl sm:rounded-3xl border border-slate-200/60 dark:border-white/5 overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-2xl hover:shadow-[#D4AF37]/8 dark:hover:shadow-[#D4AF37]/5 transition-all duration-500 ease-out"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex flex-col h-full"
                >
                  {/* Image Container - Full width, aspect ratio based */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                    <Image
                      src={blog.images?.[0] || blog.image || ""}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Category Badge - Always visible */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 bg-[#D4AF37]/90 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-black uppercase tracking-[0.15em] rounded-lg shadow-lg">
                        <Tags size={8} />
                        {blog.category}
                      </span>
                    </div>

                    {/* View More Icon - appears on hover */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out shadow-lg z-10">
                      <ArrowUpRight size={16} className="text-[#D4AF37]" />
                    </div>

                    {/* Date/Read time - Bottom left overlay */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-[8px] text-white/80 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={10} />
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {blog.readTime && (
                        <>
                          <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> {blog.readTime}m
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content Section - Below image on all screens */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6 relative">
                    {/* Gold Accent Line on hover */}
                    <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                    {/* Mobile date row */}
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {blog.readTime && (
                        <>
                          <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                            {blog.readTime} min read
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-[1.2] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {blog.desc}
                    </p>

                    {/* Author + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5 group-hover:border-[#D4AF37]/10 transition-colors duration-300">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/40 flex-shrink-0 transition-all duration-300">
                          {blog.authorImage ? (
                            <Image
                              src={blog.authorImage}
                              alt={blog.author}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-[#D4AF37] to-amber-600 w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-black">
                              {blog.author[0]}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[100px] sm:max-w-[140px]">
                          {blog.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#D4AF37] transition-colors duration-300">
                        <span className="hidden sm:inline">Read</span>
                        <ArrowUpRight
                          size={12}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 sm:py-40 text-center flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 rounded-2xl flex items-center justify-center">
              <Search
                className="text-slate-400 dark:text-slate-500"
                size={24}
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif mb-3">
              No stories found.
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Try adjusting your category filter to discover more content.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300"
            >
              <Sparkles size={14} />
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 sm:gap-8 mt-14 sm:mt-16 md:mt-24 pt-8 sm:pt-10 border-t border-slate-100 dark:border-white/5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 dark:text-slate-400 disabled:opacity-20 hover:text-[#D4AF37] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page numbers - always visible, compact on mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                      currentPage === pageNum
                        ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 scale-110"
                        : "text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 dark:text-slate-400 disabled:opacity-20 hover:text-[#D4AF37] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

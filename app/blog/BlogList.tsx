"use client";

import { useState, useMemo } from "react";
import {
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
} from "lucide-react";
import BlogCard, { Blog } from "@/components/BlogCard";

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
  All: <Sparkles size={11} />,
  SaaS: <Rocket size={11} />,
  AI: <Zap size={11} />,
  DevTools: <Code size={11} />,
  "UI/UX": <Palette size={11} />,
  "Web Development": <Globe size={11} />,
  Product: <TrendingUp size={11} />,
  SEO: <BarChart3 size={11} />,
  Marketing: <TrendingUp size={11} />,
  Cloud: <Cloud size={11} />,
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

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#080808] text-slate-900 dark:text-slate-100 transition-colors duration-500 pb-24">
      {/* ── Category filter bar ── */}
      <nav className="sticky top-0 z-50 bg-[#FAFAF8]/80 dark:bg-[#080808]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/[0.05]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`
                    inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                    text-[11px] font-semibold uppercase tracking-[0.12em]
                    whitespace-nowrap flex-shrink-0
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#D4AF37] text-black"
                        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }
                  `}
                >
                  <span
                    className={
                      isActive ? "text-black/70" : "text-current opacity-70"
                    }
                  >
                    {categoryIcons[cat]}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Result count */}
        {filteredBlogs.length > 0 && (
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600 font-medium mb-6 sm:mb-8">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "story" : "stories"}
            {activeCategory !== "All" && (
              <>
                {" "}
                &mdash; <span className="text-[#D4AF37]">{activeCategory}</span>
              </>
            )}
          </p>
        )}

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-28 sm:py-40 text-center">
            <div className="w-14 h-14 mb-6 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] flex items-center justify-center">
              <Search
                size={20}
                className="text-slate-400 dark:text-slate-600"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 dark:text-white mb-2">
              No stories found
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-600 mb-8 max-w-[240px] leading-relaxed">
              Nothing in{" "}
              <span className="text-[#D4AF37]">{activeCategory}</span> yet. Try
              another category.
            </p>
            <button
              onClick={() => handleCategory("All")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 text-[#B8940F] dark:text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200"
            >
              <Sparkles size={13} />
              Show all stories
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 sm:mt-20 pt-8 border-t border-slate-100 dark:border-white/[0.05]">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-white/15 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1.5">
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
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#D4AF37] text-black"
                        : "text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-white/15 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200"
            >
              <ChevronRight size={15} />
            </button>

            {/* Page context */}
            <span className="ml-2 text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-[0.1em] font-medium">
              {currentPage} / {totalPages}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

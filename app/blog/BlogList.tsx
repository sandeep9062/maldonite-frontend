"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
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
      <header className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
          Insights & <span className="text-[#D4AF37] italic">Perspectives</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg">
          Exploring the intersection of design, code, and the future of SaaS.
        </p>
      </header>

      {/* Category Filter */}
      <nav className="sticky top-6 z-50 mx-auto max-w-fit px-4 mb-20">
        <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-full shadow-xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-tighter transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                  : "text-slate-500 hover:text-black dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 max-w-[1440px] mx-auto">
        {filteredBlogs.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
            {paginatedBlogs.map((blog, i) => (
              <article
                key={blog._id}
                className="break-inside-avoid group relative flex flex-col bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="cursor-none group/link"
                >
                  {/* Image Container */}
                  <div
                    className={`relative w-full overflow-hidden ${
                      i % 3 === 0
                        ? "h-[500px]"
                        : i % 2 === 0
                          ? "h-[400px]"
                          : "h-[300px]"
                    }`}
                  >
                    <Image
                      src={blog.images?.[0] || blog.image || ""}
                      alt={blog.title}
                      fill
                      className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />

                    {/* Gradient Overlay - Smooth transition to text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Category Floating Badge */}
                    <div className="absolute top-6 left-6 overflow-hidden rounded-full">
                      <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content on Image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="flex items-center gap-3 text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} />{" "}
                          {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} /> {blog.readTime} min
                        </span>
                      </div>

                      <h3 className="text-xl bg-black p-4 md:text-2xl font-serif text-white leading-[1.1] mb-2 group-hover:tracking-tight transition-all duration-500">
                        {blog.title}
                      </h3>

                      {/* Description - Revealed on hover */}
                      <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 ease-in-out">
                        <p className="text-slate-300 text-sm line-clamp-2 mt-2 font-light leading-relaxed">
                          {blog.desc}
                        </p>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20">
                            {blog.authorImage ? (
                              <Image
                                src={blog.authorImage}
                                alt={blog.author}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="bg-[#D4AF37] w-full h-full flex items-center justify-center text-[10px] font-bold text-black">
                                {blog.author[0]}
                              </div>
                            )}
                          </div>
                          <span className="text-white/80 text-[11px] font-medium uppercase tracking-wider">
                            {blog.author}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-20 h-20 mb-8 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-3xl font-serif mb-4">No stories found.</h3>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-[#D4AF37] font-bold border-b-2 border-[#D4AF37]/20 hover:border-[#D4AF37] pb-1 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-12 mt-32">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 hover:text-[#D4AF37] transition-all"
            >
              <ChevronLeft size={18} /> Prev
            </button>

            <div className="hidden md:flex gap-8">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`text-sm font-bold transition-all ${
                    currentPage === i + 1
                      ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                      : "text-slate-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 hover:text-[#D4AF37] transition-all"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

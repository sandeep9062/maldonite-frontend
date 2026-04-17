"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
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
  "Cloud & DevOps",
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] transition-colors duration-500 pb-20">
      {/* Dynamic Header Section */}

      {/* Glass Category Filter */}
      <nav className="sticky top-4 z-50 mx-auto max-w-fit px-4 mb-16">
        <div className="flex items-center gap-1 p-1.5 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Masonry Grid */}
      <main className="px-6 max-w-[1400px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {paginatedBlogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid group relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Link href={`/blog/${blog.slug}`} className="block relative">
                  {/* Image wrapper with scale and blur effect */}
                  <div
                    className={`relative w-full overflow-hidden transition-all duration-700 ${
                      i % 3 === 0
                        ? "h-[550px]"
                        : i % 2 === 0
                          ? "h-[420px]"
                          : "h-[350px]"
                    }`}
                  >
                    <Image
                      src={blog.images?.[0] || blog.image || ""}
                      alt={blog.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 group-hover:blur-[2px]"
                    />

                    {/* Multi-layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    {/* Read Time & Date */}
                    <div className="flex items-center gap-4 text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={12} />
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {blog.readTime && (
                        <span className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                          <Clock size={12} />
                          {blog.readTime} min read
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Expandable description on hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <p className="overflow-hidden text-white/70 text-sm leading-relaxed mb-6 pr-4">
                        {blog.desc}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        {blog.authorImage ? (
                          <Image
                            src={blog.authorImage}
                            alt={blog.author}
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-[#D4AF37]/50 shadow-lg"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-[10px]">
                            {blog.author[0]}
                          </div>
                        )}
                        <span className="text-white text-xs font-medium">
                          {blog.author}
                        </span>
                      </div>

                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-500">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center"
          >
            <h3 className="text-2xl font-serif text-gray-400">
              No stories found in this category.
            </h3>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-[#D4AF37] font-bold uppercase text-xs tracking-widest"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 mt-24">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 transition-all hover:text-[#D4AF37]"
            >
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              Prev
            </button>

            <div className="flex gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "text-[#D4AF37] scale-125"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 transition-all hover:text-[#D4AF37]"
            >
              Next{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

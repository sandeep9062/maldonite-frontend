"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User } from "lucide-react";

interface Comment {
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  images?: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  status: "draft" | "published" | "archived";
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export default function FeaturedBlogs({ blogs }: { blogs: Blog[] }) {
  // Get only featured blogs, or top 3 blogs if no featured blogs are marked
  const featuredBlogs = blogs.filter(blog => blog.isFeatured && blog.status === "published").slice(0, 3);
  const displayBlogs = featuredBlogs.length > 0 ? featuredBlogs : blogs.filter(blog => blog.status === "published").slice(0, 3);

  if (displayBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-white dark:bg-[#0D1321]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white mb-4">
            Featured Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the latest trends, tips, and stories from our team of experts.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayBlogs.map((blog: Blog, i: number) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-xl min-h-[480px] overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#1a1a1a] shadow-sm hover:shadow-lg hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="flex flex-col h-full"
              >
                <div className="h-64 w-full relative overflow-hidden">
                  {blog.images && (
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      fill
                      priority={i < 3}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                    />
                  )}
                  {blog.isFeatured && (
                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 p-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-[#D4AF37] uppercase">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {blog.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0d1321] dark:text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                    <span className="flex items-center gap-1">
                      <User size={14} /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#D4AF37]/90 transition-all duration-300 hover:shadow-lg"
          >
            View All Blogs
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
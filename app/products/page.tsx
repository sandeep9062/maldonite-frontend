"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "../../services/productsApi";

export default function ProductsPage() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery({});

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500 dark:text-gray-400">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500 dark:text-red-400">
        <p>
          Failed to load products. Please check your network connection or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-darkbg1 py-10 px-6 md:px-10 transition-colors duration-300">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-navy dark:text-white mb-12"
      >
        Our SaaS Products
      </motion.h1>

      {products.map((product, index) => (
        <motion.section
          key={product.slug}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-10 py-16 border-t border-gray-200 dark:border-gray-700`}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full md:w-1/2 h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </motion.div>

          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-navy dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
              {product.category}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/products/${product.slug}`}
                className="px-6 py-2 rounded-full bg-[#D4AF37] text-black font-medium hover:bg-[#D4AF37]/80 transition"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] font-medium hover:bg-[#D4AF37]/10 transition"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </motion.section>
      ))}
    </section>
  );
}
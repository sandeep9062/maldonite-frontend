"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { useGetProductBySlugQuery } from "../../../services/productsApi";

interface ProductData {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tagline?: string;
  features?: string[];
  technologies?: string[];
}

export default function ProductDetailClient({
  initialProduct,
}: {
  initialProduct?: ProductData;
}) {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug, {
    skip: !slug,
  });

  const currentProduct = product || initialProduct;

  if (isLoading && !initialProduct) {
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
        Loading product details...
      </div>
    );
  }

  if (isError || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500 dark:text-red-400">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen mt-10 bg-white dark:bg-darkbg1 py-16 px-6 md:px-10 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-1">
            <Link href="/" className="hover:text-[#D4AF37] transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-[#D4AF37] transition">
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {currentProduct.name}
            </span>
          </nav>

          {/* Product Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-2">
            {currentProduct.name}
          </h1>
          {currentProduct.tagline && (
            <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-4">
              {currentProduct.tagline}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 uppercase tracking-wide">
            {currentProduct.category}
          </p>

          {/* Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Text content */}
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {currentProduct.description}
              </p>

              {/* Features */}
              {currentProduct.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy dark:text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    {currentProduct.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {currentProduct.technologies && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#D4AF37] font-medium hover:bg-[#D4AF37]/10 transition"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-medium hover:bg-[#D4AF37]/80 transition shadow-md"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

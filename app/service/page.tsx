"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetServicesQuery } from "@/services/servicesApi"; // Import the hook
import * as Icon from "react-icons/fa"; // Import react-icons dynamically

const ServicesGrid = () => {
  // Use the RTK Query hook to fetch data
  const { data: services = [], isLoading, isError } = useGetServicesQuery();

  // Handle loading and error states
  if (isLoading) {
    return (
      <main className="bg-white mt-20 dark:bg-[#0D1321] text-black dark:text-white">
        <section className="text-center py-16 px-4">
          <h1 className="text-4xl font-bold">Loading Services...</h1>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="bg-white mt-20 dark:bg-[#0D1321] text-black dark:text-white">
        <section className="text-center py-16 px-4">
          <h1 className="text-4xl font-bold">Error loading services.</h1>
        </section>
      </main>
    );
  }

  // A helper function to get the correct icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = Icon[iconName as keyof typeof Icon];
    return IconComponent || null;
  };

  return (
    <main className="bg-white mt-20 dark:bg-[#0D1321] text-black dark:text-white">
      {/* Header Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-white to-gray-100 dark:from-[#0D1321] dark:to-[#1a1a1a]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-navy dark:text-white mb-4"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          From design to deployment to AI automation — we build powerful digital
          solutions that scale with your vision.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => {
            const IconComponent = service.icon
              ? getIconComponent(service.icon)
              : null;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/service/${service.slug}`}
                  className="block h-full"
                >
                  <div className="h-full cursor-pointer p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[#d4af37] group">
                    {/* Icon */}
                    {IconComponent && (
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37]/20 mb-5 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-[#d4af37] text-2xl" />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 text-[#0d1321] dark:text-white">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      {service.desc}
                    </p>

                    {/* Key Points */}
                    {service.points && service.points.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-6">
                        {service.points.slice(0, 3).map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <span className="inline-block px-4 py-2 text-sm font-semibold hover:text-gold text-[#0d1321] dark:text-gray-100 rounded-lg transition-all duration-300">
                        Know More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
};

export default ServicesGrid;
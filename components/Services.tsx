"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGetServicesQuery } from "@/services/servicesApi";
import * as Icon from "react-icons/fa";

const Services = () => {
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
    // We use a type assertion to inform TypeScript about the dynamic property access
    const IconComponent = Icon[iconName as keyof typeof Icon];
    return IconComponent || null;
  };

  return (
    <section className="relative w-full py-20 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-darkbg1 dark:to-darkbg2 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Heading with fade-up animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At Maldonite, we don’t just deliver services—we craft digital
            experiences. From web and mobile apps to AI-powered platforms and
            enterprise SaaS solutions, our expertise helps businesses scale
            faster, innovate smarter, and stay ahead in the digital age.
          </p>
        </motion.div>

        {/* Grid with staggered animation */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {services.map((service, index) => {
            // Get the correct icon component for the service
            const ServiceIcon = service.icon
              ? getIconComponent(service.icon)
              : null;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href={`/service/${service.slug}`}
                  className="
                  block w-40 h-40 mx-auto group
                  rounded-xl bg-white dark:bg-[#1A1A1A] shadow-lg
                  border border-gray-200 dark:border-gray-700
                  flex flex-col items-center justify-center text-center space-y-3
                  transform hover:scale-105 hover:shadow-xl hover:border-gold
                  transition-all duration-300
                "
                >
                  {/* Icon Container */}
                  <div
                    className="
                    w-12 h-12 flex items-center justify-center rounded-xl
                    transition-all duration-300
                   
                  "
                  >
                    {/* Correctly render the dynamic icon */}
                    {ServiceIcon && (
                      <ServiceIcon className="text-3xl text-gold dark:text-gold" />
                    )}
                  </div>

                  {/* Text Container */}
                  <span className="text-md font-semibold text-gray-800 dark:text-gray-200 px-2">
                    {service.title}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

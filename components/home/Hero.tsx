"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";
const Hero = () => {
  const { data: siteSettings } = useGetSiteSettingsQuery();

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#0D1321] dark:via-[#0F111A] dark:to-[#1a1a1a] text-center pt-16 sm:pt-22 pb-10 sm:pb-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-navy/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl px-4 mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite"
              width={100}
              height={100}
              className="mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-[100px] sm:h-[100px] sparkle-animation"
              priority
            />
          )}
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-4xl font-extrabold md:text-5xl text-navy dark:text-white leading-tight sm:leading-normal px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Igniting Innovation with{" "}
          <span className="text-gold">Scalable Code</span>
        </motion.h1>

        <motion.p
          className="max-w-xl mx-auto mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Build high-performing, modern projects with a team that treats your
          vision like gold.
        </motion.p>

        <motion.div className="mt-6 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Link
            href="/services"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gold text-navy font-semibold shadow-lg hover:bg-[#c89d2a] transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
          >
            Explore Our Services
          </Link>
          <Link
            href="/quote"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-gray-900 dark:text-white border border-gray-400 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
          >
            Get Custom Quote
          </Link>
        </motion.div>
      </motion.div>

      {/* Social Proof Section - more integrated */}
      <motion.div className="mt-10 sm:mt-36 w-full mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-8 text-gray-400 dark:text-gray-600">
          <div className="flex flex-col items-center">
            <div className="text-base sm:text-xl font-bold text-navy dark:text-gray-400">
              {siteSettings?.clientsServed} +
            </div>
            <div className="mt-1 sm:mt-2 text-[10px] sm:text-sm uppercase tracking-wide">
              Happy Clients
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-base sm:text-xl font-bold text-navy dark:text-gray-400">
              {siteSettings?.projectsCompleted}+
            </div>
            <div className="mt-1 sm:mt-2 text-[10px] sm:text-sm uppercase tracking-wide">
              Projects Delivered
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-base sm:text-xl font-bold text-navy dark:text-gray-400">
              99%
            </div>
            <div className="mt-1 sm:mt-2 text-[10px] sm:text-sm uppercase tracking-wide">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

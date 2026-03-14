"use client";

import { FaUsers, FaGlobe, FaCode, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

export default function Milestones() {
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const milestones = [
    {
      icon: <FaCalendarCheck size={28} />,
      title: "Founded",
      value: siteSettings?.foundedIn,
      suffix: "",
      description:
        "Started with a mission to build better digital experiences.",
    },
    {
      icon: <FaUsers size={28} />,
      title: "Clients Served",
      value: siteSettings?.clientsServed,
      suffix: "+",
      description: "From startups to enterprises across various industries.",
    },
    {
      icon: <FaGlobe size={28} />,
      title: "Countries Reached",
      value: siteSettings?.countriesReached,
      suffix: "+",
      description: "Worked with clients in over 6 countries.",
    },
    {
      icon: <FaCode size={28} />,
      title: "Projects Delivered",
      value: siteSettings?.projectsCompleted,
      suffix: "+",
      description: "Web, mobile, eCommerce, and more.",
    },
  ];

  return (
    <section className="py-20 px-4 mt-20 bg-white dark:bg-darkbg1 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1321] dark:text-white mb-12">
          Our Milestones
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.2 }}
              className="
              p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] dark:text-[#ffffff] 
              hover:shadow-xl hover:border-[#d4af37] transition-all duration-300 group
              "
            >
              <div className="mb-4 text-gold">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-1">
                <CountUp end={item.value ?? 0} duration={2} />
                {item.suffix}
              </h3>
              <p className="text-md font-medium text-gray-800 dark:text-gray-300 mb-1">
                {item.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaShoppingCart,
  FaUniversity,
  FaBuilding,
  FaGraduationCap,
  FaPlane,
  FaTruck,
  FaRocket,
} from "react-icons/fa";

const industries = [
  { name: "Healthcare", icon: FaStethoscope, color: "#E91E63" },
  { name: "E-commerce", icon: FaShoppingCart, color: "#4CAF50" },
  { name: "FinTech", icon: FaUniversity, color: "#2196F3" },
  { name: "Real Estate", icon: FaBuilding, color: "#9C27B0" },
  { name: "Education", icon: FaGraduationCap, color: "#FFC107" },
  { name: "Travel & Hospitality", icon: FaPlane, color: "#03A9F4" },
  { name: "Logistics", icon: FaTruck, color: "#FF5722" },
  { name: "Startups & SaaS", icon: FaRocket, color: "#00BCD4" },
];

const IndustriesServed = () => {
  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-[#0D1321]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-4">
          Industries We Serve
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-xl mx-auto px-2">
          From startups to enterprises, Maldonite Solutions powers businesses
          across sectors.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {industries.map(({ name, icon: Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="py-4 sm:py-6 px-2 sm:px-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#1a1a1a] text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 hover:shadow-md hover:border-[#d4af37] transition-all duration-300 flex flex-col items-center space-y-2 sm:space-y-3"
            >
              <Icon size={24} className="sm:size-[32px] text-[#d4af37]" />
              <span>{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;


"use client"
import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <section className="text-center mt-20 py-20 bg-gradient-to-br from-white to-gray-300 dark:from-[#0D1321] dark:to-[#1a1a1a]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-4">
          Get in Touch
        </h1>

        <p className="text-gray-700 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          From design to deployment to AI automation — we build powerful digital
          solutions that scale with your vision. Contact us to start your journey.
        </p>
      </motion.div>
    </section>
  );
};

export default ContactHeader;

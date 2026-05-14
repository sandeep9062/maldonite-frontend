"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const BottomCTA = () => {
  return (
    <section className="bg-[#d4af37] dark:bg-[#D4AF37] text-black py-16 sm:py-20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        >
          Let&rsquo;s Build Something Golden Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-800 text-sm sm:text-base md:text-lg mb-6 sm:mb-8"
        >
          Partner with Maldonite Solutions to bring your product to life with
          powerful, scalable web technology.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/contact"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded bg-black text-white text-sm sm:text-base font-semibold hover:bg-gray-800 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BottomCTA;

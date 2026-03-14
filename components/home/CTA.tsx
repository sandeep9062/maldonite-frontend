"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-16 bg-[var(--color-gold)] text-center text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl">Let’s Build Something Golden</h2>
        <p className="mt-2 text-gray-900 dark:text-gray-900">
          Contact us to start your custom project today.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;

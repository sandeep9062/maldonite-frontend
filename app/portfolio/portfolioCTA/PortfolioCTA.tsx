import React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AboutCTA = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center py-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to Build Something Great?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto text-base sm:text-lg">
          Lets work together to bring your vision to life — fast, scalable, and
          user-focused.
        </p>
        <Button size="lg" className="text-lg px-8 py-6" asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </motion.section>
    </>
  );
};

export default AboutCTA;

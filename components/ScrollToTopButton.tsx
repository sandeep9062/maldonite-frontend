"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop } from "@/lib/smooth-scroll";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    // Bottom-LEFT: the bottom-right corner is already crowded with the
    // WhatsApp widget + quick-quote tab, so we avoid overlapping them.
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-(--z-chat-widget)">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            onClick={() => scrollToTop()}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-3 rounded-full bg-gold hover:bg-gold/90 text-primary-foreground shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-opacity-50"
          >
            <FaArrowUp aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToTopButton;

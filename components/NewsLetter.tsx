"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, Variants } from "framer-motion";
import { useSubscribeToNewsletterMutation } from "@/services/newsLetterApi";
import toast from "react-hot-toast";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Newsletter = () => {
  // State to manage the email input value
  const [email, setEmail] = useState("");

  // Use the Redux Toolkit Query mutation hook
  const [subscribeToNewsletter, { isLoading }] =
    useSubscribeToNewsletterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the mutation function with the email
      await subscribeToNewsletter({ email }).unwrap();
      toast.success(
        "Thank you for subscribing! Check your email for a confirmation."
      );
      setEmail(""); // Clear the input field on success
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      console.error("Subscription failed:", err);
    }
  };

  return (
    <motion.section
      className="w-full bg-white dark:bg-darkbg1 transition-colors duration-300"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg transition-colors duration-300 border-2 border-gray-100 dark:border-gray-800"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-3 text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Stay Ahead in the Digital Gold Rush
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto"
            variants={itemVariants}
          >
            Get exclusive insights on building, launching, and scaling digital
            products. Join our newsletter to get ahead of the curve.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            variants={itemVariants}
          >
            <Input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white dark:bg-white border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:ring-2 focus:ring-gold focus:border-transparent transition-colors duration-300"
            />
            <Button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className="bg-gold hover:bg-gold/80 font-semibold text-black dark:bg-gold dark:hover:bg-gold/80 transition-colors rounded duration-300"
            >
              {isLoading ? "Joining..." : "Join the Community"}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;

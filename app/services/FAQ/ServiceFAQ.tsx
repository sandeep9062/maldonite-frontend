"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope, but most MVPs or websites are delivered in 4–8 weeks with clear sprint-based progress.",
  },
  {
    question: "Do you offer ongoing maintenance or support?",
    answer: "Yes! We offer flexible monthly support packages for bug fixes, performance optimization, and feature updates.",
  },
  {
    question: "Can you work with our existing backend or codebase?",
    answer: "Absolutely. We’re experienced with integrations and legacy system modernization. We’ll review and enhance what you have.",
  },
  {
    question: "Do you provide designs or need us to provide them?",
    answer: "We have an in-house UI/UX team, but we can also work with your designs (Figma, Adobe XD, etc).",
  },
];

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  
  return (
    <section className="py-20 bg-white dark:bg-[#0D1321]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0d1321] dark:text-white mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text- dark:text-white"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 dark:text-gray-300 text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;

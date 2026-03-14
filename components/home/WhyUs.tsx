"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  LayoutDashboard,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import {useGetWebsiteImageByContextQuery,WebsiteImage} from "@/services/websiteImagesApi"


const points = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#d4af37]" />,
    title: "10+ Years of Engineering Expertise",
    desc: "Our engineers have scaled startups into million-dollar ventures. Whether it’s MVPs or enterprise systems, we build products that stand the test of time.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-[#d4af37]" />,
    title: "Agile. Transparent. Reliable.",
    desc: "We follow weekly sprints, real-time reporting, and fast iterations—ensuring you're always in the loop and moving forward.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#d4af37]" />,
    title: "Future-Proof Tech Architecture",
    desc: "Using modern stacks like Next.js, MongoDB, and microservices, we craft backend and frontend systems that are secure, scalable, and fast.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-[#d4af37]" />,
    title: "Product-Focused Collaboration",
    desc: "We don’t just deliver code—we align with your vision, goals, and timelines to craft solutions that truly impact your business.",
  },
];

const WhyUs = () => {

const { data: imageData, isLoading, isError } =
    useGetWebsiteImageByContextQuery("why-us");





  return (
    <section className="py-24 bg-white dark:bg-darkbg1">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Heading Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Why Choose <span className="text-[#d4af37]">Maldonite</span>?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We go beyond coding—we partner with you. With deep product insight
            and a focus on results, we turn your vision into scalable,
            revenue-driving software.
          </p>
        </motion.div>

        {/* Grid Section: Features + Image */}
        <div className="grid md:grid-cols-2 gap-12 items-start md:items-center">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2"
          >
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md hover:border-[#d4af37] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">{point.icon}</div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-white group-hover:text-[#d4af37] transition-colors">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Image Block with Alignment Fix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center h-full"
          >
            <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
             
             {isLoading && (
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
                  <span className="text-gray-400">Loading image...</span>
                </div>
              )}
              {isError && (
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-red-500">Failed to load image</span>
                </div>
              )}
              {imageData?.data?.url && (
             
              <Image
                src={imageData.data.url}
                alt={imageData.data.altText}
                width={700}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />)}
            </div>
          </motion.div>
        </div>

        {/* CTA Full Width Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href="/contact"
            className="block w-xl text-center bg-[#d4af37] hover:bg-[#c9a437] text-black font-semibold py-3 px-2 rounded shadow-md transition-all text-lg"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;

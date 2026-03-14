"use client";
import { motion } from "framer-motion";

import {
  useGetWebsiteImageByContextQuery,
 
} from "@/services/websiteImagesApi";

const steps = [
  {
    title: "1. Discovery & Proposal",
    description:
      "We understand your goals and prepare a tailored plan with timelines, tools, and budget.",
  },
  {
    title: "2. Design & Wireframing",
    description:
      "Our UI/UX team creates mockups and prototypes for a seamless, pixel-perfect experience.",
  },
  {
    title: "3. Development & Iterations",
    description:
      "Frontend and backend come alive in agile sprints with frequent client feedback loops.",
  },
  {
    title: "4. QA, Launch & Optimization",
    description:
      "After testing, we deploy with care. Post-launch support ensures performance and growth.",
  },
];

const ServiceTimeline = () => {
  // ✅ mission image query
  const { data: processBackgroundImage } =
    useGetWebsiteImageByContextQuery("process-background");

  const backgroundUrl = processBackgroundImage?.data?.url;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundUrl || ""})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-26">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
          Our Process, Start to Success
        </h2>

        <div className="relative border-l-2" style={{ borderColor: "#d4af37" }}>
          <div className="pl-6 space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Text */}
                <h3 className="text-lg sm:text-xl font-semibold text-gold">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 max-w-prose mt-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimeline;

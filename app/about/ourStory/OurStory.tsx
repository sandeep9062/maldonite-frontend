"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useGetWebsiteImageByContextQuery } from "@/services/websiteImagesApi";

export default function OurStory() {
  const { data: teamMaldoniteImage } =
    useGetWebsiteImageByContextQuery("team-maldonite");

  return (
    <section className="bg-white text-gray-800 dark:bg-darkbg1 dark:text-white py-20 px-6 sm:px-10 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-xl shadow-md"
        >
          {teamMaldoniteImage?.data?.url && (
            <Image
              src={teamMaldoniteImage.data.url}
              alt={teamMaldoniteImage.data.altText}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          )}
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary dark:text-white">
            Our Story
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded in 2020, <strong>Maldonite</strong> emerged with a vision to
            revolutionize digital transformation through modern, scalable, and
            intelligent software solutions. From our roots in Panchkula (HR), we
            quickly became one of the region’s first fully remote tech
            teams—collaborating with clients across the U.S., U.K., Canada, and
            UAE. Our mission is to craft web applications that go beyond
            functionality, offering performance, security, and a seamless user
            experience. With deep expertise in full-stack SaaS development using
            the MERN stack and Next.js, we turn complex ideas into high-impact
            platforms. Our approach blends beautiful UI/UX design with real-time
            interactivity, cloud-native architecture, and intelligent
            automation. At our core, we're not just builders—we’re partners in
            growth, delivering results fast while staying committed to long-term
            success.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

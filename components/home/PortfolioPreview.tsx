"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useGetProjectsQuery } from "@/services/projectsApi";

const ACCENT_GOLD = "#D4AF37";
const NAVY_COLOR = "text-gray-800 dark:text-white";

const PortfolioPreview = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading recent projects...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-red-500 dark:text-red-400">
          Failed to load projects.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-[#0D1321]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-4"
      >
        {/* Heading */}
        <motion.h2
          className={`text-4xl font-bold ${NAVY_COLOR} text-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Recent Work
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mt-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Crafting digital solutions with precision, performance & passion.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...projects]
            .sort(
              (a, b) =>
                new Date(b.updatedAt || b.createdAt || "").getTime() -
                new Date(a.updatedAt || a.createdAt || "").getTime(),
            )
            .slice(0, 3)
            .map((project, i) => {
              const coverImage =
                project.image && project.image.length > 0
                  ? project.image[0]
                  : "/placeholder.png";

              return (
                <motion.div
                  key={project._id}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:bg-[#1A1A1A] dark:hover:bg-gradient-to-br dark:hover:from-[#1A1A1A] dark:hover:to-[#2A2A2A] rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gold/50 transition-all duration-300"
                >
                  {/* Type badge */}
                  {project.type && (
                    <span
                      className="absolute top-4 right-4 text-xs font-bold uppercase px-3 py-1 rounded-full z-10"
                      style={{ backgroundColor: ACCENT_GOLD, color: "#000" }}
                    >
                      {project.type}
                    </span>
                  )}

                  {/* Image */}
                  <div className="relative h-52 w-full">
                    <Link href={`/projects/${project.slug}`}>
                      <Image
                        height={400}
                        width={600}
                        src={coverImage}
                        alt={project.title}
                        className="object-cover w-full h-full transition duration-300 group-hover:scale-[1.05]"
                      />
                    </Link>
                  </div>

                  {/* Content */}

                  <Link href={`/projects/${project.slug}`}>
                    <div className="p-5">
                      <h3
                        className={`text-xl font-semibold transition ${NAVY_COLOR}`}
                        style={{ transition: "color 0.3s ease" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex gap-4 mt-4">
                        {/* Detail Page Link */}
                        <div
                          // href={`/projects/${project.slug}`}
                          aria-label={`View details for ${project.title}`}
                          className="text-gray-700 dark:text-gray-300 transition hover:text-gold"
                          style={{ transition: "color 0.3s ease" }}
                        >
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-block px-8 py-3 rounded font-semibold transition"
            style={{ backgroundColor: ACCENT_GOLD, color: "#000" }}
          >
            Explore More Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PortfolioPreview;

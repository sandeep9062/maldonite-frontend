"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BottomCTA from "@/app/services/BottomCTA/BottomCTA";
import Head from "next/head";

// Interface for a single project for type safety
interface Project {
  _id: string;
  title: string;
  slug: string;
  live: string;
  type: string;
  github: string;
  description: string;
  clientName: string;
  place: string;
  timeDuration: string;
  cost: number;
  technologiesUsed: string[];
  deployment: string;
  features: string[];
  specialFeature: string;
  numberOfPages: number;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailsClient({ project }: { project: Project }) {
  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  // --------------------------

  // 🌟 The gold color is now defined as a Tailwind utility class for better consistency
  const accentColor = "bg-yellow-500 text-gray-900"; // A brighter, more modern gold/yellow

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: "SoftwareDevelopment",
    description: project.description,
    operatingSystem: "WEB",
    url: `https://www.maldonite.com/projects/${project.slug}`,
    image: project.image && project.image.length > 0 ? project.image[0] : '/images/maldonite.png',
    author: {
      "@type": "Organization",
      name: "Maldonite",
      url: "https://www.maldonite.com"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      "reviewCount": "15"
    },
    "offers": {
      "@type": "Offer",
      "price": project.cost,
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen mt-5 bg-white dark:bg-darkbg1 py-16 sm:py-24 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Back to Portfolio Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
          </motion.div>

          {/* Title & Type */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0"
            >
              {project.title}
            </motion.h1>

            {/* Type Badge */}
            {project.type && (
              <motion.span
                variants={itemVariants}
                className={`px-4 py-1 text-sm rounded-full font-bold uppercase tracking-wider ${accentColor}`}
              >
                {project.type}
              </motion.span>
            )}
          </div>

          {/* Images Carousel - Improved Styling */}
          {project.image?.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                // Use a group class to enable group-hover effects for navigation
                className="rounded-xl shadow-2xl overflow-hidden swiper-container-custom group"
              >
                {project.image.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-[400px] md:h-[550px] lg:h-[650px]">
                      <Image
                        src={img}
                        alt={`${project.title} image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      {/* Add a subtle dark overlay to help navigation/pagination stand out */}
                      <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}

          {/* Description */}
          {project.description && (
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 border-l-4 border-gold pl-4 py-2 italic"
            >
              {project.description}
            </motion.p>
          )}

          {/* Details & Info Section */}
          <motion.div variants={containerVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Project Overview
            </h2>
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300"
            >
              {project.clientName && (
                <p>
                  <b>Client:</b> {project.clientName}
                </p>
              )}
              {project.place && (
                <p>
                  <b>Place:</b> {project.place}
                </p>
              )}
              {project.timeDuration && (
                <p>
                  <b>Duration:</b> {project.timeDuration}
                </p>
              )}
              {project.cost && (
                <p>
                  <b>Cost:</b> Rs. {project.cost}
                </p>
              )}
              {project.numberOfPages && (
                <p>
                  <b>Pages:</b> {project.numberOfPages}
                </p>
              )}
              {project.specialFeature && (
                <p>
                  <b>Special Feature:</b> {project.specialFeature}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Technologies */}
          {project.technologiesUsed?.length > 0 && (
            <motion.div variants={containerVariants} className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Core Technologies
              </h3>
              <motion.ul variants={itemVariants} className="flex flex-wrap gap-3">
                {project.technologiesUsed.map((tech: string, i: number) => (
                  <li
                    key={i}
                    className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    {tech}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Features */}
          {project.features?.length > 0 && (
            <motion.div variants={containerVariants} className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Key Features
              </h3>
              <motion.ul
                variants={itemVariants}
                className="list-none pl-0 space-y-3"
              >
                {project.features.map((f: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-gold mr-3 mt-1 text-lg">
                      &bull;
                    </span>
                    {f}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium transition duration-300 hover:bg-yellow-500 hover:text-gray-900 shadow-md"
              >
                <span className="truncate">View Code on GitHub</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}

            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-medium transition duration-300 hover:bg-yellow-500 hover:text-gray-900 shadow-md"
              >
                <span className="truncate">Live Demo</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}

            {project.deployment && (
              <Link
                href={project.deployment}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
              >
                <span className="truncate">Deployment Details</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.section>

      <BottomCTA />
    </>
  );
}

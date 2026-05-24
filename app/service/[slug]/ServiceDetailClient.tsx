"use client";

import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import * as Icon from "react-icons/fa";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  Target,
  Users,
  CheckCircle,
  Wrench,
  Star,
  Tag,
  Award,
} from "lucide-react";
import { useGetServiceBySlugQuery } from "@/services/servicesApi";

interface ServiceData {
  title: string;
  desc: string;
  longDesc?: string;
  serviceImage?: string;
  category?: string;
  icon?: string;
  duration?: string;
  pricing?: string;
  targetAudience?: string;
  points?: string[];
  valueProvide?: string[];
  tools?: string[];
  whyChooseUs?: string;
  tags?: string[];
  keywords?: string[];
  cta?: string;
}

export default function ServiceDetailClient({
  initialService,
}: {
  initialService?: ServiceData;
}) {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: service,
    isLoading,
    isError,
  } = useGetServiceBySlugQuery(slug, {
    skip: !slug,
  });

  const currentService = service || initialService;

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icon as { [key: string]: IconType })[iconName];
    return IconComponent || null;
  };

  const ACCENT_COLOR = "#d4af37"; // Gold
  const ACCENT_TEXT_COLOR = "text-gray-900 dark:text-gray-100";

  if (isLoading && !initialService) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          Loading service details...
        </p>
      </main>
    );
  }

  if (isError || !currentService) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Service not found or an error occurred.
        </p>
      </main>
    );
  }

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const ServiceIcon = currentService.icon
    ? getIconComponent(currentService.icon)
    : null;

  return (
    <main className="bg-white dark:bg-darkbg1 pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen text-gray-900 dark:text-gray-100">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="max-w-6xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20"
      >
        {/* Back Button */}
        <motion.div
          variants={sectionVariants}
          className="mb-6 flex items-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Services</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          variants={sectionVariants}
          className="flex flex-col gap-4 pb-6 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-6">
            <div
              className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl shadow-lg bg-amber-100 dark:bg-gray-800`}
            >
              {ServiceIcon && (
                <ServiceIcon
                  className="text-3xl"
                  style={{ color: ACCENT_COLOR }}
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {currentService.title}
              </h1>
              {currentService.category && (
                <span
                  className={`text-xl font-semibold mt-1 block ${ACCENT_TEXT_COLOR}`}
                >
                  {currentService.category}
                </span>
              )}
            </div>
          </div>
        </motion.header>

        {/* Service Image */}
        {currentService.serviceImage && (
          <motion.div
            variants={sectionVariants}
            className="relative w-full aspect-[16/10] md:aspect-[16/8] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105"
          >
            <Image
              src={currentService.serviceImage}
              alt={currentService.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Description */}
        <motion.section variants={sectionVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            {currentService.desc}
          </p>
          {currentService.longDesc && (
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {currentService.longDesc}
            </p>
          )}
        </motion.section>

        {/* Key Details */}
        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {currentService.duration && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="text-[#d4af37]" size={20} />
                <h3 className="text-lg sm:text-xl font-semibold">Duration</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {currentService.duration}
              </p>
            </div>
          )}

          {currentService.pricing && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="text-[#d4af37]" size={20} />
                <h3 className="text-lg sm:text-xl font-semibold">Pricing</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {currentService.pricing}
              </p>
            </div>
          )}

          {currentService.targetAudience && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-[#d4af37]" size={20} />
                <h3 className="text-lg sm:text-xl font-semibold">
                  Target Audience
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {currentService.targetAudience}
              </p>
            </div>
          )}
        </motion.section>

        {/* Key Points */}
        {currentService.points && currentService.points.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currentService.points.map((point: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <CheckCircle
                    className="text-[#d4af37] mt-1 flex-shrink-0"
                    size={18}
                  />
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Value Provided */}
        {currentService.valueProvide &&
          currentService.valueProvide.length > 0 && (
            <motion.section variants={sectionVariants}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Value We Provide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {currentService.valueProvide.map(
                  (value: string, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 rounded-xl border border-amber-200 dark:border-gray-600"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Star className="text-[#d4af37]" size={18} />
                        <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                          Benefit {index + 1}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        {value}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </motion.section>
          )}

        {/* Tools & Technologies */}
        {currentService.tools && currentService.tools.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentService.tools.map((tool: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium"
                >
                  <Wrench size={16} />
                  {tool}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Why Choose Us */}
        {currentService.whyChooseUs && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Why Choose Us
            </h2>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 md:p-8 rounded-xl border border-amber-200 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-[#d4af37]" size={24} />
                <h3 className="text-lg sm:text-xl font-semibold">
                  Our Commitment
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentService.whyChooseUs}
              </p>
            </div>
          </motion.section>
        )}

        {/* Tags */}
        {currentService.tags && currentService.tags.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentService.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
                >
                  <Tag size={16} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Keywords */}
        {currentService.keywords && currentService.keywords.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Keywords
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentService.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Call to Action */}
        {currentService.cta && (
          <motion.section variants={sectionVariants} className="text-center">
            <div className="bg-[#d4af37] text-black p-6 sm:p-8 rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 opacity-90">
                {currentService.cta}
              </p>
              <Link
                href="/contact"
                className="inline-block bg-black text-[#d4af37] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:scale-102 transition-colors"
              >
                Contact Us Today
              </Link>
            </div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}

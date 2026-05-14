"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  FaUsers,
  FaLaptopCode,
  FaIndustry,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

import OurClients from "./ourClients/OurClients";
import OurStory from "./ourStory/OurStory";
import CTAWithForm from "../../components/CTAWithForm";

import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

import { useGetWebsiteImageByContextQuery } from "@/services/websiteImagesApi";

const missionPoints = [
  "Full-stack development using MERN & Next.js",
  "Tailored eCommerce portals with real-time analytics",
  "Intuitive UI/UX systems and responsive design",
  "API-first architecture & cloud-native deployment",
  "Data-driven SEO & growth-focused digital marketing",
  "AI integrations: Chatbots, OCR, TTS, and automation",
];

export default function AboutPage() {
  // ✅ site settings query
  const { data: siteSettings } = useGetSiteSettingsQuery();

  // ✅ mission image query
  const { data: missionImage } = useGetWebsiteImageByContextQuery("mission");

  // ✅ what we do image query
  const { data: whatWeDoImage } =
    useGetWebsiteImageByContextQuery("what-we-do");

  const aboutStats = [
    {
      icon: <FaUsers className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Clients Served",
      value: `${siteSettings?.clientsServed ?? 0}+`,
    },
    {
      icon: <FaLaptopCode className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Projects Completed",
      value: `${siteSettings?.projectsCompleted ?? 0}+`,
    },
    {
      icon: <FaIndustry className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Industries Served",
      value: `${siteSettings?.industriesServed ?? 0}+`,
    },
    {
      icon: <FaBrain className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "AI Integrations",
      value: `${siteSettings?.aiIntegrations ?? 0}+`,
    },
  ];

  return (
    <>
      <main className="min-h-screen pt-16 sm:pt-20 mt-16 text-gray-800 dark:text-gray-100 bg-white dark:bg-darkbg1 px-4 sm:px-6 md:px-8 lg:px-12 transition-colors duration-300">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto px-0 sm:px-4"
        >
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite logo"
              width={64}
              height={64}
              className="mx-auto mb-4 sm:mb-6 sparkle-animation w-16 sm:w-20 h-auto"
              priority
            />
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight">
            About Maldon<span className="text-gold">i</span>te
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Empowering businesses with modern software, scalable design, and
            intelligent automation. We specialize in building robust, elegant
            digital experiences for startups and enterprises alike.
          </p>
        </motion.section>

        <Separator className="my-8 sm:my-10 md:my-12 lg:my-16" />

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
        >
          {/* Left Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-80 lg:h-96 rounded-xl overflow-hidden">
            {missionImage?.data?.url && (
              <Image
                src={missionImage?.data?.url}
                alt={missionImage?.data?.altText}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl"
              />
            )}
          </div>

          {/* Right Text */}
          <div className="text-left">
            <h2 className="font-bold mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl text-primary">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
              At <strong>Maldonite</strong>, we craft software that scales,
              performs, and delivers results. Our goal is to empower businesses
              through strategic, data-driven digital products.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We partner with visionary teams to co-create experiences that
              disrupt and delight. Every product we build is grounded in
              research, driven by performance, and built to scale.
            </p>
          </div>
        </motion.section>

        <Separator className="my-8 sm:my-10 md:my-12 lg:my-16" />

        {/* What We Do Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
        >
          {/* Left Text — shows first on mobile (text first), image below */}
          <div className="text-left order-1 md:order-none">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-primary">
              What We Do
            </h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex gap-2 sm:gap-3 items-start">
                  <FaCheckCircle className="text-gold w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-80 lg:h-96 rounded-xl overflow-hidden order-2 md:order-none">
            {whatWeDoImage?.data?.url && (
              <Image
                src={whatWeDoImage.data.url}
                alt={whatWeDoImage.data.altText}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl"
              />
            )}
          </div>
        </motion.section>

        <Separator className="my-8 sm:my-10 md:my-12 lg:my-16" />

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-center max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          {aboutStats.map((stat, index) => (
            <div
              key={index}
              className="bg-muted dark:bg-[#1E1E20] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-2 sm:mb-3 flex justify-center text-gold">
                {stat.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="text-sm sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.section>

        <Separator />
      </main>

      {/* Additional Sections */}
      <OurStory />
      <OurClients />
      <CTAWithForm />
    </>
  );
}

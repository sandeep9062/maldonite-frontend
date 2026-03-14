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
      icon: <FaUsers className="w-6 h-6" />,
      label: "Clients Served",
      value: `${siteSettings?.clientsServed ?? 0}+`,
    },
    {
      icon: <FaLaptopCode className="w-6 h-6" />,
      label: "Projects Completed",
      value: `${siteSettings?.projectsCompleted ?? 0}+`,
    },
    {
      icon: <FaIndustry className="w-6 h-6" />,
      label: "Industries Served",
      value: `${siteSettings?.industriesServed ?? 0}+`,
    },
    {
      icon: <FaBrain className="w-6 h-6" />,
      label: "AI Integrations",
      value: `${siteSettings?.aiIntegrations ?? 0}+`,
    },
  ];

  return (
    <>
      <main className="min-h-screen pt-20 mt-16 text-gray-800 dark:text-gray-100 bg-white dark:bg-darkbg1 px-4 md:px-8 lg:px-12 transition-colors duration-300">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite logo"
              width={80}
              height={80}
              className="mx-auto mb-6 sparkle-animation"
              priority
            />
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            About Maldon<span className="text-gold">i</span>te
          </h1>
          <p className="md:text-lg text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Empowering businesses with modern software, scalable design, and
            intelligent automation. We specialize in building robust, elegant
            digital experiences for startups and enterprises alike.
          </p>
        </motion.section>

        <Separator className="my-16" />

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Image */}
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden">
            {missionImage?.data?.url && (
              <Image
                src={missionImage?.data?.url}
                alt={missionImage?.data?.altText}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>

          {/* Right Text */}
          <div>
            <h2 className=" font-bold mb-4 text-3xl md:text-4xl text-primary">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              At <strong>Maldonite</strong>, we craft software that scales,
              performs, and delivers results. Our goal is to empower businesses
              through strategic, data-driven digital products.
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We partner with visionary teams to co-create experiences that
              disrupt and delight. Every product we build is grounded in
              research, driven by performance, and built to scale.
            </p>
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* What We Do Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Text */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">What We Do</h2>
            <ul className="space-y-4 md:text-lg text-base text-gray-700 dark:text-gray-300">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <FaCheckCircle className="text-gold w-5 h-5 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden">
            {whatWeDoImage?.data?.url && (
              <Image
                src={whatWeDoImage.data.url}
                alt={whatWeDoImage.data.altText}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto mb-20"
        >
          {aboutStats.map((stat, index) => (
            <div
              key={index}
              className="bg-muted dark:bg-[#1E1E20] p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-3 flex justify-center text-gold">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
              <p className="text-sm md:text-base  text-gray-500 dark:text-gray-400 mt-1">
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

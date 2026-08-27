"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  FaUsers,
  FaLaptopCode,
  FaLightbulb,
  FaRocket,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
  FaStar,
  FaHeart,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaGlobe,
  FaCode,
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import CTAWithForm from "@/components/CTAWithForm";
import { useGetCareersQuery } from "@/services/careerApi";

// Types for Job Listings
interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  department: "Business & Ops" | "Engineering";
  description: string;
  requirements: string[];
  highlights: string[];
}

const philosophyCards = [
  {
    icon: FaUsers,
    number: "01",
    title: "Zero Bureaucracy",
    description:
      "We care about functional code, exceptional user experiences, and real-world results. You own your outcomes — no red tape, no pointless meetings.",
    accent: "from-accent-blue to-cyan-400",
  },
  {
    icon: FaLaptopCode,
    number: "02",
    title: "The Cutting Edge",
    description:
      "No WordPress or Shopify. We build fully custom architectures with Next.js, production AWS serverless nodes, and custom LLM workflows.",
    accent: "from-purple-500 to-pink-400",
  },
  {
    icon: FaRocket,
    number: "03",
    title: "Immediate Impact",
    description:
      "Whether you are writing serverless APIs or leading field operations outreach, your work has a direct line to product growth.",
    accent: "from-amber-500 to-orange-400",
  },
];

const benefits = [
  {
    icon: FaGlobe,
    title: "Remote-First Culture",
    description:
      "Work from anywhere with flexible hours that respect your life.",
  },
  {
    icon: FaGraduationCap,
    title: "Learning Budget",
    description:
      "Annual stipend for courses, conferences, and skill development.",
  },
  {
    icon: FaRocket,
    title: "Ship Fast",
    description:
      "Deploy on day one. We believe in learning by doing, not watching.",
  },
  {
    icon: FaHandshake,
    title: "No Degree Required",
    description:
      "We hire based on skill and portfolio, not credentials on paper.",
  },
  {
    icon: FaChartLine,
    title: "Growth Trajectory",
    description:
      "Fast-track promotions based on output, not tenure or politics.",
  },
  {
    icon: FaHeart,
    title: "Health & Wellness",
    description: "Comprehensive health benefits and mental wellness support.",
  },
];

const stats = [
  { number: "3+", label: "Open Positions" },
  { number: "2", label: "Departments" },
  { number: "0", label: "Bureaucracy Level" },
  { number: "100%", label: "Skill-Based Hiring" },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold golden-shine mb-1"
      >
        {value}
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function CareersPageClient() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Business & Ops" | "Engineering"
  >("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  // Fetch jobs from API
  const { data: apiData } = useGetCareersQuery();

  // Fallback hardcoded jobs (used when API is unavailable)
  const fallbackJobs: Job[] = [
    {
      id: "bd-intern",
      title: "Business Development (Sales) Intern",
      type: "Internship (3-6 Months)",
      location: "Chandigarh/Panchkula/Tricity (On-field)",
      department: "Business & Ops",
      description:
        "Drive our local market presence. You will be interacting directly with businesses, understanding their operational pain points, and positioning Maldonite's custom digital platforms and software solutions.",
      requirements: [
        "Pursuing BBA / MBA / Mass Communication (Preferred)",
        "Flawless communication skills with native fluency in Hindi & Punjabi",
        "A natural ability to pitch, negotiate, and build immediate rapport face-to-face",
      ],
      highlights: [
        "Direct client interaction from day one",
        "Performance-based conversion to full-time",
        "Mentorship from founding team",
      ],
    },
    {
      id: "ops-intern",
      title: "Operations Intern",
      type: "Internship (3-6 Months)",
      location: "Chandigarh/Panchkula/Tricity Area",
      department: "Business & Ops",
      description:
        "Act as the bridge between our tech platforms and ground reality. Manage local outreach workflows, handle client onboarding documentation, and ensure data integrity within our ecosystem.",
      requirements: [
        "Strong organizational skills and an execution-first mindset",
        "Fluency in Hindi & Punjabi to comfortably handle direct client conversations",
        "Keen interest in how software applications optimize real-world operations",
      ],
      highlights: [
        "Hands-on operations management",
        "Cross-functional exposure",
        "Growth into Operations Lead role",
      ],
    },
    {
      id: "fullstack-eng",
      title: "Full-Stack / AI-ML Software Engineer",
      type: "Full-Time / Project-Based",
      location: "Panchkula / Hybrid",
      department: "Engineering",
      description:
        "Architect, optimize, and maintain production-grade custom applications. Work directly on advanced database performance, secure serverless AWS infrastructure, and custom RAG-based AI model workflows.",
      requirements: [
        "Deep production-level expertise in Next.js, Node.js, and MongoDB",
        "Solid foundations in Python, vector search databases, and prompt engineering",
        "Absolute obsession with writing highly performant, clean code — no generic templates",
      ],
      highlights: [
        "Work on cutting-edge AI/ML projects",
        "Full ownership of system architecture",
        "Direct impact on product and revenue",
      ],
    },
  ];

  // Map API data to component format, or use fallback
  const jobs: Job[] = useMemo(() => {
    if (apiData?.careers && apiData.careers.length > 0) {
      return apiData.careers.map((career: any) => ({
        id: career._id,
        title: career.title,
        type: career.type,
        location: career.location,
        department: career.department,
        description: career.description,
        requirements: career.requirements || [],
        highlights: career.highlights || [],
      }));
    }
    return fallbackJobs;
  }, [apiData]);

  const filteredJobs =
    activeTab === "All"
      ? jobs
      : jobs.filter((job) => job.department === activeTab);

  return (
    <main className="min-h-screen text-gray-800 dark:text-gray-100 bg-white dark:bg-darkbg1 transition-colors duration-300 overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Immersive gradient mesh with floating orbs
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative text-center pt-28 sm:pt-36 pb-16 sm:pb-20 md:pb-28 px-4 overflow-hidden">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-navy dark:via-navy dark:to-navy" />
          {/* Floating Orb 1 */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gold/5 dark:bg-gold/10 blur-3xl"
          />
          {/* Floating Orb 2 */}
          <motion.div
            animate={{
              x: [0, -30, 40, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"
          />
          {/* Floating Orb 3 */}
          <motion.div
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -20, 40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-blue/5 dark:bg-accent-blue/8 blur-3xl"
          />
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 sm:px-5 py-2 bg-gold/10 text-gold-text dark:text-gold rounded-full border border-gold/20 backdrop-blur-sm mb-6 sm:mb-8 shadow-lg shadow-gold/5">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              We're Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy dark:text-white mb-5 sm:mb-6 md:mb-8 leading-[1.1] tracking-tight"
          >
            Code the Future.
            <br />
            <span className="golden-shine">Build the Extraordinary.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10"
          >
            We don't do cookie-cutter websites or boilerplate templates. We
            architect, build, and scale{" "}
            <span className="text-navy dark:text-white font-semibold">
              high-performance custom engines
            </span>{" "}
            and{" "}
            <span className="text-navy dark:text-white font-semibold">
              intelligent AI systems
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#openings"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white font-semibold rounded-xl shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:bg-gold/90 transition-all duration-300 text-sm sm:text-base"
            >
              View Open Positions
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gold/50 hover:text-gold dark:hover:text-gold transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
            >
              Apply Now
              <FaPaperPlane className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BAR — Animated counters
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-2 sm:mt-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-darkbg2 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, i) => (
              <AnimatedCounter key={i} value={stat.number} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PHILOSOPHY SECTION — Glass morphism cards with gradient accents
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold-text dark:text-gold mb-3 sm:mb-4">
            Our DNA
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
            Why Work at Maldonite?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            We're building something different — here's what defines us.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
        >
          {philosophyCards.map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full group">
                {/* Gradient border glow on hover */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${card.accent} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
                />
                <div className="relative h-full bg-white dark:bg-darkbg2 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                  {/* Icon + Number */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-gray-100 dark:text-gray-800 select-none">
                      {card.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-navy dark:text-white mb-2 sm:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-[0.9rem] text-gray-600 dark:text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="my-0 max-w-7xl mx-auto" />

      {/* ═══════════════════════════════════════════════════════════
          BENEFITS SECTION — New! Perks & benefits grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold-text dark:text-gold mb-3 sm:mb-4">
            Perks & Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
            What You Get
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Beyond just a paycheck — here's how we invest in you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-darkbg2 border border-gray-100 dark:border-gray-700/50 hover:border-gold/30 dark:hover:border-gold/30 hover:bg-white dark:hover:bg-darkbg2 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gold/10 text-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-navy dark:text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="my-0 max-w-7xl mx-auto" />

      {/* ═══════════════════════════════════════════════════════════
          JOBS BOARD SECTION — Redesigned with better hierarchy
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="openings"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24"
      >
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold-text dark:text-gold mb-2 sm:mb-3">
              Join the Team
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white">
              Current Openings
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              Find your perfect role and grow with us
            </p>
          </motion.div>

          {/* Department Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex space-x-1 bg-gray-100 dark:bg-darkbg2 p-1 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            {(["All", "Business & Ops", "Engineering"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gold text-white shadow-md shadow-gold/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Job Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 sm:space-y-6"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => {
                const isExpanded = expandedJob === job.id;
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <div className="group relative bg-white dark:bg-darkbg2 border border-gray-200 dark:border-gray-700 hover:border-gold/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gold/5 transition-all duration-400">
                      {/* Gold accent line at top */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="p-5 sm:p-7 md:p-8">
                        {/* Job Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg border ${
                                  job.department === "Engineering"
                                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                                    : "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50 text-sky-700 dark:text-sky-400"
                                }`}
                              >
                                {job.department === "Engineering" ? (
                                  <FaCode className="w-3 h-3" />
                                ) : (
                                  <FaBriefcase className="w-3 h-3" />
                                )}
                                {job.department}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-gold/10 text-gold border border-gold/20">
                                <FaStar className="w-3 h-3" />
                                Featured
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-navy dark:text-white group-hover:text-gold transition-colors duration-300">
                              {job.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                            <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg font-medium">
                              <FaClock className="w-3 h-3 text-gold" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg font-medium">
                              <FaMapMarkerAlt className="w-3 h-3 text-gold" />
                              {job.location}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-6">
                          {job.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                          {job.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gold/80 dark:text-gold/70 bg-gold/5 dark:bg-gold/10 px-3 py-1.5 rounded-lg border border-gold/10"
                            >
                              <FaCheckCircle className="w-3 h-3" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Requirements — Expandable */}
                        <div className="border-t border-gray-100 dark:border-gray-700/60 pt-4 sm:pt-5">
                          <button
                            onClick={() =>
                              setExpandedJob(isExpanded ? null : job.id)
                            }
                            className="flex items-center justify-between w-full mb-3 sm:mb-4 group/btn"
                          >
                            <h4 className="text-xs sm:text-sm font-semibold text-navy dark:text-gray-200 uppercase tracking-wider">
                              Requirements & Skills
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                              {isExpanded ? "Hide" : "Show"}
                              {isExpanded ? (
                                <FaChevronUp className="w-3 h-3" />
                              ) : (
                                <FaChevronDown className="w-3 h-3" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pb-2">
                                  {job.requirements.map((req, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex gap-2.5 items-start text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3"
                                    >
                                      <FaCheckCircle className="text-gold w-4 h-4 mt-0.5 shrink-0" />
                                      <span className="leading-relaxed">
                                        {req}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Always visible apply button */}
                          <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700/40">
                            <a
                              href={`https://wa.me/919034009062?text=Hi%20Maldonite%2C%20I%20would%20like%20to%20apply%20for%20${encodeURIComponent(job.title)}.%20Here%20is%20my%20profile%3A%0AName%3A%0ALinkedIn%3A%0AGitHub%3A`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-xl shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 hover:bg-gold/90 transition-all duration-300"
                            >
                              Apply via WhatsApp
                              <FaPaperPlane className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`mailto:maldonitesolutions@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-xl hover:border-gold/50 hover:text-gold transition-all duration-300"
                            >
                              Apply via Email
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 sm:py-20 bg-gray-50 dark:bg-darkbg2 rounded-2xl sm:rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
              >
                <FaBriefcase className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4 sm:mb-5" />
                <p className="text-base sm:text-lg font-semibold text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
                  No positions open in this department right now.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Check back soon or send us your profile anyway!
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Separator className="my-0 max-w-7xl mx-auto" />

      {/* ═══════════════════════════════════════════════════════════
          APPLICATION CTA SECTION — Premium glass-morphism design
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="apply"
        className="relative py-16 sm:py-20 md:py-28 px-4 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-navy dark:via-navy dark:to-navy" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 dark:bg-gold/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Top Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold/10 mb-5 sm:mb-6 shadow-lg shadow-gold/10">
              <FaLightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
              Ready to Build With Us?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2 max-w-2xl mx-auto leading-relaxed">
              We don't prioritize legacy degrees. We value raw competence, deep
              focus, and fast execution.
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500">
              Drop your profile and let's create something functional.
            </p>
          </motion.div>

          {/* Application Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a
                href="https://wa.me/919034009062?text=Hi%20Maldonite%2C%20I%20would%20like%20to%20apply%20for%20a%20position.%20Here%20is%20my%20profile%3A%0AName%3A%0ALinkedIn%3A%0AGitHub%3A%0APortfolio%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full p-6 sm:p-7 bg-white dark:bg-darkbg2 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white">
                      WhatsApp CV
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +91 9034009062
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Send your profile directly. We respond within 24 hours on
                  working days.
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all duration-200">
                  Start Conversation
                  <FaArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="mailto:maldonitesolutions@gmail.com"
                className="group relative block h-full p-6 sm:p-7 bg-white dark:bg-darkbg2 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white">
                      Email Application
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      maldonitesolutions@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Attach your resume and portfolio. We review every application
                  personally.
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all duration-200">
                  Send Email
                  <FaArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </motion.div>
          </div>

          {/* Subject line hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-6 sm:mt-8"
          >
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Subject line format:{" "}
              <code className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-gold font-semibold text-xs sm:text-sm">
                Application for [Position Name]
              </code>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA With Form */}
      <CTAWithForm />
    </main>
  );
}

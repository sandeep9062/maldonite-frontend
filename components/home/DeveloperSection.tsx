"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Code, Database, Globe, Smartphone, Server, Award, Users, CheckCircle, Sparkles } from 'lucide-react';
import { useGetSiteSettingsQuery } from '@/services/siteSettingsApi';

const DeveloperSection = () => {
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const skills = [
    { name: 'Full-Stack Development', icon: <Code className="w-5 h-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Database Design', icon: <Database className="w-5 h-5" />, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { name: 'Web Development', icon: <Globe className="w-5 h-5" />, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Mobile Apps', icon: <Smartphone className="w-5 h-5" />, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { name: 'API Development', icon: <Server className="w-5 h-5" />, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  ];

  const technologies = [
    'React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL',
    'TypeScript', 'JavaScript', 'Python', 'AWS', 'Docker'
  ];

  const stats = [
    {
      icon: <Award className="w-6 h-6 text-gold" />,
      value: siteSettings?.projectsCompleted || '50+',
      label: 'Projects Completed',
      description: 'Delivered with excellence'
    },
    {
      icon: <Users className="w-6 h-6 text-gold" />,
      value: siteSettings?.clientsServed || '25+',
      label: 'Happy Clients',
      description: 'Satisfied worldwide'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-gold" />,
      value: '99%',
      label: 'Success Rate',
      description: 'Client satisfaction'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-[#0D1321] dark:to-[#1a1a1a] py-20 px-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-navy/5 text-navy dark:bg-white/5 dark:text-white rounded-full text-sm font-semibold mb-8 border border-navy/10 dark:border-white/10"
          >
            <Award className="w-4 h-4" />
            Professional Profile
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-6 leading-tight">
            Lead Software Developer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Delivering enterprise-grade solutions with proven expertise in modern web technologies and scalable architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Developer Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl"
          >
            <div className="p-8">
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <div className="relative inline-block mb-6">
                  <Image
                    src="/avatars/moh8it.png"
                    alt="Lead Developer"
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-gray-100 dark:border-gray-600 shadow-lg"
                  />
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-5 h-5 text-navy" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-navy dark:text-white">
                    Mohit Sharma
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 dark:bg-white/5 text-navy dark:text-white rounded-lg text-sm font-medium border border-navy/10 dark:border-white/10">
                    <Award className="w-4 h-4 text-gold" />
                    Senior Software Engineer
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    5+ Years Professional Experience
                  </p>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                  Experienced full-stack developer with expertise in modern web technologies.
                  Specializing in scalable application development, performance optimization,
                  and delivering enterprise-grade solutions that drive business success.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h4 className="text-lg font-bold text-navy dark:text-white mb-6 text-center">
                  Technical Expertise
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-4 p-4 ${skill.bgColor} rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-gold/30 transition-colors duration-300`}
                    >
                      <div className={`p-2 rounded-md bg-white/80 dark:bg-gray-800/80 ${skill.color}`}>
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center gap-6"
              >
                {siteSettings?.github && (
                  <Link
                    href={siteSettings.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gold hover:text-navy transition-colors duration-300"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </Link>
                )}
                {siteSettings?.linkedin && (
                  <Link
                    href={siteSettings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-gold hover:text-navy transition-colors duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                  </Link>
                )}
                {siteSettings?.email && (
                  <Link
                    href={`mailto:${siteSettings.email}`}
                    className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg hover:bg-gold hover:text-navy transition-colors duration-300"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5 text-green-700 dark:text-green-300" />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Technologies & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-bold text-navy dark:text-white mb-6">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-gold/10 text-gold rounded-lg text-sm font-medium border border-gold/20 hover:bg-gold hover:text-navy transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gold/10 rounded-lg mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-navy dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center pt-6"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready to discuss your project requirements?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3 bg-gold text-navy font-semibold rounded-lg shadow-lg hover:bg-[#c89d2a] transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;

"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";

import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

export default function SocialMediaLinks() {
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: siteSettings?.facebook,
      label: "Facebook",
      color: "hover:text-gold",
    },
    {
      icon: <FaInstagram />,
      href: siteSettings?.instagram,
      label: "Instagram",
      color: "hover:text-gold",
    },
    {
      icon: <FaLinkedinIn />,
      href: siteSettings?.linkedin,
      label: "LinkedIn",
      color: "hover:text-gold",
    },
    {
      icon: <FaTwitter />,
      href: siteSettings?.twitter,
      label: "Twitter",
      color: "hover:text-gold",
    },
    {
      icon: <FaGithub />,
      href: siteSettings?.github,
      label: "GitHub",
      color: "hover:text-gold",
    },
  ];
  return (
    <section className="text-center py-3 bg-white dark:bg-[#0F111A]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center gap-6"
      >
        {socialLinks.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`text-xl text-gray-700 dark:text-gray-300 hover:scale-110 transition duration-300 ${item.color}`}
          >
            {item.icon}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import React from "react";
import SocialMediaLinks from "../app/contact/SocialLinks/SocialMediaLinks"
import { motion, easeOut } from "framer-motion"; // ✅ import easing
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: easeOut, // ✅ correct easing function
    },
  }),
};

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const {
    data: siteSettings,
    isLoading,
    isError,
  } = useGetSiteSettingsQuery();

  return (
    <motion.footer
      className="bg-[#0D1321] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Logo & Tagline */}
        <motion.div
          className="space-y-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              {siteSettings?.logoUrl && (
                <Image
                  src={siteSettings.logoUrl}
                  alt="Maldonite"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <h1 className="text-2xl font-semibold">
              Maldon<span className="text-gold">i</span>te
            </h1>
          </Link>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Shaping Digital Gold. We craft scalable web experiences with
            elegance and precision.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Portfolio", "/portfolio"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
            ].map(([name, href]) => (
              <li key={name}>
                <Link href={href} className="hover:text-gold transition">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">
            Contact Us
          </h3>
          <ul className="text-sm space-y-3 text-gray-300">
            {isLoading && <li>Loading contact info...</li>}
            {isError && <li>Error fetching contact info.</li>}
            {siteSettings && (
              <>
                <li className="flex items-start gap-3">
                  <MapPin className="text-gold" size={18} />
                  {siteSettings.googleMapUrl ? (
                    <a
                      href={siteSettings.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{siteSettings.mainOffice}</span>
                    </a>
                  ) : (
                    <span>{siteSettings.mainOffice}</span>
                  )}
                </li>

                <li className="flex items-center gap-2">
                  <Phone className="text-gold" size={18} />
                  {siteSettings.contactNo1 && (
                    <a
                      href={`tel:+91${siteSettings.contactNo1}`}
                      className="hover:text-white transition"
                    >
                      +91 {siteSettings.contactNo1}
                    </a>
                  )}
                  {siteSettings.contactNo2 && (
                    <span className="ml-1">
                      ,{" "}
                      <a
                        href={`tel:+91${siteSettings.contactNo2}`}
                        className="hover:text-white transition"
                      >
                        +91 {siteSettings.contactNo2}
                      </a>
                    </span>
                  )}
                </li>

                {siteSettings.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="text-gold" size={18} />
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="hover:text-white transition"
                    >
                      {siteSettings.email}
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Animated Social Media Links */}
      <SocialMediaLinks />

      {/* Footer Bottom */}
      <motion.div
        className="border-t border-gray-700 text-center text-sm text-gray-500 py-4 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
      >
        &copy; {currentYear} Maldonite. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;

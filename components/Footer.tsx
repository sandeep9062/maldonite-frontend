"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import React from "react";
import SocialMediaLinks from "../app/contact/SocialLinks/SocialMediaLinks";
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";
import { useGetServicesQuery } from "@/services/servicesApi";

type FooterLink = { name: string; href: string };

const quickLinks: FooterLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "/contact" },
  { name: "Meet Maldo", href: "/maldo" },
];

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gold">
    {children}
  </h3>
);

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const { data: siteSettings, isLoading, isError } = useGetSiteSettingsQuery();
  const { data: services = [] } = useGetServicesQuery();
  const featuredServices = services.slice(0, 6);

  return (
    <footer className="bg-navy text-white">
      {/* Gold gradient accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Logo & Tagline */}
        <div className="space-y-3 sm:space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              {siteSettings?.logoUrl && (
                <Image
                  src={siteSettings.logoUrl}
                  alt="Maldonite"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold">
              Maldon<span className="text-gold">i</span>te
            </h1>
          </Link>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
            Shaping Digital Gold. We craft scalable web experiences with
            elegance and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <ColumnTitle>Quick Links</ColumnTitle>
          <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3 text-gray-300">
            {quickLinks.map(({ name, href }) => (
              <li key={name}>
                <Link href={href} className="hover:text-gold transition">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <ColumnTitle>Services</ColumnTitle>
          <Link
            href="/services"
            className="inline-block mb-3 text-xs sm:text-sm text-gold hover:text-white transition"
          >
            View All <span aria-hidden>→</span>
          </Link>
          <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3 text-gray-300">
            {featuredServices.length > 0 ? (
              featuredServices.map((service) => (
                <li key={service.slug || service._id}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="hover:text-gold transition"
                  >
                    {service.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-xs sm:text-sm text-gray-500">
                Loading services...
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <ColumnTitle>Contact Us</ColumnTitle>
          <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3 text-gray-300">
            {isLoading && (
              <li className="text-xs sm:text-sm">Loading contact info...</li>
            )}
            {isError && (
              <li className="text-xs sm:text-sm">
                Error fetching contact info.
              </li>
            )}
            {siteSettings && (
              <>
                <li className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="text-gold shrink-0 mt-0.5" size={16} />
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

                <li className="flex items-start gap-2 sm:gap-3">
                  <Phone className="text-gold shrink-0 mt-0.5" size={16} />
                  <span>
                    {siteSettings.contactNo1 && (
                      <a
                        href={`tel:+91${siteSettings.contactNo1}`}
                        className="hover:text-white transition"
                      >
                        +91 {siteSettings.contactNo1}
                      </a>
                    )}
                    {siteSettings.contactNo2 && (
                      <a
                        href={`tel:+91${siteSettings.contactNo2}`}
                        className="hover:text-white transition"
                      >
                        , +91 {siteSettings.contactNo2}
                      </a>
                    )}
                  </span>
                </li>

                {siteSettings.email && (
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Mail className="text-gold shrink-0 mt-0.5" size={16} />
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
        </div>
      </div>

      {/* Animated Social Media Links */}
      <SocialMediaLinks />

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-sm text-gray-500">
          <p>&copy; {currentYear} Maldonite. All rights reserved.</p>
          <p className="flex items-center gap-1.5">Shaping Digital Gold !</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

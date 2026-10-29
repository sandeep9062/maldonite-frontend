"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowUpRight, ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
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

const legalLinks: FooterLink[] = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
];

// Staggered reveal: each column fades/slides in slightly after the previous one
const columnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Column = ({
  index,
  className = "",
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    custom={index}
    variants={columnVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 sm:mb-5">
    <h3 className="text-sm sm:text-base font-semibold tracking-wider text-gold uppercase [letter-spacing:0.12em]">
      {children}
    </h3>
    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gold/60" aria-hidden="true" />
  </div>
);

// Link with a small gold line that grows on hover and a subtle slide
const FooterNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-0 text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 focus-visible:outline-none focus-visible:text-gold"
  >
    <span
      className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-3 group-hover:mr-2"
      aria-hidden="true"
    />
    {children}
  </Link>
);

const IconBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold transition-colors duration-200 group-hover:bg-gold/20 group-hover:border-gold/60">
    {children}
  </span>
);

const SkeletonLine = ({ width }: { width: string }) => (
  <div className={`h-3 ${width} animate-pulse rounded bg-white/10`} />
);

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const { data: siteSettings, isLoading, isError } = useGetSiteSettingsQuery();
  const { data: services = [] } = useGetServicesQuery();
  const featuredServices = services.slice(0, 6);

  // 🖼️ Hybrid: CMS logo first, local public asset as safety net
  const logoUrl = siteSettings?.logoUrl;
  const [logoFailed, setLogoFailed] = useState(false);
  useEffect(() => setLogoFailed(false), [logoUrl]);
  const logoSrc = !logoUrl || logoFailed ? "/ignot-logo.png" : logoUrl;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Gold gradient accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Soft decorative glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-10 sm:gap-12 lg:gap-10">
        {/* Logo & Tagline */}
        <Column index={0} className="space-y-4 sm:space-y-5">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Maldonite home">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={logoSrc}
                alt="Maldonite"
                fill
                sizes="44px"
                className="object-contain"
                priority
                onError={() => setLogoFailed(true)}
              />
            </div>
            <span className="text-xl sm:text-2xl font-semibold">
              Maldon<span className="text-gold">i</span>te
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
            Shaping Digital Gold. We craft scalable web experiences with
            elegance and precision.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs sm:text-sm text-gold transition-all duration-200 hover:bg-gold hover:text-navy hover:border-gold"
          >
            Start a project
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Column>

        {/* Quick Links */}
        <Column index={1}>
          <ColumnTitle>Quick Links</ColumnTitle>
          <nav aria-label="Quick links">
            <ul className="text-xs sm:text-sm space-y-2.5 sm:space-y-3">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <FooterNavLink href={href}>{name}</FooterNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </Column>

        {/* Services */}
        <Column index={2}>
          <ColumnTitle>Services</ColumnTitle>
          <ul className="text-xs sm:text-sm space-y-2.5 sm:space-y-3">
            {featuredServices.length > 0 ? (
              featuredServices.map((service) => (
                <li key={service.slug || service._id}>
                  <FooterNavLink href={`/service/${service.slug}`}>
                    {service.title}
                  </FooterNavLink>
                </li>
              ))
            ) : (
              <>
                <li><SkeletonLine width="w-32" /></li>
                <li><SkeletonLine width="w-40" /></li>
                <li><SkeletonLine width="w-28" /></li>
                <li><SkeletonLine width="w-36" /></li>
              </>
            )}
          </ul>
          <Link
            href="/services"
            className="group mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm text-gold hover:text-white transition-colors duration-200"
          >
            View all services
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Column>

        {/* Contact Info */}
        <Column index={3}>
          <ColumnTitle>Contact Us</ColumnTitle>
          <ul className="text-xs sm:text-sm space-y-4 text-gray-300">
            {isLoading && (
              <>
                <li><SkeletonLine width="w-48" /></li>
                <li><SkeletonLine width="w-36" /></li>
                <li><SkeletonLine width="w-44" /></li>
              </>
            )}
            {isError && (
              <li className="text-xs sm:text-sm text-gray-400">
                Error fetching contact info.
              </li>
            )}
            {siteSettings && (
              <>
                <li className="group flex items-start gap-3">
                  <IconBadge>
                    <MapPin size={16} />
                  </IconBadge>
                  {siteSettings.googleMapUrl ? (
                    <a
                      href={siteSettings.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-1.5 leading-relaxed hover:text-gold transition-colors duration-200"
                    >
                      {siteSettings.mainOffice}
                    </a>
                  ) : (
                    <span className="pt-1.5 leading-relaxed">{siteSettings.mainOffice}</span>
                  )}
                </li>

                {(siteSettings.contactNo1 || siteSettings.contactNo2) && (
                  <li className="group flex items-start gap-3">
                    <IconBadge>
                      <Phone size={16} />
                    </IconBadge>
                    <span className="flex flex-col gap-1 pt-1.5">
                      {siteSettings.contactNo1 && (
                        <a
                          href={`tel:+91${siteSettings.contactNo1}`}
                          className="hover:text-gold transition-colors duration-200"
                        >
                          +91 {siteSettings.contactNo1}
                        </a>
                      )}
                      {siteSettings.contactNo2 && (
                        <a
                          href={`tel:+91${siteSettings.contactNo2}`}
                          className="hover:text-gold transition-colors duration-200"
                        >
                          +91 {siteSettings.contactNo2}
                        </a>
                      )}
                    </span>
                  </li>
                )}

                {siteSettings.email && (
                  <li className="group flex items-start gap-3">
                    <IconBadge>
                      <Mail size={16} />
                    </IconBadge>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="pt-1.5 break-all hover:text-gold transition-colors duration-200"
                    >
                      {siteSettings.email}
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
        </Column>
      </div>

      {/* Animated Social Media Links */}
      <div className="relative">
        <SocialMediaLinks />
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-sm text-gray-500">
          <p>&copy; {currentYear} Maldonite. All rights reserved.</p>

          <nav aria-label="Legal" className="flex items-center gap-4 sm:gap-6">
            {legalLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="hover:text-gold transition-colors duration-200"
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-gray-400">Shaping Digital Gold !</p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-200 hover:bg-gold hover:text-navy hover:-translate-y-0.5"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
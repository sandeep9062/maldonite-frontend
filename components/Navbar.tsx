"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import ToggleButton from "./ToggleButton";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from "react-icons/fa";

import {
  SiteSettings,
  useGetSiteSettingsQuery,
} from "@/services/siteSettingsApi";
import { useGetServicesQuery } from "@/services/servicesApi";
import SocialMediaLinks from "@/app/contact/SocialLinks/SocialMediaLinks";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "AboutUs", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },

  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: siteSettings } = useGetSiteSettingsQuery();
  const { data: services = [] } = useGetServicesQuery();

  // Helper function to get icon component dynamically
  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName || typeof iconName !== "string") return null;

    // Try to get the icon from react-icons/fa
    const IconComponent = (Icon as any)[iconName];
    return IconComponent || null;
  };

  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close drawer on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setServicesDropdownOpen(!servicesDropdownOpen);
    } else if (e.key === "Escape") {
      setServicesDropdownOpen(false);
    }
  };

  return (
    <header className="bg-[#0D1321] text-white shadow-md w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[6px]">
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite"
              width={42}
              height={42}
              className="object-contain"
            />
          )}
          <div>
            <h1 className="text-xl font-semibold mt-2 leading-none">
              Maldon<span className="text-gold">i</span>te
            </h1>
            <p className="text-[9px] text-silver sm:block">
              Shaping Digital Gold
            </p>
          </div>
        </Link>

        {/* Desktop Nav + Dark Mode Toggle + Quote Button */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Center: Menu Links */}
          <nav className="flex-1 flex justify-center items-center gap-8">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`text-sm transition px-2 py-1 rounded flex items-center gap-1 ${
                        pathname === link.href ||
                        pathname.startsWith("/service/")
                          ? "text-[#D4AF37] font-semibold"
                          : "text-white hover:text-[#D4AF37]"
                      }`}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-label={`Services menu, ${servicesDropdownOpen ? "expanded" : "collapsed"}`}
                      onKeyDown={handleKeyDown}
                    >
                      {link.name}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesDropdownOpen && services.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 w-80 bg-[#0D1321] border border-gray-700/50 rounded-xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          role="menu"
                          aria-label="Services submenu"
                        >
                          {/* Header */}
                          <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
                            <Link
                              href="/services"
                              className="flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors font-semibold group"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                              All Services
                              <span className="ml-auto text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                                →
                              </span>
                            </Link>
                          </div>

                          {/* Services List */}
                          <div className="max-h-96 overflow-y-auto">
                            {services.slice(0, 8).map((service, index) => (
                              <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                              >
                                <Link
                                  href={`/service/${service.slug}`}
                                  className="flex items-start gap-3 px-4 py-3 text-sm text-white hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 group border-b border-gray-800/30 last:border-b-0"
                                  onClick={() => setServicesDropdownOpen(false)}
                                >
                                  {/* Icon */}
                                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-[#D4AF37]/30 transition-colors">
                                    {(() => {
                                      const IconComponent = getIconComponent(
                                        service.icon,
                                      );
                                      return IconComponent ? (
                                        <IconComponent
                                          size={16}
                                          className="text-[#D4AF37] group-hover:text-white transition-colors"
                                        />
                                      ) : (
                                        <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                                      );
                                    })()}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                                      {service.title}
                                    </div>
                                    {service.desc && (
                                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2 mt-0.5">
                                        {service.desc.length > 60
                                          ? `${service.desc.substring(0, 60)}...`
                                          : service.desc}
                                      </div>
                                    )}
                                    {service.category && (
                                      <div className="text-xs text-[#D4AF37]/70 mt-1 uppercase tracking-wide">
                                        {service.category}
                                      </div>
                                    )}
                                  </div>

                                  {/* Arrow */}
                                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronDown
                                      size={14}
                                      className="rotate-[-90deg] text-[#D4AF37]"
                                    />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer */}
                          {services.length > 8 && (
                            <div className="px-4 py-3 border-t border-gray-700/50 bg-gradient-to-r from-transparent to-[#D4AF37]/5">
                              <Link
                                href="/services"
                                className="flex items-center justify-center gap-2 text-sm text-[#D4AF37] hover:text-white transition-colors font-semibold group"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <span>View All Services</span>
                                <ChevronDown
                                  size={14}
                                  className="rotate-[-90deg] group-hover:translate-x-1 transition-transform"
                                />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition ${
                    pathname === link.href
                      ? "text-[#D4AF37] font-semibold"
                      : "text-white hover:text-[#D4AF37]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Dark Mode Toggle + CTA */}
          <div className="flex items-center gap-4">
            <ToggleButton />
            <Link
              href="/quote"
              className="px-4 py-2 rounded-md bg-gold text-black text-[13px] font-semibold hover:bg-gold/80 transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ToggleButton />
          <button
            className="text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="absolute top-0 left-0 w-full bg-[#0D1321] shadow-lg z-50"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-[5px]"
              >
                {siteSettings?.logoUrl ? (
                  <Image
                    src={siteSettings.logoUrl}
                    alt="Maldonite"
                    width={35}
                    height={35}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/ignot-logo.png"
                    alt="Logo"
                    width={35}
                    height={35}
                    className="object-contain"
                  />
                )}
                <h1 className="text-lg font-semibold">
                  Maldon<span className="text-gold">i</span>te
                </h1>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-[#D4AF37]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-4 py-3">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="w-full">
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className={`flex items-center justify-center gap-2 text-[14px] transition w-full ${
                          pathname === link.href ||
                          pathname.startsWith("/service/")
                            ? "text-gold font-semibold"
                            : "text-white hover:text-[#D4AF37]"
                        }`}
                        aria-expanded={mobileServicesOpen}
                        aria-haspopup="true"
                        aria-label={`Mobile services menu, ${mobileServicesOpen ? "expanded" : "collapsed"}`}
                      >
                        {link.name}
                        {mobileServicesOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && services.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 mx-4 space-y-1 overflow-hidden bg-[#0D1321] border border-gray-700/50 rounded-xl"
                          >
                            {/* Mobile Services Header */}
                            <div className="px-4 py-2 border-b border-gray-700/50 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
                              <Link
                                href="/services"
                                className="flex items-center gap-2 text-sm text-[#D4AF37] font-semibold"
                                onClick={() => {
                                  setOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                                All Services
                              </Link>
                            </div>

                            {/* Mobile Services List */}
                            {services.slice(0, 8).map((service, index) => (
                              <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                              >
                                <Link
                                  href={`/service/${service.slug}`}
                                  className="flex items-start gap-3 px-4 py-3 text-sm text-white hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 group border-b border-gray-800/30 last:border-b-0"
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                >
                                  {/* Icon */}
                                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-[#D4AF37]/30 transition-colors">
                                    {(() => {
                                      const IconComponent = getIconComponent(
                                        service.icon,
                                      );
                                      return IconComponent ? (
                                        <IconComponent
                                          size={16}
                                          className="text-[#D4AF37] group-hover:text-white transition-colors"
                                        />
                                      ) : (
                                        <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                                      );
                                    })()}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                                      {service.title}
                                    </div>
                                    {service.desc && (
                                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2 mt-0.5">
                                        {service.desc.length > 50
                                          ? `${service.desc.substring(0, 50)}...`
                                          : service.desc}
                                      </div>
                                    )}
                                    {service.category && (
                                      <div className="text-xs text-[#D4AF37]/70 mt-1 uppercase tracking-wide">
                                        {service.category}
                                      </div>
                                    )}
                                  </div>

                                  {/* Arrow */}
                                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronDown
                                      size={14}
                                      className="rotate-[-90deg] text-[#D4AF37]"
                                    />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}

                            {/* Mobile Footer */}
                            {services.length > 8 && (
                              <div className="px-4 py-3 border-t border-gray-700/50 bg-gradient-to-r from-transparent to-[#D4AF37]/5">
                                <Link
                                  href="/services"
                                  className="flex items-center justify-center gap-2 text-sm text-[#D4AF37] hover:text-white transition-colors font-semibold group"
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                >
                                  <span>View All Services</span>
                                  <ChevronDown
                                    size={14}
                                    className="rotate-[-90deg] group-hover:translate-x-1 transition-transform"
                                  />
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[14px] transition ${
                      pathname === link.href
                        ? "text-gold font-semibold"
                        : "text-white hover:text-[#D4AF37]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="px-4 py-3 justify-center items-center">
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 rounded bg-gold text-black font-semibold hover:bg-gold/80 transition-colors"
              >
                Get Quote
              </Link>
            </div>

            {/* Social Media Links */}
            <SocialMediaLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

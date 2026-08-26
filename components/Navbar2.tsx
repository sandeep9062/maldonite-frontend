"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import ToggleButton from "./ToggleButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaPaintBrush,
  FaRobot,
  FaChartLine,
  FaShoppingCart,
  FaMobileAlt,
  FaCloud,
  FaCogs,
} from "react-icons/fa";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  FaCode,
  FaPaintBrush,
  FaRobot,
  FaChartLine,
  FaShoppingCart,
  FaMobileAlt,
  FaCloud,
  FaCogs,
};

import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";
import { useGetServicesQuery } from "@/services/servicesApi";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: siteSettings } = useGetSiteSettingsQuery();
  const { data: services = [] } = useGetServicesQuery();

  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName || typeof iconName !== "string") return null;
    const IconComponent = iconMap[iconName];
    return IconComponent || null;
  };

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setServicesDropdownOpen(!servicesDropdownOpen);
    } else if (e.key === "Escape") {
      setServicesDropdownOpen(false);
    }
  };

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/service/");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-navy dark:text-white ${
        scrolled
          ? "bg-white/90 dark:bg-navy/90 shadow-[0_1px_0_0_rgba(15,23,42,0.06)] backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10"
          : "bg-transparent shadow-none border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-[6px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite"
              width={36}
              height={36}
              className="object-contain sm:w-[42px] sm:h-[42px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg]"
            />
          )}
          <div>
            <h1 className="text-base sm:text-xl font-semibold mt-1 sm:mt-2 leading-none tracking-tight">
              Maldon
              <span className="text-gold transition-colors">i</span>te
            </h1>
            <p className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-gray-500 dark:text-silver">
              Shaping Digital Gold
            </p>
          </div>
        </Link>

        {/* Desktop Nav + Dark Mode Toggle + Quote Button */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive =
                link.name === "Services" ? isServicesActive : pathname === link.href;

              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`group relative flex items-center gap-1 py-1 text-xs font-medium tracking-wider uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                        isActive
                          ? "text-gold font-semibold"
                          : "text-navy dark:text-white hover:text-gold"
                      }`}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-label={`Services menu, ${servicesDropdownOpen ? "expanded" : "collapsed"}`}
                      onKeyDown={handleKeyDown}
                    >
                      {link.name}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {servicesDropdownOpen && services.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-navy/98 border border-gold/20 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl z-50 overflow-hidden"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          role="menu"
                          aria-label="Services submenu"
                        >
                          {/* Arrow caret */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-navy border-l border-t border-gold/20" />

                          {/* Header */}
                          <div className="relative px-4 py-3.5 border-b border-white/5">
                            <Link
                              href="/services"
                              className="flex items-center gap-2 text-sm text-gold hover:text-gold transition-colors font-semibold group/all focus-visible:outline-none"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                              All Services
                              <ArrowUpRight
                                size={13}
                                className="ml-auto opacity-60 group-hover/all:opacity-100 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-all"
                              />
                            </Link>
                          </div>

                          {/* Services List */}
                          <div className="max-h-96 overflow-y-auto py-1">
                            {services.slice(0, 8).map((service, index) => (
                              <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.04 }}
                              >
                                <Link
                                  href={`/service/${service.slug}`}
                                  className="flex items-start gap-3 px-4 py-2.5 text-sm text-white/90 hover:bg-white/[0.04] hover:text-gold transition-colors duration-150 group/item focus-visible:outline-none focus-visible:bg-white/[0.06]"
                                  onClick={() => setServicesDropdownOpen(false)}
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-gold/10 border border-gold/15 rounded-lg flex items-center justify-center mt-0.5 group-hover/item:bg-gold/20 group-hover/item:border-gold/30 transition-colors">
                                    {(() => {
                                      const IconComponent = getIconComponent(service.icon);
                                      return IconComponent ? (
                                        <IconComponent
                                          size={15}
                                          className="text-gold"
                                        />
                                      ) : (
                                        <div className="w-2 h-2 bg-gold rounded-full" />
                                      );
                                    })()}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-white/95 group-hover/item:text-gold transition-colors line-clamp-1">
                                      {service.title}
                                    </div>
                                    {service.desc && (
                                      <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                        {service.desc.length > 60
                                          ? `${service.desc.substring(0, 60)}...`
                                          : service.desc}
                                      </div>
                                    )}
                                  </div>

                                  <ArrowUpRight
                                    size={13}
                                    className="flex-shrink-0 mt-0.5 opacity-0 -translate-x-1 group-hover/item:opacity-70 group-hover/item:translate-x-0 transition-all text-gold"
                                  />
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {services.length > 8 && (
                            <div className="px-4 py-3 border-t border-white/5">
                              <Link
                                href="/services"
                                className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-gold/90 hover:text-gold transition-colors font-semibold"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                View all services
                                <ChevronDown size={12} className="rotate-[-90deg]" />
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
                  className={`group relative py-1 text-xs font-medium tracking-wider uppercase transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-gold font-semibold"
                      : "text-navy dark:text-white hover:text-gold"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ToggleButton />
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black shadow-[0_4px_20px_-4px_rgba(212,175,55,0.55)] transition-all duration-300 hover:shadow-[0_6px_28px_-4px_rgba(212,175,55,0.75)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <span className="relative z-10">Get Quote</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ToggleButton />
          <button
            className="text-navy dark:text-white p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-full bg-navy shadow-2xl z-50 max-h-screen overflow-y-auto rounded-b-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-[5px]"
                >
                  {siteSettings?.logoUrl ? (
                    <Image
                      src={siteSettings.logoUrl}
                      alt="Maldonite"
                      width={32}
                      height={32}
                      className="object-contain sm:w-[35px] sm:h-[35px]"
                    />
                  ) : (
                    <Image
                      src="/ignot-logo.png"
                      alt="Logo"
                      width={32}
                      height={32}
                      className="object-contain sm:w-[35px] sm:h-[35px]"
                    />
                  )}
                  <h1 className="text-base sm:text-lg font-semibold text-white">
                    Maldon<span className="text-gold">i</span>te
                  </h1>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-gold p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 py-3 px-3">
                {navLinks.map((link) => {
                  const isActive =
                    link.name === "Services" ? isServicesActive : pathname === link.href;

                  if (link.name === "Services") {
                    return (
                      <div key={link.name} className="w-full">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={`flex items-center justify-between gap-2 w-full px-3 py-3 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                            isActive
                              ? "text-gold font-semibold bg-white/[0.03]"
                              : "text-white hover:bg-white/[0.03] hover:text-gold"
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
                              transition={{ duration: 0.25 }}
                              className="mt-1.5 mb-2 mx-1 space-y-0.5 overflow-hidden bg-white/[0.02] border border-white/5 rounded-xl"
                            >
                              <div className="px-4 py-2.5 border-b border-white/5">
                                <Link
                                  href="/services"
                                  className="flex items-center gap-2 text-sm text-gold font-semibold"
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                >
                                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                  All Services
                                </Link>
                              </div>

                              {services.slice(0, 8).map((service, index) => (
                                <motion.div
                                  key={service.slug}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -12 }}
                                  transition={{ duration: 0.2, delay: index * 0.03 }}
                                >
                                  <Link
                                    href={`/service/${service.slug}`}
                                    className="flex items-start gap-3 px-4 py-2.5 text-sm text-white/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                                    onClick={() => {
                                      setOpen(false);
                                      setMobileServicesOpen(false);
                                    }}
                                  >
                                    <div className="flex-shrink-0 w-7 h-7 bg-gold/10 border border-gold/15 rounded-lg flex items-center justify-center mt-0.5">
                                      {(() => {
                                        const IconComponent = getIconComponent(service.icon);
                                        return IconComponent ? (
                                          <IconComponent size={14} className="text-gold" />
                                        ) : (
                                          <div className="w-2 h-2 bg-gold rounded-full" />
                                        );
                                      })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium line-clamp-1">
                                        {service.title}
                                      </div>
                                      {service.desc && (
                                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                          {service.desc.length > 50
                                            ? `${service.desc.substring(0, 50)}...`
                                            : service.desc}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}

                              {services.length > 8 && (
                                <div className="px-4 py-2.5 border-t border-white/5">
                                  <Link
                                    href="/services"
                                    className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-gold/90 font-semibold"
                                    onClick={() => {
                                      setOpen(false);
                                      setMobileServicesOpen(false);
                                    }}
                                  >
                                    View all services
                                    <ChevronDown size={12} className="rotate-[-90deg]" />
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
                      className={`px-3 py-3 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                        isActive
                          ? "text-gold font-semibold bg-white/[0.03]"
                          : "text-white hover:bg-white/[0.03] hover:text-gold"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA Button */}
              <div className="px-4 pb-5 pt-1">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-3 rounded-md bg-gold text-black text-xs font-semibold uppercase tracking-wider shadow-[0_4px_20px_-4px_rgba(212,175,55,0.5)] active:scale-[0.98] transition-transform"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

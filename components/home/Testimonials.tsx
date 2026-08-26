"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { UserCheck2, Quote } from "lucide-react";
import { useGetTestimonialsQuery } from "@/services/testimonialsApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => (
        <FaStar key={`f${i}`} className="w-3 h-3 text-gold" />
      ))}
      {half && <FaStarHalfAlt key="h" className="w-3 h-3 text-gold" />}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
        <FaRegStar
          key={`e${i}`}
          className="w-3 h-3 text-slate-300 dark:text-slate-700"
        />
      ))}
    </div>
  );
};

interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  designation?: string;
  message: string;
  image?: string;
  rating: number;
  icon?: string;
  location?: string;
  date: Date;
  createdAt?: string;
  updatedAt?: string;
}

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="group flex flex-col bg-white dark:bg-darkbg2 rounded-2xl border border-slate-100 dark:border-white/[0.06] hover:border-gold/35 dark:hover:border-gold/20 hover:shadow-[0_16px_48px_-8px_rgba(212,175,55,0.11)] p-6 sm:p-7 text-left h-full transition-all duration-300 relative overflow-hidden">
    {/* Decorative quote mark */}
    <Quote
      className="absolute top-5 right-5 w-8 h-8 text-slate-50 dark:text-white/[0.025] rotate-180 pointer-events-none select-none"
      aria-hidden
    />

    {/* Gold top accent */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />

    {/* Stars */}
    <div className="mb-4">{renderStars(t.rating)}</div>

    {/* Message */}
    <p className="text-[13.5px] text-slate-600 dark:text-slate-400 leading-[1.75] flex-1 mb-6 line-clamp-4">
      "{t.message}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06] group-hover:border-gold/12 transition-colors duration-200">
      {t.image ? (
        <Image
          src={t.image}
          alt={t.name}
          width={40}
          height={40}
          className="rounded-full object-cover w-9 h-9 ring-2 ring-gold/20 flex-shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-[11px] font-bold text-black flex-shrink-0 ring-2 ring-gold/20">
          {t.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">
            {t.name}
          </span>
          <UserCheck2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
        </div>
        {(t.designation || t.company) && (
          <p className="text-[11px] text-slate-400 dark:text-slate-600 truncate">
            {t.designation}
            {t.designation && t.company && " · "}
            {t.company}
          </p>
        )}
      </div>
    </div>
  </div>
);

const logos = [
  { src: "/logos/company-logo-1.png", alt: "Client 1" },
  { src: "/logos/company-logo-2.png", alt: "Client 2" },
  { src: "/logos/company-logo-3.png", alt: "Client 3" },
  { src: "/logos/company-logo-4.png", alt: "Client 4" },
  { src: "/logos/company-logo-5.png", alt: "Client 5" },
  { src: "/logos/company-logo-6.png", alt: "Client 6" },
  { src: "/logos/company-logo-7.png", alt: "Client 7" },
  { src: "/logos/company-logo-8.png", alt: "Client 8" },
  { src: "/logos/company-logo-9.png", alt: "Client 9" },
  { src: "/logos/company-logo-10.png", alt: "Client 10" },
  { src: "/logos/company-logo-11.png", alt: "Client 11" },
];

const Testimonials = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const testimonials: Testimonial[] = data?.testimonials || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pairs: Testimonial[][] = [];
  if (!isMobile) {
    for (let i = 0; i < testimonials.length; i += 2) {
      pairs.push(testimonials.slice(i, i + 2));
    }
  }

  return (
    <section className="py-16 sm:py-28 bg-white dark:bg-darkbg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gold mb-3">
              Client Stories
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Trusted by builders
              <br className="hidden sm:block" /> worldwide.
            </h2>
          </div>
          {testimonials.length > 0 && (
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-darkbg2 bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-[9px] font-bold text-black flex-shrink-0"
                    style={{ zIndex: 4 - i }}
                  >
                    {t.name.charAt(0)}
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-500">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {testimonials.length}+
                </span>{" "}
                reviews
              </p>
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 gap-5">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-100 dark:bg-white/[0.04] animate-pulse h-52"
              />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <p className="text-center text-sm text-slate-400 py-16">
            Could not load testimonials. Please try again later.
          </p>
        )}

        {/* ── Swiper ── */}
        {!isLoading && !isError && testimonials.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-10 [&_.swiper-pagination-bullet]:bg-slate-300 [&_.swiper-pagination-bullet-active]:bg-gold [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet]:transition-all"
            slidesPerView={1}
          >
            {isMobile
              ? testimonials.map((t: Testimonial) => (
                  <SwiperSlide key={t._id}>
                    <div className="max-w-xl mx-auto px-1">
                      <TestimonialCard t={t} />
                    </div>
                  </SwiperSlide>
                ))
              : pairs.map((pair, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid grid-cols-2 gap-5 px-1">
                      {pair.map((t: Testimonial) => (
                        <TestimonialCard key={t._id} t={t} />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        )}

        {!isLoading && !isError && testimonials.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-16">
            No testimonials to display yet.
          </p>
        )}

        {/* ── Logo strip ── */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-slate-100 dark:border-white/[0.05]">
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 dark:text-slate-600 text-center mb-7">
            Trusted by leading companies
          </p>
          <div className="flex justify-center items-center gap-6 sm:gap-10 flex-wrap">
            {logos.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={32}
                className="h-6 sm:h-8 w-auto object-contain opacity-40 hover:opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

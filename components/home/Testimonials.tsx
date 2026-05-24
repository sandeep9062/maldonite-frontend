"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { UserCheck2 } from "lucide-react";
import { useGetTestimonialsQuery } from "@/services/testimonialsApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-yellow-400 w-5 h-5" />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-yellow-400 w-5 h-5" />,
    );
  }

  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-gray-300 w-5 h-5" />,
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

// Interface for a single Testimonial object
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
  <div className="bg-white dark:bg-[#1a1a1a] p-4 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg text-left h-full">
    {/* User Info */}
    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
      {t.image ? (
        <Image
          src={t.image}
          alt={t.name}
          width={48}
          height={48}
          className="rounded-full object-cover h-10 w-10 sm:h-12 sm:w-12"
        />
      ) : (
        <div className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
          {t.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="text-left">
        <div className="flex items-center gap-1">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {t.name}
          </h4>
          <UserCheck2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4AF37]" />
        </div>
        {t.designation && (
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            {t.designation}
          </p>
        )}
      </div>
    </div>

    {/* Stars */}
    <div className="flex justify-start mb-3 sm:mb-4">
      {renderStars(t.rating)}
    </div>

    {/* Testimonial Message */}
    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left leading-relaxed">
      {t.message}
    </p>
  </div>
);

const Testimonials = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const testimonials = data?.testimonials || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isLoading) {
    return (
      <section className="py-10 sm:py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 sm:py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-red-500 dark:text-red-400 text-sm sm:text-base">
          Failed to load testimonials. Please try again later.
        </div>
      </section>
    );
  }

  // Group testimonials into pairs for desktop (2 per slide)
  const pairs: Testimonial[][] = [];
  if (!isMobile) {
    for (let i = 0; i < testimonials.length; i += 2) {
      pairs.push(testimonials.slice(i, i + 2));
    }
  }

  return (
    <section className="bg-white dark:bg-darkbg1 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white px-2">
          What Clients Say
        </h2>

        {testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="mt-8 sm:mt-12 pb-10"
            slidesPerView={1}
          >
            {isMobile
              ? // Mobile: 1 card per slide
                testimonials.map((t: Testimonial) => (
                  <SwiperSlide key={t._id}>
                    <div className="max-w-xl mx-auto">
                      <TestimonialCard t={t} />
                    </div>
                  </SwiperSlide>
                ))
              : // Desktop: 2 cards per slide
                pairs.map((pair, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid grid-cols-2 gap-6">
                      {pair.map((t: Testimonial) => (
                        <TestimonialCard key={t._id} t={t} />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        ) : (
          <div className="mt-8 sm:mt-12 text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            No testimonials to display yet.
          </div>
        )}

        {/* Client Logos */}
        <div className="mt-10 sm:mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm">
            Trusted by leading companies
          </p>
          <div className="flex justify-center items-center gap-3 sm:gap-8 flex-wrap opacity-80">
            {[
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
            ].map((logo, i) => (
              <Image
                key={i}
                width={80}
                height={80}
                src={logo.src}
                alt={logo.alt}
                className="sm:w-[120px] sm:h-[120px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

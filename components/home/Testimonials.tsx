"use client";

import { motion } from "framer-motion";
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
      <FaStar key={`full-${i}`} className="text-yellow-400 w-5 h-5" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-yellow-400 w-5 h-5" />
    );
  }

  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
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

const Testimonials = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const testimonials = data?.testimonials || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-red-500 dark:text-red-400">
          Failed to load testimonials. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-darkbg1 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white"
        >
          What Clients Say
        </motion.h2>

        {testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="mt-12"
          >
            {testimonials.map((t: Testimonial) => (
              <SwiperSlide key={t._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-xl mx-auto"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover h-12 w-12"
                      />
                    ) : (
                      <div className="rounded-full h-12 w-12 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {t.name}
                        </h4>
                        <UserCheck2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      {t.designation && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-start mb-4">
                    {renderStars(t.rating)}
                  </div>

                  {/* Testimonial Message */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-left leading-relaxed">
                    {t.message}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
            No testimonials to display yet.
          </div>
        )}

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className= "text-gray-600 dark:text-gray-400 mb-6 text-sm">
            Trusted by leading companies
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-80">
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
                width={120}
                height={120}
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

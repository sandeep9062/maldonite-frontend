"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import Image from "next/image";
import { useGetClientsQuery } from "@/services/clientApi";

const OurClients = () => {
  const { data: clients, isLoading, isError } = useGetClientsQuery();

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-darkbg1">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0D1321] dark:text-white mb-4">
            Trusted by Global <span className="text-gold">Clients</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            We@aga;ve had the privilege of working with forward-thinking
            companies.
          </p>
          <div className="flex justify-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-28 h-28 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !clients || !clients.data || clients.data.length === 0) {
    return null; // or show a fallback message
  }

  return (
    <section className="py-20 bg-white dark:bg-darkbg1">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#0D1321] dark:text-white mb-4">
          Trusted by Global <span className="text-gold">Clients</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          We have had the privilege of working with many forward-thinking
          companies.
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={2500}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {clients?.data.map((client, i) => (
            <SwiperSlide key={client._id ?? i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-4 rounded bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow hover:shadow-md hover:border-[#d4af37] transition-all duration-300"
              >
                {client.icon && (
                  <Image
                    src={client.icon}
                    alt={client.name}
                    width={60}
                    height={60}
                    className="object-contain w-24 h-24"
                  />
                )}
                <span className="mt-2 text-sm text-gray-800 dark:text-gray-300">
                  {client.name}
                </span>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurClients;

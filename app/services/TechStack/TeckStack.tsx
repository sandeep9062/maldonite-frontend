"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiNodedotjs,
  SiTypescript,
  SiFigma,
  SiVercel,
  SiExpress,
  SiJavascript,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiMysql,
  SiAmazon,
  SiFirebase,
  SiJest,
  SiCypress,
  SiDocker,
  SiGit,
  SiGithub,
  SiGraphql,
  SiSass,
  SiBootstrap,
  SiSocketdotio,
  SiPrisma,
  SiStripe,
  SiCloudflare,
} from "react-icons/si";

const stack = [
  { name: "Next.js", icon: <SiNextdotjs size={32} className="text-black dark:text-white" /> },
  { name: "React.js", icon: <SiReact size={32} className="text-sky-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={32} className="text-cyan-500" /> },
  { name: "TypeScript", icon: <SiTypescript size={32} className="text-blue-600" /> },
  { name: "JavaScript", icon: <SiJavascript size={32} className="text-yellow-400" /> },
  { name: "Redux", icon: <SiRedux size={32} className="text-purple-600" /> },
  { name: "Node.js", icon: <SiNodedotjs size={32} className="text-green-700" /> },
  { name: "Express.js", icon: <SiExpress size={32} className="text-gray-800 dark:text-white" /> },
  { name: "MongoDB", icon: <SiMongodb size={32} className="text-green-600" /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={32} className="text-blue-700" /> },
  { name: "MySQL", icon: <SiMysql size={32} className="text-blue-500" /> },
  { name: "Prisma ORM", icon: <SiPrisma size={32} className="text-indigo-600" /> },
  { name: "GraphQL", icon: <SiGraphql size={32} className="text-pink-500" /> },
  { name: "Socket.io", icon: <SiSocketdotio size={32} className="text-gray-600 dark:text-white" /> },
  { name: "Stripe", icon: <SiStripe size={32} className="text-indigo-500" /> },
  { name: "Firebase", icon: <SiFirebase size={32} className="text-orange-500" /> },
  { name: "Amazon AWS", icon: <SiAmazon size={32} className="text-yellow-500" /> },
  { name: "Cloudflare", icon: <SiCloudflare size={32} className="text-orange-400" /> },
  { name: "Docker", icon: <SiDocker size={32} className="text-blue-500" /> },
  { name: "Git", icon: <SiGit size={32} className="text-red-500" /> },
  { name: "GitHub", icon: <SiGithub size={32} className="text-black dark:text-white" /> },
  { name: "Jest", icon: <SiJest size={32} className="text-red-600" /> },
  { name: "Cypress", icon: <SiCypress size={32} className="text-green-700" /> },
  { name: "HTML5", icon: <SiHtml5 size={32} className="text-orange-500" /> },
  { name: "CSS3", icon: <SiCss3 size={32} className="text-blue-600" /> },
  { name: "SASS", icon: <SiSass size={32} className="text-pink-600" /> },
  { name: "Bootstrap", icon: <SiBootstrap size={32} className="text-purple-600" /> },
  { name: "Figma", icon: <SiFigma size={32} className="text-pink-500" /> },
  { name: "Vercel", icon: <SiVercel size={32} className="text-black dark:text-white" /> },
];


const TechStack = () => {
  return (
    <section className="py-20 bg-white dark:bg-darkbg1">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#0d1321] dark:text-white mb-4">
          Our Tech Toolbox
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          We use the most powerful and modern technologies to build scalable
          digital products.
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
          {stack.map((item, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-4 rounded bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow 
                hover:shadow-md hover:border-[#d4af37] transition-all duration-300
                
                "
              >
                {item.icon}
                <span className="mt-2 text-sm text-gray-800 dark:text-gray-300">
                  {item.name}
                </span>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TechStack;

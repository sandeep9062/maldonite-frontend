"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGetProjectsQuery } from "@/services/projectsApi";
const PortfolioPreview = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <section className="py-10 sm:py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Loading recent projects...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 sm:py-16 bg-white dark:bg-[#0D1321]">
        <div className="text-center text-red-500 dark:text-red-400 text-sm sm:text-base">
          Failed to load projects.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 bg-white dark:bg-[#0D1321]">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white px-2">
            Recent Work
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
            Crafting digital solutions with precision, performance & passion.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[...projects]
            .sort(
              (a, b) =>
                new Date(b.updatedAt || b.createdAt || "").getTime() -
                new Date(a.updatedAt || a.createdAt || "").getTime(),
            )
            .slice(0, 3)
            .map((project, i) => {
              const coverImage =
                project.image && project.image.length > 0
                  ? project.image[0]
                  : "/placeholder.png";

              return (
                <div
                  key={project._id}
                  className="group relative bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm hover:shadow-2xl hover:shadow-[#D4AF37]/10 dark:hover:shadow-[#D4AF37]/5 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-500 ease-out"
                >
                  {/* Image */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative overflow-hidden"
                  >
                    <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                      <Image
                        height={400}
                        width={600}
                        src={coverImage}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Type badge */}
                      {project.type && (
                        <span className="absolute top-3 left-3 inline-block px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/90 text-black rounded-md shadow-lg backdrop-blur-sm z-10">
                          {project.type}
                        </span>
                      )}

                      {/* View More Icon - appears on hover */}
                      <div className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out shadow-lg z-10">
                        <ArrowUpRight size={16} className="text-[#D4AF37]" />
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <Link href={`/projects/${project.slug}`}>
                    <div className="p-4 sm:p-5 relative">
                      {/* Gold Accent Line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                      <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* View Project Link */}
                      <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#D4AF37] transition-colors duration-300">
                          View Project
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 hover:shadow-lg hover:shadow-[#D4AF37]/25"
          >
            Explore More Projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;

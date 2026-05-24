"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useGetProjectsQuery } from "../../services/projectsApi";

// ✅ Define project type with image as array
interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  image: string[]; // ✅ array of images
}

// ✅ Corrected category names to match database format
const categories = [
  "All",
  "WEB",
  "SAAS",
  "DIGITAL MARKETING",
  "MOBILE",
  "AI",
  "OTHER",
];
const PROJECTS_PER_PAGE = 9;

const ProjectsPageClient = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // A helper to normalize category names for comparison
  const normalizeCat = (cat: string) => cat.replace(/\s+/g, "");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => normalizeCat(p.type) === normalizeCat(active));

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error fetching projects.
      </div>
    );
  }

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-darkbg1 py-10 sm:py-20 px-3 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-center text-navy dark:text-white mb-6 sm:mb-10"
        >
          Featured Projects
        </motion.h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-1.5 sm:gap-4 flex-wrap mb-6 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border font-medium transition duration-200 ${
                active === cat
                  ? "bg-[#D4AF37] text-black border-transparent"
                  : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#D4AF37]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {paginatedProjects.map((project, index) => {
            const coverImage =
              project.image && project.image.length > 0
                ? project.image[0]
                : "/placeholder.png"; // ✅ fallback if no image

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-[#D4AF37]/10 dark:hover:shadow-[#D4AF37]/5 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-all duration-500 ease-out"
              >
                {/* Image Container with zoom & overlay */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative overflow-hidden"
                >
                  <div className="relative h-44 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={coverImage}
                      alt={project.title || "Project image"}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-[#D4AF37]/90 text-black rounded-md shadow-lg backdrop-blur-sm">
                        {project.type}
                      </span>
                    </div>
                    {/* View More Icon - appears on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out shadow-lg">
                      <ArrowUpRight size={16} className="text-[#D4AF37]" />
                    </div>
                  </div>
                </Link>

                {/* Details */}
                <Link href={`/projects/${project.slug}`}>
                  <div className="p-4 sm:p-5 relative">
                    {/* Gold Accent Line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                    <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>

                    {/* View Project Link */}
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#D4AF37] transition-colors duration-300">
                        View Project
                        <ExternalLink
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* No Projects Found */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6 sm:mt-10">
            No projects found for &ldquo;{active}&rdquo;
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-6 sm:mt-12">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-medium border transition duration-200 ${
                  currentPage === i + 1
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#D4AF37]/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPageClient;

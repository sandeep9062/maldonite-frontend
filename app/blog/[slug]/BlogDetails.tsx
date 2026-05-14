"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  ThumbsUp,
  Clock,
  ArrowLeft,
  User,
} from "lucide-react";
import Newsletter from "../../../components/NewsLetter";

interface Comment {
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  status: "draft" | "published" | "archived";
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetails({ blog }: { blog: Blog }) {
  console.log(blog, "blogogo1111");

  const {
    title,
    author,
    authorImage,
    date,
    views,
    likes,
    readTime,
    desc,
    image,
    content,
    tags,
    comments,
    status,
    seoMetaDescription,
  } = blog;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: seoMetaDescription || desc,
    image: image || "/images/maldonite.png",
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Maldonite",
      logo: {
        "@type": "ImageObject",
        url: "/images/maldonite.png",
      },
    },
    datePublished: date,
    dateModified: blog.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="min-h-screen mt-10 bg-white dark:bg-[#0D1321] py-10 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto px-0 sm:px-2">
          {/* Back to Blog List Button */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Blog List</span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-6">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            <span className="flex items-center gap-1 font-semibold text-gray-800 dark:text-white w-full sm:w-auto mb-1 sm:mb-0">
              {authorImage && (
                <Image
                  src={authorImage}
                  alt={author}
                  width={32}
                  height={32}
                  className="rounded-full mr-1 sm:mr-2 object-cover"
                />
              )}
              <User size={14} className="sm:hidden" />
              <User size={16} className="hidden sm:block" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {author}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size={14} className="sm:hidden" />
              <CalendarDays size={16} className="hidden sm:block" />
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="sm:hidden" />
              <Clock size={16} className="hidden sm:block" />
              {readTime || 5} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} className="sm:hidden" />
              <Eye size={16} className="hidden sm:block" />
              {views || 0} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp size={14} className="sm:hidden" />
              <ThumbsUp size={16} className="hidden sm:block" />
              {likes || 0} likes
            </span>
            {status && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                  status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {status}
              </span>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] mb-6 sm:mb-10 rounded-xl overflow-hidden shadow-lg">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          )}

          {/* Short Description */}
          {desc && (
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 italic border-l-4 border-yellow-500 pl-3 sm:pl-4">
              {desc}
            </p>
          )}

          {/* Content */}
          {content && (
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
            />
          )}

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {comments?.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Comments ({comments.length})
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {comments.map(
                  (
                    c: { name: string; comment: string; createdAt: string },
                    i: number,
                  ) => (
                    <div
                      key={i}
                      className="p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    >
                      <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                        {c.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        {c.comment}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}

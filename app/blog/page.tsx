import { Metadata } from "next";
import BottomCTA from "../services/BottomCTA/BottomCTA";
import Newsletter from "@/components/NewsLetter";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog | Maldonite",
  description:
    "Deep dives on SaaS, SEO, AI, UI/UX, dev tools and startup growth.",
};

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  return data.blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <main className="bg-white dark:bg-navy text-black dark:text-white">
        {/* Hero */}
        <section className="text-center pt-28 sm:pt-36 pb-12 bg-gradient-to-br from-white to-gray-200 dark:from-navy dark:to-darkbg2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-4">
            Insights from Maldonite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Deep dives on SaaS, SEO, AI, UI/UX, dev tools and startup growth.
          </p>
        </section>

        <BlogList blogs={blogs} />
      </main>
      <Newsletter />
      <BottomCTA />
    </>
  );
}

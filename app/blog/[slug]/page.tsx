import { getBlogBySlug } from "../../../services/serverServices";
import BlogDetails from "./BlogDetails";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.seoMetaTitle || blog.title,
    description:
      blog.seoMetaDescription ||
      blog.excerpt ||
      (blog.content
        ? blog.content.substring(0, 160).replace(/<[^>]*>/g, "")
        : ""),
    openGraph: {
      title: blog.seoMetaTitle || blog.title,
      description:
        blog.seoMetaDescription ||
        blog.excerpt ||
        (blog.content
          ? blog.content.substring(0, 160).replace(/<[^>]*>/g, "")
          : ""),
      url: `https://www.maldonite.com/blog/${blog.slug}`,
      images: [
        {
          url: blog.image || "/default-image.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoMetaTitle || blog.title,
      description:
        blog.seoMetaDescription ||
        blog.excerpt ||
        (blog.content
          ? blog.content.substring(0, 160).replace(/<[^>]*>/g, "")
          : ""),
      images: [blog.image || "/default-image.jpg"],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
}

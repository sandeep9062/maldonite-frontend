import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Featured Projects | Maldonite",
  description:
    "Explore Maldonite's portfolio of featured projects. From web development and SaaS platforms to AI solutions and mobile apps, see how we build digital excellence.",
  openGraph: {
    title: "Featured Projects | Maldonite",
    description:
      "Discover Maldonite's project portfolio — web, SaaS, AI, mobile, and digital marketing solutions crafted for startups and enterprises.",
    url: "https://www.maldonite.com/projects",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite Featured Projects Portfolio",
      },
    ],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

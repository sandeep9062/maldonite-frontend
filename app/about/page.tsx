import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About | Maldonite",
  description:
    "Learn about Maldonite, a full-stack development agency specializing in MERN, Next.js, AI integration, UI/UX design, and digital marketing. Empowering businesses with modern software since our founding.",
  openGraph: {
    title: "About Maldonite | Full-Stack Development & Digital Solutions",
    description:
      "Discover how Maldonite crafts scalable software, intelligent automation, and elegant digital experiences for startups and enterprises.",
    url: "https://www.maldonite.com/about",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Maldonite - Full-Stack Development Agency",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}

import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import CTAWithForm from "@/components/CTAWithForm";
import PopupFormModal from "@/components/PopupFormModal";
import Services from "@/components/Services";
import DeveloperSection from "@/components/home/DeveloperSection";
import BubbleWrapper from "@/components/home/BubbleWrapper";
import TechStack from "@/components/home/TechStack";
import DiscountCTA from "@/components/home/DiscountCTA";

export const metadata: Metadata = {
  title: "Maldonite | Igniting Innovation with Scalable Code",
  description:
    "Maldonite is a full-stack development agency specializing in Next.js, MERN, AI integration, UI/UX design, and SaaS development. Build high-performing, modern projects with a team that treats your vision like gold.",
  openGraph: {
    title: "Maldonite | Igniting Innovation with Scalable Code",
    description:
      "Maldonite is a full-stack development agency specializing in Next.js, MERN, AI integration, UI/UX design, and SaaS development.",
    url: "https://www.maldonite.com",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maldonite - Full-Stack Development Agency",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Full background canvas — sits at top-0 behind the fixed transparent
          header so the navbar natively blends into the hero gradient. */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fdf4e3] via-white to-white dark:from-darkbg2 dark:via-navy dark:to-navy">
        {/* Soft warm radial glow behind the top header area for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100/40 via-white to-white dark:from-amber-200/10 dark:via-white/[0.03] dark:to-transparent" />
        <Hero />
      </div>

      <Services />

      {/* <BubbleWrapper /> */}

      <WhyUs />
      <Features />
      <PortfolioPreview />

      <Testimonials />

      <PopupFormModal />

      <CTAWithForm />
    </>
  );
}

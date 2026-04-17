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

export default function Home() {
  return (
    <>
      <section className="pt-16 ">
        <Hero />
        <Services />

        <BubbleWrapper />

        {/*<WhyUs />
        <Features />
        <PortfolioPreview />

        <Testimonials /> */}

        <PopupFormModal />
        <CTAWithForm />
      </section>
    </>
  );
}

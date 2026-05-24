import React from "react";
import type { Metadata } from "next";
//import ContactPage from "../components/ContactPage/page";
import ContactHeader from "./ContactHeader/ContactHeader";
import ContactInfoSection from "./ContactInfoSection/ContactInfoSection";
import SocialMediaLinks from "./SocialLinks/SocialMediaLinks";
import CTAWithForm from "@/components/CTAWithForm";

import BusinessStats from "@/components/BusinessStats";

export const metadata: Metadata = {
  title: "Contact | Maldonite",
  description:
    "Get in touch with Maldonite for full-stack development, AI integration, UI/UX design, and digital marketing services. Let's build something great together.",
  openGraph: {
    title: "Contact Maldonite | Full-Stack Development & Digital Solutions",
    description:
      "Reach out to Maldonite for scalable software development, AI solutions, and digital products. Start your project today.",
    url: "https://www.maldonite.com/contact",
    images: [
      {
        url: "https://www.maldonite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Maldonite",
      },
    ],
  },
};

const Contact = () => {
  return (
    <>
      <ContactHeader />
      <CTAWithForm />
      <BusinessStats />
      <SocialMediaLinks />
      <ContactInfoSection />
    </>
  );
};

export default Contact;

"use client";

import OurProcess from "./OurProcess/OurProcess";
import IndustriesServed from "./IndustriesServed/IndustriesServed";
import TechStack from "./TechStack/TeckStack";
import ServiceFAQ from "./FAQ/ServiceFAQ";
import BottomCTA from "./BottomCTA/BottomCTA";
import ServicesGrid from "../service/page";

export default function ServicesPage() {
  return (
    <>
      <ServicesGrid />
      <OurProcess />
      <IndustriesServed />
      <TechStack />
      <ServiceFAQ />
      <BottomCTA />
    </>
  );
}

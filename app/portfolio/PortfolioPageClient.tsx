"use client";

import Milestones from "./milestones/Milestones";
import BottomCTA from "../services/BottomCTA/BottomCTA";
import ProjectsPageClient from "../projects/ProjectsPageClient";
import ProductsPageClient from "../products/ProductsPageClient";

const PortfolioPageClient = () => {
  return (
    <>
      <Milestones />
      <ProjectsPageClient />
      <ProductsPageClient />
      <BottomCTA />
    </>
  );
};

export default PortfolioPageClient;

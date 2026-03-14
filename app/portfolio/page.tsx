"use client";

import Milestones from "./milestones/Milestones";


import BottomCTA from "../services/BottomCTA/BottomCTA";
import PortfolioPage from "../projects/page";
import ProductsPage from "../products/page";


const page = () => {
  return (
    <>
  
      <Milestones />
      <PortfolioPage/>
      <ProductsPage/>
      <BottomCTA />
    </>
  );
};

export default page;

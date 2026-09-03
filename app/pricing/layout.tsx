import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing — Maldonite",
  description:
    "Four website packages, priced in INR with short USD equivalents. Fifty percent advance, the balance on go-live, and every deliverable committed to in writing.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

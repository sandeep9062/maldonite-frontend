"use client";
import React from "react";
import Image from "next/image";

import {
 
  useGetSiteSettingsQuery,
} from "@/services/siteSettingsApi";

const MaldoniteSpinner = () => {
  const {
    data: siteSettings
  } = useGetSiteSettingsQuery();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D1321] px-4">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Logo icon centered above */}
        <div className="sparkle-animation relative w-30 h-30 sm:w-32 sm:h-32 mb-2">
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite"
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Company name and tagline aligned like the image */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            Maldon<span className="text-[#D4AF37]">i</span>te
          </h1>
          <p className="text-sm sm:text-[18px] text-silver mt-1 tracking-wide">
            Shaping Digital Gold
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaldoniteSpinner;

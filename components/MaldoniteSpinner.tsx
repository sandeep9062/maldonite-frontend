"use client";
import React from "react";
import Image from "next/image";

import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

const MaldoniteSpinner = () => {
  const { data: siteSettings } = useGetSiteSettingsQuery();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D1321] px-3 xs:px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center text-center space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-md mx-auto">
        {/* Logo icon centered above */}
        <div className="sparkle-animation relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-28 md:w-32 md:h-32 mb-0 xs:mb-1 sm:mb-2">
          {siteSettings?.logoUrl && (
            <Image
              src={siteSettings.logoUrl}
              alt="Maldonite"
              fill
              sizes="(max-width: 320px) 64px, (max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Company name and tagline */}
        <div className="text-center w-full px-2">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            Maldon<span className="text-[#D4AF37]">i</span>te
          </h1>
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-[18px] text-silver mt-0.5 xs:mt-1 sm:mt-2 tracking-wider sm:tracking-wide leading-relaxed">
            Shaping Digital Gold
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaldoniteSpinner;

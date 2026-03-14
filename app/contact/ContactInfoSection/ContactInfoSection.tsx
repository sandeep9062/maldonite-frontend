"use client";

import { motion } from "framer-motion";

import {
  SiteSettings,
  useGetSiteSettingsQuery,
} from "@/services/siteSettingsApi";

import { useGetWebsiteImageByContextQuery } from "@/services/websiteImagesApi";

const ContactInfoSection = () => {
  // ✅ site settings query
  const { data: siteSettings } = useGetSiteSettingsQuery();
  // ✅ mission image query
  const { data: maldoniteLocationImage } =
    useGetWebsiteImageByContextQuery("maldonite-location");

  const bgImage = maldoniteLocationImage?.data?.url;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-28"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 " />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Us on the Map
        </h1>

        <p className="mb-12 max-w-2xl mx-auto text-base md:text-lg text-gray-200">
          Scan the QR code or use the interactive map below to locate our
          office.
        </p>

        <div className="items-center">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 h-[400px] w-full"
          >
            <iframe
              title="Google Map"
              src={siteSettings?.googleMapImbededUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactInfoSection;

"use client";

import { motion } from "framer-motion";
//import { useState } from "react";
//import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import CTAWithForm from "../CTAWithForm";

const ContactPage = () => {
 


  return (
    <section className="relative bg-[#F9FAFB] dark:bg-[#0D1321] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-start space-x-4">
            <Mail className="text-[#D4AF37] mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-navy dark:text-white">
                Email treek
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                support@ignotsolutions.com
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Phone className="text-[#D4AF37] mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-navy dark:text-white">
                Phone
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                +91 9876543210
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MapPin className="text-[#D4AF37] mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-navy dark:text-white">
                Location
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Delhi NCR, India
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Component */}
        <div>
          <CTAWithForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

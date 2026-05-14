"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappLink =
    "https://wa.me/919034009062?text=Hi%21%20I%27d%20like%20to%20know%20more%20about%20Maldonite%27s%20services.";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Card */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 mb-3 sm:mb-4"
            : "opacity-0 translate-y-4 pointer-events-none"
        } w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-xl shadow-xl`}
      >
        {/* Header */}
        <div className="bg-[#d4af37] text-white p-3 sm:p-4 flex items-start rounded-t-xl">
          <FaWhatsapp className="text-white text-2xl sm:text-3xl mt-1 mr-2 sm:mr-3 shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold">
              Start a Conversation
            </h2>
            <p className="text-xs sm:text-sm mt-1 leading-snug">
              Hi! Click on the <strong>WhatsApp</strong> icon below to chat with
              us.
            </p>
          </div>
        </div>

        {/* Info Text */}
        <div className="bg-gray-100 text-center text-xs sm:text-sm text-gray-600 py-1.5 sm:py-2">
          The team typically replies in a few minutes.
        </div>

        {/* WhatsApp Button */}
        <div
          onClick={() => window.open(whatsappLink, "_blank")}
          className="cursor-pointer m-2 sm:m-3 rounded-xl bg-gray-50 hover:bg-gray-100 p-2 sm:p-3 flex items-center shadow-sm transition"
        >
          <div className="bg-[#25D366]/20 p-2 sm:p-3 rounded-full shrink-0">
            <FaWhatsapp className="text-[#25D366] text-xl sm:text-2xl" />
          </div>
          <div className="ml-3 sm:ml-4 min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
              Maldonite
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Helpdesk</p>
          </div>
          <div className="ml-auto shrink-0">
            <FaWhatsapp className="text-[#25D366] text-lg sm:text-xl" />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#d4af37] hover:bg-[#c2a536] p-3 sm:p-4 rounded-full shadow-xl text-white transition duration-300"
      >
        {isOpen ? (
          <IoMdClose className="text-white text-xl sm:text-2xl" />
        ) : (
          <FaWhatsapp className="text-white text-xl sm:text-2xl" />
        )}
      </button>
    </div>
  );
}

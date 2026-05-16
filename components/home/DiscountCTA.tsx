"use client";
import React from "react";

const DiscountCTA = () => {
  return (
    <section className="bg-[#0b0b0f] py-16 px-6">
      <div className="max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-br from-[#161b22] via-[#0b0b0f] to-[#12121a] rounded-[2.5rem] border border-gray-800/50 p-8 md:p-16 shadow-2xl">
        {/* Decorative Watermark Background */}
        <div className="absolute right-[-2%] bottom-[-10%] select-none pointer-events-none">
          <span className="text-[12rem] font-black text-gray-800/10 leading-none">
            25%
          </span>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              <span className="text-blue-400 text-[10px]">⚡</span>
              <span className="text-blue-400 uppercase tracking-widest text-[10px] font-bold">
                Limited Time
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              New Client Special — <br />
              <span className="text-blue-500">25% OFF</span> All Services
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
              For new clients only, this month. Drop your details and we'll
              reach out within hours with a custom proposal and pricing.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full bg-[#1c1c26]/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <input
                type="email"
                placeholder="Work email address"
                className="w-full bg-[#1c1c26]/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <input
                type="text"
                placeholder="Phone / WhatsApp number"
                className="w-full bg-[#1c1c26]/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
              />

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-blue-500/20">
                Claim My 25% Discount
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountCTA;

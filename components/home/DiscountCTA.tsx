"use client";
import React from "react";

const DiscountCTA = () => {
  return (
    <section className="bg-darkbg2 py-16 px-6">
      <div className="max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-br from-darkbg2 via-darkbg2 to-darkbg2 rounded-[2.5rem] border border-gray-800/50 p-8 md:p-16 shadow-2xl">
        {/* Decorative Watermark Background */}
        <div className="absolute right-[-2%] bottom-[-10%] select-none pointer-events-none">
          <span className="text-[12rem] font-black text-gray-800/10 leading-none">
            25%
          </span>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
              <span className="text-gold text-[10px]">⚡</span>
              <span className="text-gold uppercase tracking-widest text-[10px] font-bold">
                Limited Time
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              New Client Special — <br />
              <span className="text-gold">25% OFF</span> All Services
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
                className="w-full bg-darkbg2/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-all"
              />
              <input
                type="email"
                placeholder="Work email address"
                className="w-full bg-darkbg2/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-all"
              />
              <input
                type="text"
                placeholder="Phone / WhatsApp number"
                className="w-full bg-darkbg2/50 border border-gray-700/50 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-all"
              />

              <button className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-gold/20">
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

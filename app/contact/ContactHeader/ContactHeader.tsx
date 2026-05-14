"use client";

const ContactHeader = () => {
  return (
    <section className="text-center mt-8 sm:mt-16 py-10 sm:py-20 px-4 bg-gradient-to-br from-white to-gray-300 dark:from-[#0D1321] dark:to-[#1a1a1a]">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
          Get in Touch
        </h1>

        <p className="text-gray-700 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-0">
          From design to deployment to AI automation — we build powerful digital
          solutions that scale with your vision. Contact us to start your
          journey.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;

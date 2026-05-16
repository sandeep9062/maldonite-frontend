"use client";
import React from "react";

const TechStack = () => {
  const technologies = [
    { name: "React", color: "bg-cyan-400" },
    { name: "Next.js", color: "bg-white" },
    { name: "Angular", color: "bg-red-500" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "Python", color: "bg-blue-400" },
    { name: "TypeScript", color: "bg-yellow-400" },
    { name: "PHP", color: "bg-indigo-400" },
    { name: "Java", color: "bg-orange-400" },
    { name: "Flutter", color: "bg-sky-400" },
    { name: "React Native", color: "bg-cyan-500" },
    { name: "Swift/iOS", color: "bg-slate-400" },
    { name: "Kotlin/Android", color: "bg-emerald-400" },
    { name: "AWS", color: "bg-amber-500" },
    { name: "Google Cloud", color: "bg-blue-500" },
    { name: "Docker", color: "bg-sky-500" },
    { name: "Kubernetes", color: "bg-blue-600" },
    { name: "GitHub Actions", color: "bg-emerald-500" },
    { name: "WordPress", color: "bg-purple-500" },
    { name: "Shopify", color: "bg-lime-500" },
    { name: "OpenAI/GPT-4", color: "bg-teal-400" },
    { name: "PostgreSQL", color: "bg-slate-400" },
    { name: "MongoDB", color: "bg-green-600" },
    { name: "Redis", color: "bg-red-600" },
  ];

  return (
    <section className="bg-[#0b0b0f] text-white py-20 px-6 md:px-16 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Accent Subheading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-6 bg-blue-500"></div>
          <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
            Technologies
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Our Tech Stack
        </h2>

        {/* Description Text */}
        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed mb-12">
          We select the right technology for each project — built for
          performance, maintainability, and scale.
        </p>

        {/* Tech Stack Badges Grid */}
        <div className="flex flex-wrap gap-3 max-w-5xl">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 bg-[#14141c] hover:bg-[#1a1a24] border border-gray-800/60 rounded-full px-4 py-2 text-xs md:text-sm text-gray-300 font-medium transition-all duration-200 cursor-pointer shadow-sm hover:border-gray-700 hover:text-white"
            >
              {/* Colored Dot Indicator */}
              <span className={`w-2 h-2 rounded-full ${tech.color} shrink-0`} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

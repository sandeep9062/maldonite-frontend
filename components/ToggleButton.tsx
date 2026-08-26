"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ToggleButton = () => {
  // Initialize statically on both server & client to avoid hydration mismatch.
  // The stored theme is read in an effect (after hydration) instead.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(
      typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prevTheme) => !prevTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <SunIcon className="text-gold w-5 h-5" />
      ) : (
        <MoonIcon className="text-gray-700 w-5 h-5" />
      )}
    </button>
  );
};

export default ToggleButton;

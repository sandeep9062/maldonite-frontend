"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ToggleButton = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme === "dark";
      }
      // Default to light mode when no theme is stored
      return false;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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

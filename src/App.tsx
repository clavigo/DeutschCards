import React, { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("deutschcards_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("deutschcards_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("deutschcards_theme", "light");
    }
  }, [isDarkMode]);

  return (
    <HomePage
      isDarkMode={isDarkMode}
      onToggleTheme={() => setIsDarkMode((prev) => !prev)}
    />
  );
}

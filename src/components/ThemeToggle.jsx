// src/components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 13.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0 1.25a5 5 0 100-10 5 5 0 000 10zM9.375 1.875a.625.625 0 111.25 0v1.25a.625.625 0 11-1.25 0v-1.25zm0 15a.625.625 0 111.25 0v1.25a.625.625 0 11-1.25 0v-1.25zm8.75-8.75a.625.625 0 110 1.25h-1.25a.625.625 0 110-1.25h1.25zm-15 0a.625.625 0 110 1.25H1.875a.625.625 0 110-1.25h1.25zm12.652-5.402a.625.625 0 010 .884l-.884.883a.625.625 0 01-.883-.883l.883-.884a.625.625 0 01.884 0zm-10.607 10.61a.625.625 0 010 .883l-.884.884a.625.625 0 01-.883-.884l.883-.883a.625.625 0 01.884 0zm10.607 1.767a.625.625 0 01-.884 0l-.883-.884a.625.625 0 01.883-.883l.884.883a.625.625 0 010 .884zm-10.607-10.61a.625.625 0 01-.884 0l-.883-.884a.625.625 0 01.883-.883l.884.883a.625.625 0 010 .884z" fill="currentColor"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.495 2.533a7.5 7.5 0 100 14.934A8.75 8.75 0 119.495 2.533z" fill="currentColor"/>
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="text-[#858BB2] hover:text-white dark:text-[#858BB2] dark:hover:text-white transition-colors duration-200 p-2"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

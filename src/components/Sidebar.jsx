// src/components/Sidebar.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  return (
    <nav
      aria-label="Site navigation"
      className="
        fixed z-40
        left-0 top-0 bottom-0 w-[103px]
        bg-[#373B53] dark:bg-[#1E2139]
        flex flex-col items-center justify-between
        rounded-r-[20px] overflow-hidden
        lg:w-[103px]
        max-md:w-full max-md:h-[72px] max-md:top-0 max-md:left-0 max-md:bottom-auto max-md:right-0
        max-md:flex-row max-md:rounded-none
      "
    >
      {/* Logo */}
      <div className="w-[103px] h-[103px] max-md:w-[72px] max-md:h-[72px] bg-[#7C5DFA] rounded-r-[20px] flex items-center justify-center relative flex-shrink-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#9277FF] rounded-tl-[20px]" />
        <svg className="relative z-10" width="40" height="38" viewBox="0 0 40 38" fill="none">
          <path d="M10 0h20L40 19 30 38H10L0 19 10 0z" fill="none"/>
          <path d="M20 7l8 12H12L20 7z" fill="white"/>
          <path d="M20 31l-8-12h16l-8 12z" fill="white" fillOpacity="0.5"/>
        </svg>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center gap-6 pb-6 max-md:flex-row max-md:pb-0 max-md:pr-6 max-md:gap-4">
        <ThemeToggle />
        <div className="w-full h-px bg-[#494E6E] max-md:w-px max-md:h-8" />
        <button
          aria-label="User profile"
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#7C5DFA] transition-colors duration-200"
        >
          <div className="w-full h-full bg-[#7C5DFA] rounded-full flex items-center justify-center text-white font-bold text-sm">
            AB
          </div>
        </button>
      </div>
    </nav>
  );
}

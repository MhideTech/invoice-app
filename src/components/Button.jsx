// src/components/Button.jsx
import React from "react";

const variants = {
  primary: "bg-[#7C5DFA] hover:bg-[#9277FF] text-white",
  secondary: "bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-[#DFE3FA] dark:hover:text-[#7E88C3]",
  danger: "bg-[#EC375A] hover:bg-[#FF9797] text-white",
  dark: "bg-[#373B53] hover:bg-[#0C0E16] dark:hover:bg-[#1E2139] text-[#888EB0] dark:text-[#DFE3FA]",
  ghost: "bg-transparent text-[#7C5DFA] hover:text-[#9277FF]",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  rounded = false,
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-bold text-[12px] leading-[15px] tracking-[-0.25px]
        px-6 py-4 transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${rounded ? "rounded-full" : "rounded-[24px]"}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

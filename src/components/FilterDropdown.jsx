// src/components/FilterDropdown.jsx
import React, { useState, useRef, useEffect } from "react";

const STATUSES = ["draft", "pending", "paid"];

export default function FilterDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (status) => {
    if (selected.includes(status)) {
      onChange(selected.filter((s) => s !== status));
    } else {
      onChange([...selected, status]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 text-[12px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.25px] hover:text-[#7C5DFA] transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="hidden md:inline">Filter by status</span>
        <span className="md:hidden">Filter</span>
        <svg className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-white dark:bg-[#252945] rounded-[8px] shadow-[0_10px_20px_rgba(72,84,159,0.25)] p-6 w-[192px] flex flex-col gap-4 z-20"
        >
          {STATUSES.map((status) => {
            const checked = selected.includes(status);
            return (
              <li key={status} role="option" aria-selected={checked}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggle(status)}
                    className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-colors duration-150 ${
                      checked ? "bg-[#7C5DFA]" : "bg-[#DFE3FA] dark:bg-[#1E2139] group-hover:border-2 group-hover:border-[#7C5DFA]"
                    }`}
                  >
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l2.667 2.667L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(status)}
                    className="sr-only"
                    aria-label={`Filter by ${status}`}
                  />
                  <span className="text-[12px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.25px] capitalize">
                    {status}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

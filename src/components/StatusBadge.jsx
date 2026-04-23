// src/components/StatusBadge.jsx
import React from "react";

const config = {
  paid: {
    text: "Paid",
    dot: "bg-[#33D69F]",
    container: "bg-[rgba(51,214,159,0.06)] text-[#33D69F]",
  },
  pending: {
    text: "Pending",
    dot: "bg-[#FF8F00]",
    container: "bg-[rgba(255,143,0,0.06)] text-[#FF8F00]",
  },
  draft: {
    text: "Draft",
    dot: "bg-[#373B53] dark:bg-[#DFE3FA]",
    container: "bg-[rgba(55,59,83,0.06)] dark:bg-[rgba(223,227,250,0.06)] text-[#373B53] dark:text-[#DFE3FA]",
  },
};

export default function StatusBadge({ status }) {
  const cfg = config[status] || config.draft;
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-[14px] rounded-[6px] font-bold text-[12px] leading-[15px] tracking-[-0.25px] min-w-[104px] justify-center ${cfg.container}`}
    >
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.text}
    </span>
  );
}

// src/components/InvoiceCard.jsx
import React from "react";
import StatusBadge from "./StatusBadge";
import { formatCurrency, formatDate } from "../utils/formatters";

export default function InvoiceCard({ invoice, onClick }) {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Invoice ${invoice.id} for ${invoice.clientName}`}
      className="
        bg-white dark:bg-[#1E2139] rounded-[8px] p-6
        border border-transparent hover:border-[#7C5DFA]
        cursor-pointer transition-all duration-200
        shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:shadow-none
        flex items-center gap-4
        group
      "
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 w-full md:hidden">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[12px] text-[#0C0E16] dark:text-white tracking-[-0.25px]">
            <span className="text-[#7E88C3]">#</span>{invoice.id}
          </span>
          <span className="text-[12px] text-[#858BB2] dark:text-[#DFE3FA]">
            {invoice.clientName}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA] mb-2">
              Due {formatDate(invoice.paymentDue)}
            </p>
            <p className="font-bold text-[16px] text-[#0C0E16] dark:text-white tracking-[-0.8px]">
              {formatCurrency(invoice.total)}
            </p>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[120px_1fr_1fr_1fr_1fr_auto] md:items-center md:w-full md:gap-4">
        <span className="font-bold text-[12px] text-[#0C0E16] dark:text-white tracking-[-0.25px]">
          <span className="text-[#7E88C3]">#</span>{invoice.id}
        </span>
        <span className="text-[12px] text-[#7E88C3] dark:text-[#DFE3FA]">
          Due {formatDate(invoice.paymentDue)}
        </span>
        <span className="text-[12px] text-[#858BB2] dark:text-[#DFE3FA]">
          {invoice.clientName}
        </span>
        <span className="font-bold text-[16px] text-[#0C0E16] dark:text-white tracking-[-0.8px] text-right">
          {formatCurrency(invoice.total)}
        </span>
        <StatusBadge status={invoice.status} />
        <svg className="text-[#7C5DFA] group-hover:translate-x-1 transition-transform duration-200" width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </article>
  );
}

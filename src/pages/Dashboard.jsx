// src/pages/Dashboard.jsx
import React, { useState, useMemo } from "react";
import InvoiceCard from "../components/InvoiceCard";
import Button from "../components/Button";
import FilterDropdown from "../components/FilterDropdown";
import InvoiceForm from "../components/InvoiceForm";
import { useInvoices } from "../context/InvoiceContext";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-20 text-center px-6">
      <svg width="242" height="200" viewBox="0 0 242 200" fill="none" className="mb-10">
        <circle cx="121" cy="100" r="80" fill="currentColor" className="text-[#F9FAFE] dark:text-[#252945]"/>
        <path d="M89 76h64v68H89V76z" fill="currentColor" className="text-[#DFE3FA] dark:text-[#1E2139]"/>
        <path d="M89 76h64l-8 12H89V76z" fill="currentColor" className="text-[#888EB0] dark:text-[#252945]"/>
        <circle cx="121" cy="134" r="18" fill="currentColor" className="text-[#EC375A]"/>
        <path d="M121 124v12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="121" cy="141" r="1.5" fill="white"/>
      </svg>
      <h2 className="text-[20px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.63px] mb-5">
        There is nothing here
      </h2>
      <p className="text-[13px] text-[#888EB0] dark:text-[#DFE3FA] leading-[22px] max-w-[220px]">
        Create an invoice by clicking the <strong>New Invoice</strong> button and get started
      </p>
    </div>
  );
}

export default function Dashboard({ onSelectInvoice }) {
  const { invoices, addInvoice } = useInvoices();
  const [filters, setFilters] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (filters.length === 0) return invoices;
    return invoices.filter((inv) => filters.includes(inv.status));
  }, [invoices, filters]);

  const handleSave = (data) => addInvoice(data, false);
  const handleSaveDraft = (data) => addInvoice(data, true);

  return (
    <>
      <main className="flex-1 px-6 pt-8 pb-12 md:px-12 lg:px-[163px] max-w-[880px] mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-14">
          <div>
            <h1 className="text-[20px] md:text-[32px] font-bold text-[#0C0E16] dark:text-white tracking-[-1px] leading-tight mb-1">
              Invoices
            </h1>
            <p className="text-[12px] text-[#888EB0] dark:text-[#DFE3FA]">
              {filtered.length === 0
                ? "No invoices"
                : `${filtered.length} invoice${filtered.length !== 1 ? "s" : ""}`}
              <span className="hidden md:inline">
                {filters.length > 0 ? ` (${filters.join(", ")})` : " total"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-5 md:gap-10">
            <FilterDropdown selected={filters} onChange={setFilters} />
            <Button
              variant="primary"
              rounded
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 md:gap-4 pl-2 pr-4 md:pr-6"
            >
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M6.313 0v4.688H11v1.624H6.313V11H4.687V6.312H0V4.688h4.688V0h1.624z" fill="#7C5DFA"/>
                </svg>
              </span>
              <span>
                <span className="hidden md:inline">New Invoice</span>
                <span className="md:hidden">New</span>
              </span>
            </Button>
          </div>
        </header>

        {/* Invoice List */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <section aria-label="Invoice list" className="flex flex-col gap-4">
            {filtered.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onClick={() => onSelectInvoice(invoice.id)}
              />
            ))}
          </section>
        )}
      </main>

      <InvoiceForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        onSaveDraft={handleSaveDraft}
      />
    </>
  );
}

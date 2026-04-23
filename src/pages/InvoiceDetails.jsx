// src/pages/InvoiceDetails.jsx
import React, { useState } from "react";
import { useInvoices } from "../context/InvoiceContext";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";
import { formatCurrency, formatDate } from "../utils/formatters";

export default function InvoiceDetails({ invoiceId, onBack }) {
  const { getInvoice, deleteInvoice, markAsPaid, updateInvoice } = useInvoices();
  const invoice = getInvoice(invoiceId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (!invoice) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[15px]">Invoice not found.</p>
        <button onClick={onBack} className="mt-4 text-[#7C5DFA] font-bold text-[12px] hover:underline">Go Back</button>
      </main>
    );
  }

  const canEdit = invoice.status !== "paid";

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    onBack();
  };

  const handleSaveEdit = (data) => {
    updateInvoice(invoice.id, data);
  };

  return (
    <>
      <main className="flex-1 px-6 pt-8 pb-12 md:px-12 lg:px-0 max-w-[780px] mx-auto w-full">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-6 text-[12px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.25px] hover:text-[#888EB0] transition-colors duration-200 mb-8 group"
        >
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go back
        </button>

        {/* Status Bar */}
        <div className="flex items-center justify-between bg-white dark:bg-[#1E2139] rounded-[8px] p-6 md:px-8 mb-6 shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:shadow-none">
          <div className="flex items-center gap-5 flex-1">
            <span className="text-[13px] text-[#858BB2] dark:text-[#DFE3FA]">Status</span>
            <StatusBadge status={invoice.status} />
          </div>
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {canEdit && (
              <Button variant="secondary" onClick={() => setShowEditForm(true)}>Edit</Button>
            )}
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
            {invoice.status === "pending" && (
              <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>Mark as Paid</Button>
            )}
          </div>
        </div>

        {/* Invoice Details Card */}
        <section
          aria-label="Invoice details"
          className="bg-white dark:bg-[#1E2139] rounded-[8px] p-6 md:p-12 shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:shadow-none"
        >
          {/* Top Info */}
          <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-8">
            <div>
              <p className="text-[16px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.8px] mb-2">
                <span className="text-[#888EB0]">#</span>{invoice.id}
              </p>
              <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">{invoice.description}</p>
            </div>
            <address className="not-italic text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] leading-[18px] md:text-right">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </address>
          </div>

          {/* Middle Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3">Invoice Date</p>
                <p className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.31px]">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3">Payment Due</p>
                <p className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.31px]">{formatDate(invoice.paymentDue)}</p>
              </div>
            </div>
            <div>
              <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3">Bill To</p>
              <p className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.31px] mb-2">{invoice.clientName}</p>
              <address className="not-italic text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] leading-[18px]">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </address>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] mb-3">Sent To</p>
              <p className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.31px]">{invoice.clientEmail}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-t-[8px] p-6 md:p-8">
            {/* Desktop header */}
            <div className="hidden md:grid md:grid-cols-[1fr_100px_100px_100px] md:gap-4 md:mb-8">
              {["Item Name", "QTY.", "Price", "Total"].map((h, i) => (
                <span key={h} className={`text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] ${i > 0 ? "text-right" : ""}`}>{h}</span>
              ))}
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              {invoice.items.map((item) => (
                <div key={item.id} className="flex items-center md:grid md:grid-cols-[1fr_100px_100px_100px] md:gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.25px]">{item.name}</p>
                    <p className="md:hidden text-[13px] font-bold text-[#7E88C3] dark:text-[#888EB0] mt-2">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                  <span className="hidden md:block text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] text-right">{item.quantity}</span>
                  <span className="hidden md:block text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] text-right">{formatCurrency(item.price)}</span>
                  <span className="font-bold text-[15px] text-[#0C0E16] dark:text-white tracking-[-0.25px] text-right">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Total */}
          <div className="bg-[#373B53] dark:bg-[#0C0E16] rounded-b-[8px] p-6 md:p-8 flex items-center justify-between">
            <span className="text-[13px] text-white">Amount Due</span>
            <span className="font-bold text-[24px] text-white tracking-[-0.5px]">{formatCurrency(invoice.total)}</span>
          </div>
        </section>
      </main>

      {/* Mobile Actions Footer */}
      <footer className="md:hidden sticky bottom-0 bg-white dark:bg-[#1E2139] px-6 py-5 flex items-center justify-end gap-2 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        {canEdit && (
          <Button variant="secondary" onClick={() => setShowEditForm(true)}>Edit</Button>
        )}
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
        {invoice.status === "pending" && (
          <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>Mark as Paid</Button>
        )}
      </footer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={`Confirm Deletion`}
        onConfirm={handleDelete}
        confirmLabel="Delete"
        isDanger
      >
        Are you sure you want to delete invoice <strong>#{invoice.id}</strong>? This action cannot be undone.
      </Modal>

      {/* Edit Form */}
      <InvoiceForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        invoice={invoice}
        onSave={handleSaveEdit}
        onSaveDraft={handleSaveEdit}
      />
    </>
  );
}

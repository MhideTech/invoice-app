// src/components/Modal.jsx
import React, { useEffect, useRef } from "react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmLabel = "Confirm", confirmVariant = "primary", isDanger = false }) {
  const overlayRef = useRef(null);
  const firstFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    firstFocusRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = overlayRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      prev?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={overlayRef}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-[#1E2139] rounded-[8px] p-8 max-w-[480px] w-full shadow-2xl">
        <h2 id="modal-title" className="text-[24px] font-bold text-[#0C0E16] dark:text-white leading-[32px] tracking-[-0.5px] mb-3">
          {title}
        </h2>
        <div className="text-[13px] text-[#888EB0] dark:text-[#DFE3FA] leading-[22px] mb-6">
          {children}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button ref={firstFocusRef} variant="secondary" onClick={onClose}>Cancel</Button>
          {onConfirm && (
            <Button variant={isDanger ? "danger" : confirmVariant} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

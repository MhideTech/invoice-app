// src/components/InvoiceForm.jsx
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { getTodayString, paymentTermsOptions } from "../utils/formatters";

const EMPTY_ITEM = { id: Date.now().toString(), name: "", quantity: 1, price: 0, total: 0 };

const emptyForm = {
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  createdAt: getTodayString(),
  paymentTerms: 30,
  description: "",
  items: [{ ...EMPTY_ITEM, id: "init" }],
};

function validate(data, isDraft) {
  const errors = {};
  if (isDraft) return errors; // No validation for drafts

  if (!data.senderAddress.street.trim()) errors["senderAddress.street"] = "Required";
  if (!data.senderAddress.city.trim()) errors["senderAddress.city"] = "Required";
  if (!data.senderAddress.postCode.trim()) errors["senderAddress.postCode"] = "Required";
  if (!data.senderAddress.country.trim()) errors["senderAddress.country"] = "Required";
  if (!data.clientName.trim()) errors["clientName"] = "Required";
  if (!data.clientEmail.trim()) {
    errors["clientEmail"] = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail)) {
    errors["clientEmail"] = "Invalid email";
  }
  if (!data.clientAddress.street.trim()) errors["clientAddress.street"] = "Required";
  if (!data.clientAddress.city.trim()) errors["clientAddress.city"] = "Required";
  if (!data.clientAddress.postCode.trim()) errors["clientAddress.postCode"] = "Required";
  if (!data.clientAddress.country.trim()) errors["clientAddress.country"] = "Required";
  if (!data.createdAt) errors["createdAt"] = "Required";

  if (data.items.length === 0) {
    errors["items"] = "Add at least one item";
  } else {
    data.items.forEach((item, i) => {
      if (!item.name.trim()) errors[`items.${i}.name`] = "Required";
      if (!item.quantity || Number(item.quantity) <= 0) errors[`items.${i}.quantity`] = "Must be > 0";
      if (item.price === "" || Number(item.price) < 0) errors[`items.${i}.price`] = "Must be ≥ 0";
    });
  }

  return errors;
}

function TextField({ label, id, error, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className={`text-[12px] font-medium tracking-[-0.25px] ${error ? "text-[#EC375A]" : "text-[#7E88C3] dark:text-[#DFE3FA]"}`}>
          {label}
        </label>
        {error && <span className="text-[10px] text-[#EC375A] font-semibold">{error}</span>}
      </div>
      <input
        id={id}
        className={`
          w-full px-5 py-4 rounded-[4px] bg-white dark:bg-[#1E2139]
          border text-[12px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white
          focus:outline-none focus:border-[#7C5DFA] transition-colors duration-200
          ${error ? "border-[#EC375A]" : "border-[#DFE3FA] dark:border-[#252945]"}
        `}
        {...props}
      />
    </div>
  );
}

function SelectField({ label, id, options, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-[10px]" ref={ref}>
      <label htmlFor={id} className="text-[12px] font-medium tracking-[-0.25px] text-[#7E88C3] dark:text-[#DFE3FA]">
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`
            w-full px-5 py-4 rounded-[4px] bg-white dark:bg-[#1E2139]
            border text-[12px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white
            flex items-center justify-between
            focus:outline-none focus:border-[#7C5DFA] transition-colors duration-200
            ${open ? "border-[#7C5DFA]" : "border-[#DFE3FA] dark:border-[#252945]"}
          `}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {selected?.label}
          <svg className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute z-20 top-full left-0 right-0 mt-2 bg-white dark:bg-[#252945] rounded-[8px] shadow-[0_10px_20px_rgba(72,84,159,0.25)] overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`
                  px-5 py-4 text-[12px] font-bold tracking-[-0.25px]
                  cursor-pointer transition-colors duration-150
                  border-b border-[#DFE3FA] dark:border-[#1E2139] last:border-0
                  ${opt.value === value
                    ? "text-[#7C5DFA]"
                    : "text-[#0C0E16] dark:text-white hover:text-[#7C5DFA]"
                  }
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function InvoiceForm({ isOpen, onClose, invoice = null, onSave, onSaveDraft }) {
  const isEdit = !!invoice;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const drawerRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (invoice) {
        setForm({
          senderAddress: { ...invoice.senderAddress },
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          clientAddress: { ...invoice.clientAddress },
          createdAt: invoice.createdAt,
          paymentTerms: invoice.paymentTerms,
          description: invoice.description || "",
          items: invoice.items.map((i) => ({ ...i })),
        });
      } else {
        setForm({ ...emptyForm, createdAt: getTodayString(), items: [{ ...EMPTY_ITEM, id: Date.now().toString() }] });
      }
      setErrors({});
      setShowAllErrors(false);
      setTimeout(() => firstFieldRef.current?.focus(), 100);
    }
  }, [isOpen, invoice]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const setField = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
    if (showAllErrors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
    }
  };

  const updateItem = (index, field, value) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [field]: value };
        updated.total = Number(updated.quantity) * Number(updated.price);
        return updated;
      });
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (isDraft = false) => {
    const errs = validate(form, isDraft);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShowAllErrors(true);
      return;
    }
    if (isDraft) {
      onSaveDraft(form);
    } else {
      onSave(form);
    }
    onClose();
  };

  const e = (key) => errors[key];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex" role="dialog" aria-modal="true" aria-label={isEdit ? "Edit Invoice" : "New Invoice"}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className="
          relative z-10 bg-white dark:bg-[#141625]
          w-full max-w-[616px] md:max-w-[719px] lg:max-w-[719px]
          h-full overflow-y-auto
          md:ml-[103px] md:rounded-r-[20px]
          flex flex-col
        "
      >
        <div className="flex-1 px-6 pt-8 pb-32 md:px-14 md:pt-14">
          <h1 className="text-[24px] font-bold text-[#0C0E16] dark:text-white tracking-[-0.5px] mb-11">
            {isEdit ? (
              <>Edit <span className="text-[#888EB0]">#</span>{invoice.id}</>
            ) : "New Invoice"}
          </h1>

          {/* Bill From */}
          <fieldset className="mb-10">
            <legend className="text-[12px] font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6">Bill From</legend>
            <div className="flex flex-col gap-6">
              <TextField
                ref={firstFieldRef}
                label="Street Address"
                id="sender-street"
                value={form.senderAddress.street}
                onChange={(e) => setField("senderAddress.street", e.target.value)}
                error={e("senderAddress.street")}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <TextField label="City" id="sender-city" value={form.senderAddress.city} onChange={(e) => setField("senderAddress.city", e.target.value)} error={e("senderAddress.city")} />
                <TextField label="Post Code" id="sender-postcode" value={form.senderAddress.postCode} onChange={(e) => setField("senderAddress.postCode", e.target.value)} error={e("senderAddress.postCode")} />
                <TextField label="Country" id="sender-country" className="col-span-2 md:col-span-1" value={form.senderAddress.country} onChange={(e) => setField("senderAddress.country", e.target.value)} error={e("senderAddress.country")} />
              </div>
            </div>
          </fieldset>

          {/* Bill To */}
          <fieldset className="mb-10">
            <legend className="text-[12px] font-bold text-[#7C5DFA] tracking-[-0.25px] mb-6">Bill To</legend>
            <div className="flex flex-col gap-6">
              <TextField label="Client's Name" id="client-name" value={form.clientName} onChange={(e) => setField("clientName", e.target.value)} error={e("clientName")} />
              <TextField label="Client's Email" id="client-email" type="email" placeholder="e.g. email@example.com" value={form.clientEmail} onChange={(e) => setField("clientEmail", e.target.value)} error={e("clientEmail")} />
              <TextField label="Street Address" id="client-street" value={form.clientAddress.street} onChange={(e) => setField("clientAddress.street", e.target.value)} error={e("clientAddress.street")} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <TextField label="City" id="client-city" value={form.clientAddress.city} onChange={(e) => setField("clientAddress.city", e.target.value)} error={e("clientAddress.city")} />
                <TextField label="Post Code" id="client-postcode" value={form.clientAddress.postCode} onChange={(e) => setField("clientAddress.postCode", e.target.value)} error={e("clientAddress.postCode")} />
                <TextField label="Country" id="client-country" className="col-span-2 md:col-span-1" value={form.clientAddress.country} onChange={(e) => setField("clientAddress.country", e.target.value)} error={e("clientAddress.country")} />
              </div>
            </div>
          </fieldset>

          {/* Dates & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TextField label="Invoice Date" id="invoice-date" type="date" value={form.createdAt} onChange={(e) => setField("createdAt", e.target.value)} error={e("createdAt")} disabled={isEdit} />
            <SelectField label="Payment Terms" id="payment-terms" options={paymentTermsOptions} value={form.paymentTerms} onChange={(val) => setField("paymentTerms", val)} />
          </div>
          <TextField label="Project Description" id="description" placeholder="e.g. Graphic Design Service" value={form.description} onChange={(e) => setField("description", e.target.value)} className="mb-10" />

          {/* Item List */}
          <div>
            <h3 className="text-[18px] font-bold text-[#777F98] tracking-[-0.38px] mb-6">Item List</h3>
            {form.items.length > 0 && (
              <div className="hidden md:grid md:grid-cols-[1fr_70px_100px_70px_20px] md:gap-4 md:mb-2">
                {["Item Name", "Qty.", "Price", "Total", ""].map((h, i) => (
                  <span key={i} className="text-[12px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] tracking-[-0.25px]">{h}</span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-10 md:gap-4">
              {form.items.map((item, index) => (
                <div key={item.id} className="md:grid md:grid-cols-[1fr_70px_100px_70px_20px] md:gap-4 md:items-end flex flex-col gap-4">
                  {/* Mobile: show label above name */}
                  <div className="md:hidden">
                    <TextField label="Item Name" id={`item-name-${index}`} value={item.name} onChange={(e) => updateItem(index, "name", e.target.value)} error={e(`items.${index}.name`)} />
                  </div>
                  {/* Desktop: just input no label */}
                  <div className="hidden md:block">
                    <input
                      className={`w-full px-5 py-4 rounded-[4px] bg-white dark:bg-[#1E2139] border text-[12px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white focus:outline-none focus:border-[#7C5DFA] transition-colors ${e(`items.${index}.name`) ? "border-[#EC375A]" : "border-[#DFE3FA] dark:border-[#252945]"}`}
                      value={item.name}
                      onChange={(e) => updateItem(index, "name", e.target.value)}
                      aria-label="Item name"
                    />
                  </div>

                  <div className="grid grid-cols-[64px_100px_1fr_20px] gap-4 md:contents">
                    {/* Qty */}
                    <div>
                      <label className="md:hidden block text-[12px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[10px] tracking-[-0.25px]">Qty.</label>
                      <input
                        type="number"
                        min="1"
                        className={`w-full px-2 py-4 text-center rounded-[4px] bg-white dark:bg-[#1E2139] border text-[12px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white focus:outline-none focus:border-[#7C5DFA] transition-colors ${e(`items.${index}.quantity`) ? "border-[#EC375A]" : "border-[#DFE3FA] dark:border-[#252945]"}`}
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        aria-label="Quantity"
                      />
                    </div>
                    {/* Price */}
                    <div>
                      <label className="md:hidden block text-[12px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[10px] tracking-[-0.25px]">Price</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={`w-full px-4 py-4 rounded-[4px] bg-white dark:bg-[#1E2139] border text-[12px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white focus:outline-none focus:border-[#7C5DFA] transition-colors ${e(`items.${index}.price`) ? "border-[#EC375A]" : "border-[#DFE3FA] dark:border-[#252945]"}`}
                        value={item.price}
                        onChange={(e) => updateItem(index, "price", e.target.value)}
                        aria-label="Price"
                      />
                    </div>
                    {/* Total */}
                    <div className="flex flex-col justify-end">
                      <label className="md:hidden block text-[12px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[10px] tracking-[-0.25px]">Total</label>
                      <span className="py-4 text-[12px] font-bold text-[#888EB0] dark:text-[#DFE3FA] tracking-[-0.25px]">
                        {(Number(item.quantity) * Number(item.price)).toFixed(2)}
                      </span>
                    </div>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      aria-label={`Remove item ${item.name || index + 1}`}
                      className="self-end pb-4 text-[#888EB0] hover:text-[#EC375A] transition-colors duration-200"
                    >
                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M11.583 3.556H8.944l-.777-1.556H4.833l-.777 1.556H1.417v1.555h.778l.777 9.334h7l.778-9.334h.777V3.556h-.944zm-7.583 9.333L3.222 5.89h6.556l-.778 7.001H4z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {errors.items && (
              <p className="text-[12px] text-[#EC375A] font-semibold mt-4">{errors.items}</p>
            )}

            <button
              type="button"
              onClick={addItem}
              className="
                mt-6 w-full py-4 rounded-[24px]
                bg-[#F9FAFE] dark:bg-[#252945]
                text-[12px] font-bold text-[#7E88C3] dark:text-[#DFE3FA]
                hover:bg-[#DFE3FA] dark:hover:bg-[#0C0E16]
                transition-colors duration-200
                flex items-center justify-center gap-2
              "
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M6.313 0v4.688H11v1.624H6.313V11H4.687V6.312H0V4.688h4.688V0h1.624z" fill="currentColor"/>
              </svg>
              Add New Item
            </button>
          </div>

          {showAllErrors && Object.keys(errors).length > 0 && (
            <div className="mt-8 p-4 rounded-[8px] bg-red-50 dark:bg-transparent border border-[#EC375A]">
              <p className="text-[12px] text-[#EC375A] font-semibold">- All fields must be added</p>
              {errors.items === "Add at least one item" && (
                <p className="text-[12px] text-[#EC375A] font-semibold">- An item must be added</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="sticky bottom-0 bg-white dark:bg-[#141625] md:bg-white md:dark:bg-[#141625] shadow-[0_-30px_60px_rgba(0,0,0,0.1)] md:rounded-r-[20px] px-6 py-6 md:px-14">
          {isEdit ? (
            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={() => handleSubmit(false)}>Save Changes</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <Button variant="dark" onClick={onClose}>Discard</Button>
              <div className="flex gap-2">
                <Button variant="dark" onClick={() => handleSubmit(true)}>Save as Draft</Button>
                <Button variant="primary" onClick={() => handleSubmit(false)}>Save & Send</Button>
              </div>
            </div>
          )}
        </footer>
      </aside>
    </div>
  );
}

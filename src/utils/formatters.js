// src/utils/formatters.js

export const formatCurrency = (amount, currency = "GBP") => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];
  const randomNumbers = String(Math.floor(Math.random() * 9000) + 1000);
  return `${randomLetters}${randomNumbers}`;
};

export const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

export const paymentTermsOptions = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" },
];

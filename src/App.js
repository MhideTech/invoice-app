// src/App.js
import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import InvoiceDetails from "./pages/InvoiceDetails";

function AppContent() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] flex flex-col md:flex-row transition-colors duration-200">
      <Sidebar />
      {/* Main content offset for sidebar */}
      <div className="flex flex-col flex-1 mt-[72px] md:mt-0 md:ml-[103px] min-h-screen">
        {selectedId ? (
          <InvoiceDetails
            invoiceId={selectedId}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <Dashboard onSelectInvoice={setSelectedId} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

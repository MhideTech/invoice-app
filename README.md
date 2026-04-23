# Invoice Management App

A full-stack invoice management application built with React.js, Tailwind CSS, and Lucide React.

## Features

- ✅ **Full CRUD** — Create, Read, Update, Delete invoices
- ✅ **Save Drafts** — Partially filled forms saved with Draft status
- ✅ **Status Logic** — Mark Pending → Paid; Paid invoices are locked
- ✅ **Dark/Light Mode** — Persisted in localStorage via Tailwind `dark:` classes
- ✅ **Filtering** — Checkbox dropdown to filter by Draft / Pending / Paid
- ✅ **Form Validation** — Email format, required fields, positive numbers, min 1 item
- ✅ **Persistence** — All data in localStorage, survives page refresh
- ✅ **Responsive** — Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- ✅ **Accessibility** — Semantic HTML, focus trapping in modals, ESC to close, ARIA labels
- ✅ **WCAG AA** — Colour contrast meets AA standard in both modes

## Tech Stack

- React 18
- Tailwind CSS (dark mode via `class` strategy)
- Lucide React (icons)
- localStorage for persistence
- No router needed — simple state-based navigation

## Project Structure

```
src/
├── components/
│   ├── Button.jsx          # Reusable button with variant system
│   ├── FilterDropdown.jsx  # Checkbox dropdown for status filtering
│   ├── InvoiceCard.jsx     # List item card for dashboard
│   ├── InvoiceForm.jsx     # Slide-over form (create + edit)
│   ├── Modal.jsx           # Confirmation modal with focus trap
│   ├── Sidebar.jsx         # Left navigation sidebar
│   ├── StatusBadge.jsx     # Coloured status chip
│   └── ThemeToggle.jsx     # Sun/Moon toggle button
├── context/
│   ├── InvoiceContext.js   # Invoice CRUD + state management
│   └── ThemeContext.js     # Dark/light mode context
├── hooks/
│   └── useLocalStorage.js  # Typed localStorage hook
├── pages/
│   ├── Dashboard.jsx       # Invoice list page
│   └── InvoiceDetails.jsx  # Single invoice detail view
├── utils/
│   └── formatters.js       # Currency, date, ID utilities
├── App.js
├── index.js
└── index.css
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Seed Data

The app ships with 6 sample invoices (2 paid, 3 pending, 1 draft) so you can explore all features immediately.

## Key Design Decisions

- **No Router** — Navigation is handled with simple React state (`selectedId`), keeping the bundle lean.
- **Context + localStorage** — `InvoiceContext` wraps `useLocalStorage` so all mutations automatically persist.
- **Validation on submit** — Errors only surface after the first submission attempt to avoid premature red states.
- **Draft bypass** — Saving as draft skips all validation, allowing partial data.
- **Paid lock** — Edit button is hidden when `status === 'paid'`; the context also guards `markAsPaid` to only work from `pending`.

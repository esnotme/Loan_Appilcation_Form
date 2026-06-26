# Loan Application Form (Frontend Simulation)

A multi‑step loan application form built with React, TypeScript, Zustand, and TailwindCSS.  
This project simulates a production‑style loan application flow with validation, conditional fields, auto‑save, document uploads, e‑signature capture, and a pre‑approval summary.

---

## 🚀 Features
- **Multi‑step wizard** (10 steps: Loan Type → Personal Info → Employment → Loan Details → Co‑Applicant → Address → Document Upload → Signature → Review → Summary)
- **Validation** for PAN, Aadhaar, email, phone, loan amount, tenure, etc.
- **Conditional rendering** (Co‑Applicant fields only if enabled)
- **Auto‑save & resume** using localStorage
- **Document upload** with file type/size validation, compression, and previews
- **E‑signature capture** via draw‑pad canvas
- **Pre‑approval summary** with Key Fact Statement
- **Accessibility** (ARIA attributes, focus management)
- **Cypress tests** covering all steps, validations, navigation, and uploads

---

## 📦 Setup

Clone the repo and install dependencies:

```bash
git clone <your-private-repo-url>
cd loan-application-form
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:5173` [(localhost in Bing)](https://www.bing.com/search?q="http%3A%2F%2Flocalhost%3A5173%2F") in your browser.

---

## 🧪 Testing

Run Cypress end‑to‑end tests:

```bash
npm run test:e2e
```

All tests should pass before submission.

---

## 📂 Project Structure
- `src/components` → Shared components (AutoSaveWrapper, Layout, ProgressBar, Wizard)
- `src/steps` → Individual form steps
- `src/store` → Zustand store for form state
- `cypress` → End‑to‑end test suite

---

## 📜 Compliance
Footer includes grievance officer details and RBI Ombudsman information as required.  
This project is a **frontend simulation only** — no backend services are integrated.

---

## 🔒 Submission Notes
- Repo is **private**.  
- Export as ZIP (excluding `node_modules`) for portal upload.  

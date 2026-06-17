import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("🔵 main.tsx starting...");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ No #root element found in index.html");
} else {
  console.log("✅ Found #root element, mounting React...");
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

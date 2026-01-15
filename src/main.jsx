import { Toaster } from "sonner"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <div className="select-none">
        <Toaster richColors />
        <App />
      </div>
    </StrictMode>
  </>
);

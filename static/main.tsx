import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Home from "../app/page";
import LegalPage from "../components/LegalPage";
import PrivacyPage from "../components/PrivacyPage";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

const pathname = window.location.pathname.replace(/\/index\.html$/, "/");
const page = pathname === "/legal/" ? <LegalPage /> : pathname === "/privacy/" ? <PrivacyPage /> : <Home />;
const app = <React.StrictMode>{page}</React.StrictMode>;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

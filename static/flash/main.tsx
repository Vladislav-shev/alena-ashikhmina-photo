import React from "react";
import { createRoot } from "react-dom/client";
import Flash from "./Flash";
import "./flash.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Flash /></React.StrictMode>);

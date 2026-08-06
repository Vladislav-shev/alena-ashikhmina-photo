import React from "react";
import { createRoot } from "react-dom/client";
import Museum from "./Museum";
import "./museum.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Museum /></React.StrictMode>);

import React from "react";
import { createRoot } from "react-dom/client";
import Kino from "./Kino";
import "./kino.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Kino /></React.StrictMode>);

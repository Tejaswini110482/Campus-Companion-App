import React from "react";
import ReactDOM from "react-dom/client";   // ✅ THIS WAS MISSING
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

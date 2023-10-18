import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import { CssVarsProvider } from "@mui/joy";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);

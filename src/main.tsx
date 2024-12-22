import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./utils/style/index.css";
import AppRouter from "./utils/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);

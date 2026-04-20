import React from "react";
import ReactDOM from "react-dom/client";
import { getCurrentWindow } from "@tauri-apps/api/window";
import App from "./App";
import Panel from "./Panel";

const label = getCurrentWindow().label;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {label === "panel" ? <Panel /> : <App />}
  </React.StrictMode>
);

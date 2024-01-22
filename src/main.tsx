import React from "react";
import { createRoot } from "react-dom/client";
import Mikrofrontend from "./Mikrofrontend";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  const msw = await import("./mock/browser");
  await msw.worker.start({ onUnhandledRequest: "bypass" });
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Mikrofrontend />
  </React.StrictMode>,
);

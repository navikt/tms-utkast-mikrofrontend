import React from "react";
import { createRoot } from "react-dom/client";
import Mikrofrontend from "./Mikrofrontend";
import "./index.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mock/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  const root = createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <React.StrictMode>
      <Mikrofrontend />
    </React.StrictMode>,
  );
});

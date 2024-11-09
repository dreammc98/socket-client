import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
// @ts-ignore

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import App from "./App";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";

// Storyblok Components
import Page from "./storyblok/Page";
import Teaser from "./storyblok/Teaser";
import Grid from "./storyblok/Grid";
import Feature from "./storyblok/Feature";
import Stats from "./storyblok/Stats";
import QuickAction from "./storyblok/QuickAction";

// Initialize Storyblok
storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
    stats: Stats,
    quick_action: QuickAction,
    dashboard: Dashboard,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Dashboards must come first */}
        <Route path="/admin-dashboard" element={<Dashboard onLogout={() => window.location.href = "/"} />} />
        <Route path="/student-dashboard" element={<Dashboard onLogout={() => window.location.href = "/"} />} />
        <Route path="/customer-dashboard" element={<Dashboard onLogout={() => window.location.href = "/"} />} />

        {/* Home / Storyblok pages */}
        <Route path="/" element={<App />} />
        <Route path="/content/:contentType" element={<App />} />
        <Route path="/*" element={<App />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Dashboard from "./components/Dashboard.tsx";

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    dashboard: Dashboard,
  },
});

createRoot(document.getElementById("root")!).render(<App />);

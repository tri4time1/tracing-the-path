import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EpisodePage from "../app/page";
import Homepage from "../app/homepage";
import "../app/globals.css";
import "../src/tracing-path-ribbon.js";

const isEpisodeRoute = window.location.pathname.endsWith("/episode.html");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isEpisodeRoute ? <EpisodePage /> : <Homepage />}
  </StrictMode>,
);

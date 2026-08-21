import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EpisodePage from "../app/page";
import Homepage from "../app/homepage";
import ArticleTemplate from "../app/article";
import "../app/globals.css";
import "../src/tracing-path-ribbon.js";

const isEpisodeRoute = window.location.pathname.endsWith("/episode.html");
const isArticleRoute = window.location.pathname.endsWith("/article.html");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isEpisodeRoute ? <EpisodePage /> : isArticleRoute ? <ArticleTemplate /> : <Homepage />}
  </StrictMode>,
);

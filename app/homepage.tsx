import { createElement } from "react";
import { SiteHeader, SubscribeAndFooter } from "./site-chrome";

export default function Homepage() {
  const base = import.meta.env.BASE_URL;
  const episode = `${base}episode.html`;
  const article = `${base}article.html`;

  return (
    <div className="site-home">
      <SiteHeader base={base} />

      <main>
        <section className="home-ribbon" aria-label="Tracing the path through time">
          {createElement("tracing-path-ribbon")}
        </section>

        <section className="home-tagline">
          <p className="home-eyebrow">AN AWARD-WINNING STORYTELLING PODCAST</p>
          <h1>You know the things.<br />You don&apos;t know the stories.</h1>
          <a href={episode} className="home-text-link">BEGIN WITH THE LATEST STORY <b>→</b></a>
        </section>

        <section className="podcast-introduction" id="about-the-show">
          <div>
            <p className="home-eyebrow">FOLLOW THE CONNECTIONS</p>
            <h2>Familiar things can lead to extraordinary stories.</h2>
          </div>
          <div className="podcast-copy">
            <p>Tracing The Path is an award-winning storytelling podcast that uncovers the surprising history behind the people, products, companies, ideas, and moments that shaped modern life.</p>
            <p>A candy cane can lead to a Swedish single mother. A grocery store can lead to the end of the Cold War. A bottle of Pepsi can lead to a Soviet naval fleet. Each episode starts with something familiar and follows an unexpected path through the people, decisions, inventions, and coincidences that made it possible.</p>
            <p className="podcast-conclusion">Because history isn&apos;t a collection of separate stories. Everything is connected.</p>
          </div>
        </section>

        <section className="latest-episode" aria-labelledby="latest-episode-title">
          <div className="latest-art-wrap"><img src="pepsi-episode-art.jpg" alt="Episode artwork for When Pepsi Cracked the Iron Curtain" /></div>
          <div className="latest-copy">
            <p className="home-eyebrow">LATEST EPISODE</p>
            <h2 id="latest-episode-title">When Pepsi Cracked the Iron Curtain</h2>
            <p>What could Pepsi, videotape, and vodka possibly have in common? Follow one familiar drink through trade, television, Cold War politics, and an unexpected Soviet naval fleet.</p>
            <a href={episode} className="button-rust">LISTEN / EXPLORE <b>→</b></a>
          </div>
        </section>

        <section className="library-gateway" id="episode-library">
          <div className="library-intro">
            <p className="home-eyebrow">EXPLORE THE EPISODE LIBRARY</p>
            <h2>Choose a familiar thing. Follow the path.</h2>
            <p>Stories are connected through people, products, companies, and the moments that changed what came next.</p>
            <a href={episode} className="home-text-link">EXPLORE EPISODE 82 <b>→</b></a>
          </div>
          <div className="library-clues" aria-label="Types of connections to explore">
            <article><span>01</span><strong>People</strong><p>The individuals whose choices changed a story.</p></article>
            <article><span>02</span><strong>Products</strong><p>Everyday objects with surprisingly long histories.</p></article>
            <article><span>03</span><strong>Moments</strong><p>Events that connect a familiar idea to a larger world.</p></article>
          </div>
        </section>

        <section className="press-accolades" aria-labelledby="press-title">
          <div><p className="home-eyebrow">PRESS &amp; ACCOLADES</p><h2 id="press-title">Stories worth passing along.</h2></div>
          <p>Selected awards, recognition, and press features will live here as the collection is assembled.</p>
          <div className="press-placeholders" aria-label="Press and accolades placeholder area"><span>AWARDS</span><span>PRESS</span><span>FEATURES</span><span>LISTENER NOTES</span></div>
        </section>

        <section className="article-preview" id="articles" aria-labelledby="articles-title">
          <div className="section-heading-row"><div><p className="home-eyebrow">FROM THE ARCHIVE</p><h2 id="articles-title">Recent Articles</h2></div><span>New writing will appear here.</span></div>
          <div className="article-grid">
            <article><span>ARTICLE TEMPLATE</span><h3>Behind the stories</h3><p>See how a longer article will read and how it can lead into related articles and episodes.</p><a href={article} className="home-text-link">READ SAMPLE ARTICLE <b>→</b></a></article>
            <article><span>COMING SOON</span><h3>The cutting room floor</h3><p>Facts and surprises Dan discovered but could not fit into the final story.</p></article>
            <article><span>COMING SOON</span><h3>Follow another path</h3><p>Connections between episodes, people, products, and moments in history.</p></article>
          </div>
        </section>

      </main>
      <SubscribeAndFooter base={base} episode={episode} />
    </div>
  );
}

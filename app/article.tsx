import { SiteHeader, SubscribeAndFooter } from "./site-chrome";
import "./article.css";

const relatedItems = [
  { type: "PODCAST EPISODE", title: "When Pepsi Cracked the Iron Curtain", copy: "A bottle of Pepsi leads through trade, television, Cold War politics, and an unexpected Soviet naval fleet.", action: "LISTEN / EXPLORE", image: "pepsi-episode-art.jpg" },
  { type: "RELATED ARTICLE", title: "The story behind the story", copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short introduction can invite readers further into a connected subject.", action: "READ ARTICLE", image: "tracing-the-path-cover.jpg" },
  { type: "RELATED ARTICLE", title: "Follow another path", copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Each recommendation gives the reader one meaningful place to go next.", action: "READ ARTICLE", image: "tracing-the-path-cover.jpg" },
];

export default function ArticleTemplate() {
  const base = import.meta.env.BASE_URL;
  const episode = `${base}episode.html`;

  return (
    <div className="site-article">
      <SiteHeader base={base} />
      <main>
        <header className="article-hero">
          <div className="article-hero-copy">
            <p className="article-kicker">FROM THE ARCHIVE</p>
            <h1>How a Familiar Thing Can Lead to an Extraordinary Story</h1>
            <p className="article-deck">Lorem ipsum dolor sit amet, consectetur adipiscing elit. The article template gives a longer idea room to unfold, one unexpected connection at a time.</p>
          </div>
          <div className="article-featured-image"><img src="pepsi-episode-art.jpg" alt="Sample article artwork" /></div>
        </header>

        <article className="article-reading" aria-label="Sample article">
          <p className="article-lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h2>A path worth following</h2>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <figure className="article-pullquote"><blockquote>“Lorem ipsum dolor sit amet—one familiar detail can open into a much bigger story.”</blockquote><figcaption>Tracing The Path</figcaption></figure>
          <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.</p>
          <h2>Where the story goes next</h2>
          <p>Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
        </article>

        <section className="more-to-know" aria-labelledby="more-to-know-title">
          <div className="more-to-know-heading"><p className="article-kicker">KEEP FOLLOWING THE PATH</p><h2 id="more-to-know-title">More You Want to Know</h2><p>Choose the next connection—an episode, an article, or another story that adds a new piece to the picture.</p></div>
          <div className="more-to-know-grid">
            {relatedItems.map((item) => (
              <article className="more-to-know-card" key={item.title}>
                <img src={item.image} alt="" />
                <div><span>{item.type}</span><h3>{item.title}</h3><p>{item.copy}</p><a href={item.type === "PODCAST EPISODE" ? episode : `${base}article.html`}>{item.action} <b>→</b></a></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SubscribeAndFooter base={base} episode={episode} />
    </div>
  );
}

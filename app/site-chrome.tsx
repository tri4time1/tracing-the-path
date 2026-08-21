import "./homepage.css";

const listeningLinks = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/tracing-the-path-the-connected-20th-century/id1476334630" },
  { label: "Spotify", href: "https://open.spotify.com/show/0N4MXj7uoVxBxqlA0y4z7e" },
  { label: "Amazon Music", href: "https://music.amazon.com/podcasts/693bff58-61f1-46f3-b40a-3090fbe9bf38/tracing-the-path" },
];

export function SiteHeader({ base }: { base: string }) {
  return (
    <header className="site-header">
      <a className="site-wordmark" href={base}>Tracing The Path <span>Podcast</span></a>
      <nav aria-label="Primary navigation">
        <a href={base}>Home</a>
        <a href={`${base}#episode-library`}>Episodes</a>
        <a href={`${base}#atlas`}>Atlas</a>
        <a href={`${base}#about-the-show`}>About Dan</a>
        <a href={`${base}#footer-links`}>Merch</a>
      </nav>
      <a className="header-subscribe" href="#subscribe">Subscribe</a>
    </header>
  );
}

export function SubscribeAndFooter({ base, episode }: { base: string; episode: string }) {
  return (
    <>
      <section className="subscribe-section" id="subscribe">
        <div className="newsletter-panel">
          <p className="home-eyebrow">STAY ON THE PATH</p>
          <h2>New stories, delivered when they&apos;re ready.</h2>
          <p>AWeber will power this email sign-up when the site launches.</p>
          <div className="email-placeholder"><span>Your email address</span><b>SIGN UP →</b></div>
        </div>
        <div className="listen-panel">
          <p className="home-eyebrow">LISTEN WHERE YOU LIKE</p>
          <h2>Subscribe to the podcast.</h2>
          <div>{listeningLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<b>↗</b></a>)}</div>
        </div>
      </section>

      <footer className="site-footer" id="footer-links">
        <div className="footer-column"><p className="footer-label">EXPLORE</p><a href={base}>Home</a><a href={`${base}#episode-library`}>Episodes</a><a href={`${base}#articles`}>Articles</a><a href={`${base}#atlas`}>Atlas</a><span>Merch</span></div>
        <div className="footer-column"><p className="footer-label">LISTEN &amp; LEARN</p><a href={episode}>Episode 82</a><span>Activity Hour</span><span>Sources &amp; Bibliography</span><span>YouTube</span></div>
        <div className="footer-column"><p className="footer-label">CONNECT</p><span>About Dan</span><span>Contact</span><span>Sponsors / Advertise</span><span>Press / Media Kit</span></div>
        <div className="footer-brand"><strong>Tracing The Path<br /><span>Podcast</span></strong><p>Every story is connected.<br />Trace the path.</p></div>
      </footer>
    </>
  );
}

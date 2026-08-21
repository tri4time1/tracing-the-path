"use client";

import { createElement, useEffect, useMemo, useRef, useState } from "react";
import {
  AUDIO_URL,
  DURATION,
  connections,
  nodes,
  storyBeats,
  type StoryConnection,
} from "./episode-data";

const storyCanvasClusters = [
  { id: "trade", title: "THE LONG COMMERCIAL PRELUDE", x: 3, y: 4, width: 29, height: 29 },
  { id: "technology", title: "A TECHNOLOGY CROSSES BORDERS", x: 36, y: 4, width: 28, height: 29 },
  { id: "pepsi", title: "A DRINK BECOMES A BRIDGE", x: 68, y: 4, width: 29, height: 35 },
  { id: "kitchen", title: "THE STORY CONVERGES IN MOSCOW", x: 4, y: 40, width: 38, height: 33 },
  { id: "afterlife", title: "THE DEAL'S AFTERLIFE", x: 47, y: 56, width: 49, height: 34 },
] as const;

const relatedEpisodePlaceholders = [
  { connection: "COMPANION CONVERSATION", title: "The Conversation", description: "After the Pepsi story, Dan and his wife unpack the surprising connections, share reactions, and follow a few paths further.", action: "SUBSCRIBE TO LISTEN", featured: true },
  { connection: "SHARED PERSON", title: "A related episode title", description: "A short explanation of the shared person, product, company, or event will live here.", action: "EXPLORE EPISODE" },
  { connection: "SHARED PRODUCT", title: "A related episode title", description: "Each connection will be selected and explained during editorial review.", action: "EXPLORE EPISODE" },
  { connection: "SHARED COMPANY", title: "A related episode title", description: "Listeners will be able to continue along a specific, meaningful path.", action: "EXPLORE EPISODE" },
  { connection: "SHARED EVENT", title: "A related episode title", description: "This space will never recommend an episode without an explicit connection.", action: "EXPLORE EPISODE" },
] as const;


const storyPreviewSections = [
  {
    chapter: "01",
    time: 0,
    timestamp: "0:00",
    kicker: "THE OPENING RIDDLE",
    title: "What connects videotape, vodka, and Pepsi?",
    image: "sketch-ampex-videotape.png",
    imageAlt: "Illustration of an Ampex videotape machine",
    paragraphs: [
      "Start in a model American kitchen in Moscow, in the summer of 1959. Vice President Richard Nixon and Soviet leader Nikita Khrushchev are arguing over the promise of their competing systems. It is a scene familiar enough to have a name: the Kitchen Debate.",
      "But Dan asks us to stop looking only at the two men. Nearby are a cup of Pepsi, a new videotape machine, and a country whose vodka will soon become part of an extraordinary trade. The story is not really about one debate. It is about the long and surprising paths that brought all of those things into the same room.",
    ],
    ahead: "Before the Cold War made the United States and Russia appear permanently opposed, merchants were already finding reasons to cross the Atlantic.",
  },
  {
    chapter: "02",
    time: 58,
    timestamp: "0:58",
    kicker: "THE FIRST BRIDGE",
    title: "Catherine the Great keeps trade open",
    image: "sketch-catherine-the-great.jpg",
    imageAlt: "Illustration of Catherine the Great",
    paragraphs: [
      "To find the first thread, Dan travels back to 1763. American merchants were beginning to reach St. Petersburg with goods from the Caribbean and the colonies, while Russia was deciding how it would position itself among the powers of Europe.",
      "Catherine the Great saw an advantage in leaving room for a new trading partner. Her choice helped create a commercial relationship built on cargo, calculation, and mutual benefit—long before either nation imagined the ideological conflict that would later define the century.",
    ],
    ahead: "Trade creates a route. A century later, Russian ships and American companies will turn that route into something much larger.",
  },
  {
    chapter: "03",
    time: 166,
    timestamp: "2:46",
    kicker: "SHIPS BECOME STOREFRONTS",
    title: "A naval visit grows into a commercial corridor",
    image: "sketch-russian-fleet-1863.jpg",
    imageAlt: "Illustration of the Russian fleet visit of 1863",
    paragraphs: [
      "In 1863, Russian ships arrived in New York and San Francisco during the American Civil War. The visit carried political meaning, but it also helped make a relationship between the two countries feel possible and tangible.",
      "Over the decades that followed, commerce filled in the route. Alaska changed hands. American firms—including Singer and Westinghouse—built major operations in Russia. By 1912, Singer was so familiar that its name could stand in for a sewing machine itself. The pathway that will eventually lead to Pepsi in Moscow begins as a remarkably ordinary story: products moving where people can use them.",
    ],
    ahead: "That commercial corridor will not stay open. Revolution will redraw the rules—and transform a familiar Russian product into Stolichnaya.",
  },
] as const;


const activityHourQuestions = [
  {
    question: "Why is the 1959 Kitchen Debate only the beginning of this story?",
    answer: "The famous argument between Nixon and Khrushchev brings the episode’s threads together, but the American–Russian commercial relationship, recording technology, Pepsi, and Soviet vodka each have much older histories.",
  },
  {
    question: "What problem did Pepsi solve with a barter agreement?",
    answer: "Soviet rubles could not be freely exchanged for U.S. dollars. Barter let Pepsi trade concentrate for Soviet goods, including Stolichnaya vodka, rather than relying on conventional currency.",
  },
  {
    question: "Why does Alexander Poniatoff matter to the Kitchen Debate?",
    answer: "The Russian-born engineer founded Ampex, whose videotape technology recorded the encounter and helped carry the raw exchange to television audiences.",
  },
  {
    question: "What does this episode suggest about everyday products and world events?",
    answer: "A familiar drink, a recording machine, or a bottle of vodka can carry histories of migration, trade, politics, technology, and culture. Looking closely at one item can reveal a much larger path.",
  },
] as const;

const activityHourGlossary = [
  { term: "Barter", definition: "Trading goods or services directly instead of using money." },
  { term: "Kitchen Debate", definition: "The 1959 exchange between Richard Nixon and Nikita Khrushchev at the American National Exhibition in Moscow." },
  { term: "Ampex", definition: "A California company founded by Alexander Poniatoff that made pioneering videotape recorders." },
  { term: "Stolichnaya", definition: "A vodka brand whose Soviet-era production later became part of Pepsi’s barter arrangement." },
  { term: "Cultural exchange", definition: "Programs that move artists, ideas, performances, books, medical knowledge, and people between countries." },
] as const;

const storyCanvasPositions: Record<string, { x: number; y: number }> = {
  empire: { x: 9, y: 15 }, catherine: { x: 18, y: 15 }, fleet1863: { x: 27, y: 15 },
  singer: { x: 13, y: 28 }, lenin: { x: 24, y: 28 },
  newsreels: { x: 42, y: 16 }, poniatoff: { x: 51, y: 16 }, magnetophon: { x: 60, y: 16 },
  ampex: { x: 51, y: 29 },
  bradham: { x: 73, y: 16 }, pepsi: { x: 84, y: 15 }, kendall: { x: 93, y: 18 },
  vodka: { x: 83, y: 31 },
  exchange: { x: 12, y: 52 }, exhibition: { x: 28, y: 52 },
  nixon: { x: 14, y: 66 }, khrushchev: { x: 29, y: 66 },
  fleet: { x: 57, y: 68 }, collapse: { x: 70, y: 68 }, putin: { x: 85, y: 68 },
  harrier: { x: 71, y: 83 },
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function HistoricalTimeline({ activeIndex }: { activeIndex: number }) {
  const active = storyBeats[activeIndex];
  const [start, end] = active.range;
  const span = Math.max(1, end - start);
  const markers = storyBeats
    .map((beat, index) => ({ ...beat, index }))
    .filter((beat) => beat.historicalYear >= start && beat.historicalYear <= end)
    .filter((beat, index, list) => list.findIndex((item) => item.historicalYear === beat.historicalYear) === index);

  return (
    <section className="history-timeline" aria-label="Historical timeline">
      <div className="history-timeline-head">
        <span>HISTORY TIME</span>
        <strong>{active.year}</strong>
        <small>{active.scale} view · follows Dan’s historical jumps</small>
      </div>
      <div className="history-track">
        <span className="track-end start">{start}</span>
        <i className="track-line" />
        {markers.map((marker) => {
          const position = ((marker.historicalYear - start) / span) * 100;
          return (
            <span
              className={`history-marker ${marker.index === activeIndex ? "current" : ""}`}
              style={{ left: `${Math.min(96, Math.max(4, position))}%` }}
              key={`${marker.historicalYear}-${marker.title}`}
            >
              <b>{marker.historicalYear}</b><i />
            </span>
          );
        })}
        <span className="track-end end">{end}</span>
      </div>
    </section>
  );
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const mapPanelRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<StoryConnection | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isCompactMap, setIsCompactMap] = useState(false);

  const activeIndex = useMemo(() => {
    let index = 0;
    storyBeats.forEach((beat, i) => { if (currentTime >= beat.time) index = i; });
    return index;
  }, [currentTime]);
  const activeBeat = storyBeats[activeIndex];

  const hasStarted = isPlaying || currentTime > 0;
  const revealedNodes = useMemo(
    () => new Set(
      nodes
        .filter((node) => currentTime >= node.firstSeen)
        .map((node) => node.id),
    ),
    [currentTime, hasStarted],
  );
  const revealedConnections = useMemo(
    () => connections.filter((connection) => currentTime >= connection.revealAt),
    [currentTime],
  );
  const latestConnection = revealedConnections.at(-1) ?? null;
  const positionedNodes = useMemo(
    () => nodes.map((node, index) => isCompactMap ? {
      ...node,
      x: [17, 50, 83][index % 3],
      y: 7 + Math.floor(index / 3) * 14,
    } : { ...node, ...storyCanvasPositions[node.id] }),
    [isCompactMap],
  );
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const updateMapLayout = () => setIsCompactMap(query.matches);
    updateMapLayout();
    query.addEventListener("change", updateMapLayout);
    return () => query.removeEventListener("change", updateMapLayout);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setCurrentTime(audio.currentTime);
    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("play", play);
    audio.addEventListener("pause", pause);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("play", play);
      audio.removeEventListener("pause", pause);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play(); else audio.pause();
  }

  function seek(time: number, play = false) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.max(0, Math.min(DURATION, time));
    audio.currentTime = next;
    setCurrentTime(next);
    if (play) void audio.play();
  }

  function changeRate(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }

  function printActivity(mode: "story" | "guide") {
    document.body.dataset.printMode = mode;
    window.print();
    window.setTimeout(() => { delete document.body.dataset.printMode; }, 1000);
  }

  function showBeatOnMap(index: number) {
    seek(storyBeats[index].time);
    setSelectedNode(null);
    requestAnimationFrame(() => mapPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const focusedConnection = selectedConnection ?? latestConnection;

  return (
    <main>
      <section className="homepage-ribbon" aria-label="Tracing the path through time">
        {createElement("tracing-path-ribbon")}
      </section>
      <section className="episode-intro" id="top">
        <img src="pepsi-episode-art.jpg" alt="Episode artwork for When Pepsi Cracked the Iron Curtain" />
        <div>
          <h1>What could Pepsi, videotape, and vodka possibly have in common?</h1>
          <p>Press play and watch Dan R. Morris’s answer assemble itself—every illustration begins as a faint watermark, then color and connections arrive as Dan tells the story.</p>
          <button onClick={() => { seek(0); togglePlay(); }}>{isPlaying ? "PAUSE THE STORY" : "PLAY & BUILD THE PATH"} <b>{isPlaying ? "Ⅱ" : "▶"}</b></button>
        </div>
        <aside><img src="dan-r-morris.png" alt="Dan R. Morris" /><span>TOLD BY</span><strong>Dan R. Morris</strong><small>Award-winning storyteller and host of Tracing The Path</small><nav className="subscribe-links" aria-label="Subscribe to Tracing The Path"><span>LISTEN &amp; SUBSCRIBE</span><div><a href="https://podcasts.apple.com/us/podcast/tracing-the-path-the-connected-20th-century/id1476334630" target="_blank" rel="noreferrer">APPLE PODCASTS</a><a href="https://open.spotify.com/show/0N4MXj7uoVxBxqlA0y4z7e" target="_blank" rel="noreferrer">SPOTIFY</a><a href="https://music.amazon.com/podcasts/693bff58-61f1-46f3-b40a-3090fbe9bf38/tracing-the-path" target="_blank" rel="noreferrer">AMAZON MUSIC</a></div></nav></aside>
      </section>

      <section className="experience">
        <section ref={mapPanelRef} className="map-panel" aria-label="Animated story connection map">
          <HistoricalTimeline activeIndex={activeIndex} />
          <div className="map-heading"><span><b>NOW TRACING</b>{activeBeat.year} · {activeBeat.title}</span><div className="drawing-status"><i />{isPlaying ? "BRINGING THE PATH TO LIFE" : "PRESS PLAY TO REVEAL"}</div><small>{nodes.length} watermark illustrations · {revealedConnections.length}/{connections.length} links</small></div>
          <div className="map-canvas">
            <div className="paper-grid" />
            {storyCanvasClusters.map((cluster) => (
              <div
                className={`story-cluster cluster-${cluster.id}`}
                key={cluster.id}
                style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, width: `${cluster.width}%`, height: `${cluster.height}%` }}
              ><span>{cluster.title}</span></div>
            ))}
            {!hasStarted && <div className="map-invitation" aria-hidden="true"><b>▶</b><span>PRESS PLAY</span><strong>Watch the interactive map come alive.</strong></div>}
            {connections.map((connection, index) => {
              const start = positionedNodes.find((node) => node.id === connection.from)!;
              const end = positionedNodes.find((node) => node.id === connection.to)!;
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const length = Math.sqrt(dx * dx + dy * dy).toFixed(3);
              const angle = (Math.atan2(dy, dx) * (180 / Math.PI)).toFixed(3);
              const revealed = currentTime >= connection.revealAt;
              const active = focusedConnection === connection;
              return (
                <button
                  key={`${connection.from}-${connection.to}-${index}`}
                  className={`connection ${revealed ? "revealed" : ""} ${active ? "active" : ""}`}
                  style={{ left: `${start.x}%`, top: `${start.y}%`, width: `${length}%`, transform: `rotate(${angle}deg)` }}
                  onClick={() => revealed && setSelectedConnection(connection)}
                  aria-label={revealed ? `${start.label} ${connection.label} ${end.label}` : "Connection not yet revealed"}
                ><i /></button>
              );
            })}
            {positionedNodes.map((node, nodeIndex) => {
              const revealed = revealedNodes.has(node.id);
              const active = activeBeat.nodes.includes(node.id);
              return (
                <button
                  key={node.id}
                  className={`map-node node-${node.id} ${node.kind} ${revealed ? "revealed" : "watermark"} ${active ? "active" : ""}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%`, "--draw-delay": `${(nodeIndex % 4) * 90}ms` } as React.CSSProperties}
                  onClick={() => revealed && setSelectedNode(node.id === selectedNode ? null : node.id)}
                  disabled={!revealed}
                  aria-label={revealed ? `${node.label}, ${node.historicalDate}` : `${node.label} is waiting to be introduced`}
                >
                  <span className="sketch-frame"><img src={node.image} alt="" loading="lazy" decoding="async" /><i className="hatch h1" /><i className="hatch h2" /><i className="hatch h3" /><span className="pencil-tip">✎</span></span>
                  <strong>{node.label}</strong>
                  <small>{node.historicalDate}</small>
                </button>
              );
            })}
            {selectedNode && (() => {
              const node = nodes.find((item) => item.id === selectedNode)!;
              return <div className="node-detail"><button onClick={() => setSelectedNode(null)} aria-label="Close detail">×</button><span>{node.historicalDate}</span><strong>{node.label}</strong><p>{node.description}</p><button className="detail-replay" onClick={() => seek(node.firstSeen, true)}>HEAR THE INTRODUCTION · {formatTime(node.firstSeen)} ▶</button></div>;
            })()}
          </div>
          {focusedConnection && !selectedNode && <button className="connection-detail" onClick={() => seek(focusedConnection.revealAt, true)}><span>LATEST CONNECTION</span><strong>{focusedConnection.label}</strong><p>{focusedConnection.explanation}</p><b>REPLAY AT {formatTime(focusedConnection.revealAt)} ▶</b></button>}
        </section>
      </section>

      <section className="player-shell" aria-label="Episode player">
        <audio ref={audioRef} src={AUDIO_URL} preload="metadata"><track kind="captions" src="episode-82-transcript.vtt" srcLang="en" label="English" /></audio>
        <div className="player-main">
          <button className="skip-button" onClick={() => seek(currentTime - 15)} aria-label="Back 15 seconds">↶<small>15</small></button>
          <button className="play-button" onClick={togglePlay} aria-label={isPlaying ? "Pause episode" : "Play episode"}>{isPlaying ? "Ⅱ" : "▶"}</button>
          <button className="skip-button" onClick={() => seek(currentTime + 15)} aria-label="Forward 15 seconds">↷<small>15</small></button>
          <div className="scrubber-wrap">
            <div className="audio-time-labels"><span>PODCAST TIME · {formatTime(currentTime)}</span><span>−{formatTime(DURATION - currentTime)}</span></div>
            <input aria-label="Episode progress" type="range" min="0" max={DURATION} step="0.1" value={currentTime} onChange={(event) => seek(Number(event.target.value))} style={{ "--progress": `${(currentTime / DURATION) * 100}%` } as React.CSSProperties} />
            <div className="chapter-labels">{storyBeats.map((beat, i) => <button key={beat.time} className={i === activeIndex ? "active" : ""} onClick={() => seek(beat.time)} aria-label={`Go to ${beat.title}`}><i /></button>)}</div>
          </div>
          <label className="speed-control">SPEED<select value={playbackRate} onChange={(event) => changeRate(Number(event.target.value))}><option value="0.75">0.75×</option><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label>
          <button className="next-button" onClick={() => seek(storyBeats[Math.min(activeIndex + 1, storyBeats.length - 1)].time)}>NEXT CHAPTER <span>→</span></button>
        </div>
      </section>

      <section className="the-story" aria-labelledby="the-story-title">
        <div className="the-story-heading">
          <span>THE STORY</span>
          <h2 id="the-story-title">The paths behind one photograph.</h2>
          <p>Read the episode as a connected historical story, or jump into the audio at any point. This is the editorial reading experience that will ultimately live on every episode page.</p>
        </div>
        <div className="story-reading">
          {storyPreviewSections.map((section) => (
            <article className="story-section" key={section.chapter}>
              <div className="story-section-marker">
                <span>{section.chapter}</span>
                <time>{section.timestamp}</time>
                <button onClick={() => seek(section.time, true)}>LISTEN FROM HERE <b>→</b></button>
              </div>
              <div className="story-section-copy">
                <img src={section.image} alt={section.imageAlt} />
                <div>
                  <span>{section.kicker}</span>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <aside className="path-ahead">
                <span>AHEAD ON THE PATH</span>
                <p>{section.ahead}</p>
              </aside>
            </article>
          ))}
        </div>
        <div className="story-continues">
          <span>THE STORY CONTINUES</span>
          <p>The remaining chapters will follow this same reading format—bringing the audio, illustrations, historical details, and connections together as one edited narrative.</p>
        </div>
      </section>

      <section className="sources-prompt" aria-labelledby="sources-prompt-title">
        <div><span>SOURCES BEHIND THIS STORY</span><h2 id="sources-prompt-title">Follow the research.</h2></div>
        <p>Books, articles, archives, recordings, and other material behind this episode will be gathered in its dedicated bibliography.</p>
        <span className="sources-prompt-link">EPISODE BIBLIOGRAPHY <b>→</b><small>COMING SOON</small></span>
      </section>

      <section className="activity-hour" aria-labelledby="activity-hour-title">
        <div className="activity-hour-heading">
          <span>ACTIVITY HOUR</span>
          <h2 id="activity-hour-title">Listen together. Remember together. Talk it through.</h2>
          <p>Designed for a 40-minute episode followed by an unhurried conversation. Use the story as a read-along, then let the questions open the room.</p>
        </div>
        <div className="activity-print-actions">
          <div><span>READY FOR THE ROOM</span><strong>Choose the version you need.</strong></div>
          <div className="activity-buttons">
            <button onClick={() => printActivity("story")}>PRINT THE STORY <b>↗</b></button>
            <button onClick={() => printActivity("guide")}>PRINT ACTIVITY GUIDE <b>↗</b></button>
          </div>
        </div>
        <div className="activity-content">
          <section className="discussion-questions" aria-labelledby="discussion-title">
            <div className="activity-section-heading"><span>DISCUSSION</span><h3 id="discussion-title">Questions for the group</h3></div>
            <ol>
              {activityHourQuestions.map((item, index) => <li key={item.question}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.question}</p></li>)}
            </ol>
          </section>
          <section className="facilitator-notes" aria-labelledby="facilitator-title">
            <div className="activity-section-heading"><span>FOR THE FACILITATOR</span><h3 id="facilitator-title">Talking points</h3></div>
            <ol>
              {activityHourQuestions.map((item, index) => <li key={item.answer}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.answer}</p></li>)}
            </ol>
          </section>
        </div>
        <section className="activity-glossary" aria-labelledby="glossary-title">
          <div className="activity-section-heading"><span>GLOSSARY</span><h3 id="glossary-title">Words and ideas along the path</h3></div>
          <dl>
            {activityHourGlossary.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}
          </dl>
        </section>
      </section>

      <section className="related-episodes" aria-labelledby="related-episodes-title">
        <div className="related-episodes-intro"><span>KEEP FOLLOWING THE PATH</span><h2 id="related-episodes-title">Other Interconnected Episodes</h2><p>When this story shares a person, product, company, event, or idea with another episode, the next path begins here.</p></div>
        <div className="related-episode-grid">
          {relatedEpisodePlaceholders.map((episode, index) => <article className={`related-episode-card ${episode.featured ? "companion-conversation" : ""}`} key={episode.connection}>
            <div className="related-episode-art"><img src="tracing-the-path-cover.jpg" alt="" /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div><small>{episode.connection}</small><h3>{episode.title}</h3><p>{episode.description}</p><span className="related-episode-link">{episode.action} <b>→</b></span></div>
          </article>)}
        </div>
      </section>

      <section className="host-feature" style={{ gridTemplateColumns: "minmax(300px, 1.1fr) minmax(320px, 1fr)" }}>
        <div className="host-photo-wrap"><img src="dan-r-morris.png" alt="Dan R. Morris, host of Tracing The Path" /><span>YOUR STORYTELLER</span></div>
        <div className="host-story"><span>THE VOICE BEHIND THE PATH</span><h2>Dan R. Morris</h2><h3>Award-winning storyteller. 20th-century historian. Tireless connector of dots.</h3><p>Dan begins with something familiar—a product, a person, a phrase—and follows the forgotten decisions that made it matter. This visual edition keeps his narration at the center while the history assembles around it.</p><a href="https://audienceindustries.com/about-tracing-the-path" target="_blank" rel="noreferrer">MEET DAN &amp; TRACING THE PATH ↗</a></div>
              </section>

      {showGuide && <div className="modal-backdrop" role="button" tabIndex={0} aria-label="Close exploration guide" onKeyDown={(event) => { if (event.key === "Escape" || event.key === "Enter") setShowGuide(false); }} onClick={(event) => { if (event.target === event.currentTarget) setShowGuide(false); }}><div className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title"><button onClick={() => setShowGuide(false)} aria-label="Close guide">×</button><span>HOW TO EXPLORE</span><h2 id="guide-title">Hear it. See it. Follow it.</h2><ol><li><b>01</b><p><strong>Press play</strong>Faint illustrations are already waiting; color arrives when Dan introduces them.</p></li><li><b>02</b><p><strong>Watch history time</strong>The upper timeline jumps backward and forward independently of the audio scrubber.</p></li><li><b>03</b><p><strong>Select the map</strong>Every illustration and connection can replay its own explanation.</p></li><li><b>04</b><p><strong>Explore the full path</strong>Return to any revealed illustration or line to replay its explanation.</p></li></ol><button className="start-button" onClick={() => { setShowGuide(false); seek(0, true); }}>START THE EPISODE →</button></div></div>}
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AUDIO_URL,
  DURATION,
  connections,
  nodes,
  storyBeats,
  type StoryConnection,
} from "./episode-data";

type TranscriptSegment = { id: number; start: number; end: number; text: string };
type TranscriptDocument = { segments: TranscriptSegment[]; reviewStatus: string };

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
  const transcriptListRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<StoryConnection | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [isCompactMap, setIsCompactMap] = useState(false);

  const activeIndex = useMemo(() => {
    let index = 0;
    storyBeats.forEach((beat, i) => { if (currentTime >= beat.time) index = i; });
    return index;
  }, [currentTime]);
  const activeBeat = storyBeats[activeIndex];

  const activeTranscriptIndex = useMemo(() => {
    if (!transcript.length) return -1;
    let index = 0;
    transcript.forEach((segment, i) => { if (currentTime >= segment.start) index = i; });
    return index;
  }, [currentTime, transcript]);
  const activeTranscript = transcript[activeTranscriptIndex];

  const hasStarted = isPlaying || currentTime > 0;
  const revealedNodes = useMemo(
    () => new Set(
      nodes
        .filter((node) => (node.firstSeen === 0 ? hasStarted : currentTime >= node.firstSeen))
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
    } : node),
    [isCompactMap],
  );
  useEffect(() => {
    fetch("episode-82-transcript.json")
      .then((response) => response.json())
      .then((document: TranscriptDocument) => setTranscript(document.segments))
      .catch(() => setTranscript([]));
  }, []);

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

  useEffect(() => {
    if (!showTranscript || activeTranscriptIndex < 0 || !transcriptListRef.current) return;
    const item = transcriptListRef.current.querySelector<HTMLElement>(`[data-transcript-id="${activeTranscriptIndex}"]`);
    if (item) transcriptListRef.current.scrollTop = Math.max(0, item.offsetTop - transcriptListRef.current.clientHeight / 2);
  }, [activeTranscriptIndex, showTranscript]);

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

  function showBeatOnMap(index: number) {
    seek(storyBeats[index].time);
    setSelectedNode(null);
    requestAnimationFrame(() => mapPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const focusedConnection = selectedConnection ?? latestConnection;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Tracing The Path home">
          <img className="brand-cover" src="tracing-the-path-cover.jpg" alt="" />
          <span><strong>TRACING THE PATH</strong><small>THE INTER-CONNECTED 20TH CENTURY</small></span>
        </a>
        <div className="host-chip"><img src="dan-r-morris.png" alt="" /><span>HOSTED &amp; NARRATED BY<strong>DAN R. MORRIS</strong></span></div>
        <button className="about-button" onClick={() => setShowGuide(true)}>HOW TO EXPLORE <span>↗</span></button>
      </header>

      <section className="episode-intro" id="top">
        <img src="pepsi-episode-art.jpg" alt="Episode artwork for When Pepsi Cracked the Iron Curtain" />
        <div>
          <h1>What could Pepsi, videotape, and vodka possibly have in common?</h1>
          <p>Press play and watch Dan R. Morris’s answer assemble itself—every illustration begins as a faint watermark, then color and connections arrive as Dan tells the story.</p>
          <button onClick={() => { seek(0); togglePlay(); }}>{isPlaying ? "PAUSE THE STORY" : "PLAY & BUILD THE PATH"} <b>{isPlaying ? "Ⅱ" : "▶"}</b></button>
        </div>
        <aside><img src="dan-r-morris.png" alt="Dan R. Morris" /><span>TOLD BY</span><strong>Dan R. Morris</strong><small>Award-winning storyteller and host of Tracing The Path</small></aside>
      </section>

      <section className="experience">
        <section ref={mapPanelRef} className="map-panel" aria-label="Animated story connection map">
          <HistoricalTimeline activeIndex={activeIndex} />
          <div className="map-heading"><span><b>NOW TRACING</b>{activeBeat.year} · {activeBeat.title}</span><div className="drawing-status"><i />{isPlaying ? "BRINGING THE PATH TO LIFE" : "PRESS PLAY TO REVEAL"}</div><small>{nodes.length} watermark illustrations · {revealedConnections.length}/{connections.length} links</small></div>
          <div className="map-canvas">
            <div className="paper-grid" />
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
          <div className="map-legend"><small>Faint illustrations show the whole path ahead. Color and connections arrive with Dan’s narration; select any revealed image or line to hear its explanation.</small></div>
        </section>
      </section>

      <section className="player-shell" aria-label="Episode player">
        <audio ref={audioRef} src={AUDIO_URL} preload="metadata"><track kind="captions" src="episode-82-transcript.vtt" srcLang="en" label="English" /></audio>
        <div className="live-caption"><span>DAN IS SAYING</span><p>{activeTranscript?.text ?? "Press play to begin the synchronized transcript."}</p><button onClick={() => setShowTranscript((value) => !value)}>{showTranscript ? "HIDE TRANSCRIPT" : "OPEN TRANSCRIPT"}</button></div>
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
        {showTranscript && <div className="transcript-drawer"><div className="transcript-head"><div><span>TIMESTAMPED TRANSCRIPT</span><strong>Follow Dan word for word</strong></div><p>Machine-transcribed and proper names reviewed. Click any line to jump the audio.</p><div className="transcript-downloads"><a href="episode-82-transcript.txt" download>DOWNLOAD TEXT ↓</a><a href="episode-82-transcript.json" download>JSON ↓</a></div></div><div className="transcript-list" ref={transcriptListRef}>{transcript.map((segment, index) => <button key={segment.id} data-transcript-id={index} className={index === activeTranscriptIndex ? "active" : ""} onClick={() => seek(segment.start, true)}><time>{formatTime(segment.start)}</time><span>{segment.text}</span></button>)}</div></div>}
      </section>

      <section className="journey">
        <div className="journey-intro"><span>THE EPISODE, CHAPTER BY CHAPTER</span><h2>Jump anywhere without losing the path.</h2></div>
        <p className="journey-lede">Each chapter now comes directly from the timestamped transcript. Choosing one returns you to the map, moves historical time, and cues the audio.</p>
        <div className="chapter-grid">
          {storyBeats.map((beat, i) => {
            const beatNodes = beat.nodes.map((nodeId) => nodes.find((node) => node.id === nodeId)).filter(Boolean);
            return <button key={beat.time} onClick={() => showBeatOnMap(i)} className={`chapter-card ${i === activeIndex ? "active" : ""}`} aria-pressed={i === activeIndex}>
              <span className="chapter-card-top"><b>{String(i + 1).padStart(2, "0")}</b><small>{formatTime(beat.time)} · {beat.year}</small></span>
              <span className="chapter-art" aria-hidden="true">{beatNodes.slice(0, 4).map((node) => <img key={node!.id} src={node!.image} alt="" loading="lazy" decoding="async" />)}</span>
              <span className="chapter-kicker">{beat.kicker}</span><strong>{beat.title}</strong><p>{beat.description}</p>
              <span className="chapter-action">{i === activeIndex ? "VIEWING ON MAP" : "JUMP TO MAP"}<b>↑</b></span>
            </button>;
          })}
        </div>
      </section>

      <section className="final-map"><span>WHEN THE LAST CONNECTION APPEARS</span><h2>The episode becomes a map you can replay.</h2><p>People, products, political systems, inventions, and borders remain connected in one accumulated view. Return to any illustration or line to hear how Dan introduced it.</p><button onClick={() => { seek(DURATION - 3); mapPanelRef.current?.scrollIntoView({ behavior: "smooth" }); }}>REVEAL THE COMPLETED PATH ↑</button></section>

      <section className="host-feature">
        <div className="host-photo-wrap"><img src="dan-r-morris.png" alt="Dan R. Morris, host of Tracing The Path" /><span>YOUR STORYTELLER</span></div>
        <div className="host-story"><span>THE VOICE BEHIND THE PATH</span><h2>Dan R. Morris</h2><h3>Award-winning storyteller. 20th-century historian. Tireless connector of dots.</h3><p>Dan begins with something familiar—a product, a person, a phrase—and follows the forgotten decisions that made it matter. This visual edition keeps his narration at the center while the history assembles around it.</p><a href="https://audienceindustries.com/about-tracing-the-path" target="_blank" rel="noreferrer">MEET DAN &amp; TRACING THE PATH ↗</a></div>
        <img className="host-cover" src="tracing-the-path-cover.jpg" alt="Tracing The Path podcast cover" />
      </section>

      <footer><span>TRACING THE PATH</span><p>Hosted by Dan R. Morris · Everyday things. Extraordinary connections.</p><a href="https://podcasts.apple.com/us/podcast/tracing-the-path-the-connected-20th-century/id1476334630" target="_blank" rel="noreferrer">VIEW ON APPLE PODCASTS ↗</a></footer>

      {showGuide && <div className="modal-backdrop" role="button" tabIndex={0} aria-label="Close exploration guide" onKeyDown={(event) => { if (event.key === "Escape" || event.key === "Enter") setShowGuide(false); }} onClick={(event) => { if (event.target === event.currentTarget) setShowGuide(false); }}><div className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title"><button onClick={() => setShowGuide(false)} aria-label="Close guide">×</button><span>HOW TO EXPLORE</span><h2 id="guide-title">Hear it. See it. Follow it.</h2><ol><li><b>01</b><p><strong>Press play</strong>Faint illustrations are already waiting; color arrives when Dan introduces them.</p></li><li><b>02</b><p><strong>Watch history time</strong>The upper timeline jumps backward and forward independently of the audio scrubber.</p></li><li><b>03</b><p><strong>Select the map</strong>Every illustration and connection can replay its own explanation.</p></li><li><b>04</b><p><strong>Open the transcript</strong>Follow, search visually, or jump from any timestamp.</p></li></ol><button className="start-button" onClick={() => { setShowGuide(false); seek(0, true); }}>START THE EPISODE →</button></div></div>}
    </main>
  );
}

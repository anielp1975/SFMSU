"use client";

import { useEffect, useRef, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const STREAM_URL = "/api/stream";

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      setError(null);
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio play failed", err);
      setError("Stream kan niet worden geladen. Probeer later opnieuw.");
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolume = (value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  return (
    <main className="page">
      <header className="masthead">
        <div className="pill">Live 24/7 · Paramaribo</div>
        <h1>SunriseFM Suriname</h1>
        <p className="lede">Surinaamse vibes, nieuws en community radio. Luister wereldwijd via de live stream of stem af op 100.1 FM.</p>
        <div className="chips">
          <span className="chip">100.1 FM</span>
          <span className="chip">Online wereldwijd</span>
          <span className="chip">HD audio</span>
        </div>
      </header>

      <section className="grid">
        <div className="card player-card">
          <div className="card__head">
            <div className="status">
              <span className={`live-dot ${isPlaying ? "on" : "idle"}`} aria-hidden />
              <div>
                <p className="label">Live stream</p>
                <p className="muted">Studio Paramaribo · Non-stop radio</p>
              </div>
            </div>
            <button className="ghost" onClick={toggleMute}>{isMuted ? "Geluid aan" : "Mute"}</button>
          </div>

          <audio ref={audioRef} preload="none" crossOrigin="anonymous">
            <source src={STREAM_URL} type="audio/mpeg" />
            Je browser ondersteunt geen audio tag.
          </audio>

          <div className="primary-controls">
            <button className="cta" onClick={isPlaying ? pause : play}>
              {isPlaying ? "Pauzeer stream" : "Start de stream"}
            </button>
            <div className="secondary-controls">
              <button className="ghost" onClick={stop}>Reset</button>
              <div className="volume">
                <span>Volume</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => handleVolume(Number(e.target.value))}
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>

          <div className="inline-metrics">
            <div>
              <p className="muted">Status</p>
              <p className="metric">{isPlaying ? "Live" : "Gepauzeerd"}</p>
            </div>
            <div>
              <p className="muted">Bitrate</p>
              <p className="metric">128 kbps</p>
            </div>
            <div>
              <p className="muted">Frequentie</p>
              <p className="metric">100.1 FM</p>
            </div>
          </div>

          {error ? <p className="hint" aria-live="polite">{error}</p> : null}
        </div>

        <div className="card info-card">
          <div className="card__head">
            <p className="label">Contact & studio</p>
            <span className="pill soft">Bereikbaar</span>
          </div>
          <ul className="list">
            <li>Pandit Paltan Tewarieweg 37</li>
            <li>Paramaribo / Livorno, Suriname</li>
            <li>Tel: 597-482650</li>
            <li>WhatsApp: 597-8820065</li>
          </ul>
          <p className="muted">Stuur je shout-out of aankondiging; wij zetten het live in de uitzending.</p>
        </div>

        <div className="card highlights">
          <div className="card__head">
            <p className="label">Programmering</p>
            <span className="pill soft">Elke dag</span>
          </div>
          <div className="pill-grid">
            <span className="chip">Ochtendshow · nieuws</span>
            <span className="chip">Surinaamse classics</span>
            <span className="chip">Talk & community</span>
            <span className="chip">Weekend party mix</span>
          </div>
          <p className="muted">Altijd in beweging met muziek, headlines en lokale verhalen.</p>
        </div>
      </section>

      <footer className="footnote">© 2026 SunriseFM Suriname. Alle rechten voorbehouden.</footer>
    </main>
  );
}

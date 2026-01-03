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
      <section className="hero">
        <div className="brand">
          <img
            src="https://sunrisefmsuriname.com/logo/sfmsulogo1.png"
            alt="SunriseFM Suriname logo"
            className="logo"
          />
          <div>
            <p className="eyebrow">SunriseFM Suriname · 100.1 FM</p>
            <h1>Luister naar SunriseFM Suriname</h1>
            <p className="lede">Wereldwijd via onze online radio. Surinaamse vibes, 24/7.</p>
          </div>
        </div>

        <div className="player card">
          <p className="label">Live stream</p>
          <audio ref={audioRef} preload="none" crossOrigin="anonymous">
            <source src={STREAM_URL} type="audio/mpeg" />
            Je browser ondersteunt geen audio tag.
          </audio>

          <div className="controls">
            <button className="control" onClick={isPlaying ? pause : play}>
              {isPlaying ? "Pauze" : "Play"}
            </button>
            <button className="control" onClick={stop}>Stop</button>
            <button className="control" onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
            <div className="volume">
              <span>Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolume(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="player__note">
            <span className="live-dot" aria-hidden /> Live vanaf Paramaribo · Werkt het niet? Vernieuw de pagina of
            probeer later opnieuw.
          </div>
          {error ? <p className="hint" aria-live="polite">{error}</p> : null}
        </div>

        <div className="card contact">
          <p className="label">Contact</p>
          <p>Pandit Paltan Tewarieweg 37</p>
          <p>Paramaribo / Livorno, Suriname</p>
          <p>Tel: 597-482650 · 597-8820065</p>
        </div>
      </section>

      <footer className="footnote">© 2026 SunriseFM Suriname. Alle rechten voorbehouden.</footer>
    </main>
  );
}

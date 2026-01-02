"use client";

import { useEffect, useRef, useState } from "react";

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
      <div className="hero">
        <p className="eyebrow">Radio SunriseFm • Suriname</p>
        <h1>Coming soon</h1>
        <p className="lede">
          We zetten de studio klaar voor een frisse stream met hits, nieuws en community. Binnenkort
          zijn we live; houd deze pagina in de gaten.
        </p>

        <div className="chips">
          <span className="chip">24/7 hits</span>
          <span className="chip">Surinaamse vibes</span>
          <span className="chip">Online stream</span>
        </div>

        <div className="actions">
          <span className="pill">Blijf luisteren, we zijn zo live.</span>
        </div>

        <div className="player">
          <p className="label">Luister live</p>
          <audio ref={audioRef} preload="none" crossOrigin="anonymous">
            <source src={STREAM_URL} type="audio/mpeg" />
            Je browser ondersteunt geen audio tag.
          </audio>
          <div className="controls">
            <button className="control" onClick={isPlaying ? pause : play}>
              {isPlaying ? "Pause" : "Play"}
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
          <p className="hint">Werkt de stream niet? Vernieuw de pagina of probeer later opnieuw.</p>
          {error ? <p className="hint" aria-live="polite">{error}</p> : null}
        </div>
      </div>

      <footer className="footnote">© 2026 Radio SunriseFm Suriname. Alle rechten voorbehouden.</footer>
    </main>
  );
}

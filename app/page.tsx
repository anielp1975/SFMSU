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
      <section className="hero" id="top">
        <div className="hero__content">
          <div className="hero__brand">
            <img
              src="https://sunrisefmsuriname.com/logo/sfmsulogo1.png"
              alt="SunriseFM Suriname logo"
              className="logo"
            />
            <div>
              <p className="eyebrow">SunriseFM Suriname · 100.1 FM</p>
              <h1>De kleurrijke sound van Suriname</h1>
              <p className="lede">
                Te beluisteren in Suriname op 100.1 FM en wereldwijd via sunrisefmsuriname.com,
                TuneIn en onze mobiele apps voor iOS en Android.
              </p>
              <div className="hero__actions">
                <a className="button primary" href="#player">Luister live</a>
                <a className="button ghost" href="#contact">Contact</a>
              </div>
            </div>
          </div>

          <div className="hero__grid">
            <div className="stat">
              <p className="stat__label">Frequentie</p>
              <p className="stat__value">100.1 FM</p>
              <p className="stat__hint">Suriname</p>
            </div>
            <div className="stat">
              <p className="stat__label">Wereldwijd</p>
              <p className="stat__value">Online stream</p>
              <p className="stat__hint">sunrisefmsuriname.com</p>
            </div>
            <div className="stat">
              <p className="stat__label">Apps</p>
              <p className="stat__value">iOS & Android</p>
              <p className="stat__hint">Altijd bij je</p>
            </div>
            <div className="stat">
              <p className="stat__label">TuneIn</p>
              <p className="stat__value">SunriseFM</p>
              <p className="stat__hint">Luister wereldwijd</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section card player-card" id="player">
        <div className="section__header">
          <p className="eyebrow">Live stream</p>
          <h2>Luister nu naar SunriseFM</h2>
          <p className="section__lede">24/7 hits, nieuws en community vanuit Paramaribo.</p>
        </div>

        <div className="player">
          <audio ref={audioRef} preload="none" crossOrigin="anonymous">
            <source src={STREAM_URL} type="audio/mpeg" />
            Je browser ondersteunt geen audio tag.
          </audio>

          <div className="player__controls">
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
            <span className="live-dot" aria-hidden /> Live vanuit Suriname · Werkt het niet? Vernieuw de pagina of
            probeer later opnieuw.
          </div>
          {error ? <p className="hint" aria-live="polite">{error}</p> : null}
        </div>
      </section>

      <section className="section grid">
        <div className="card info">
          <p className="eyebrow">Bereik</p>
          <h3>Altijd in de lucht</h3>
          <p>
            SunriseFM is in Suriname te horen op <strong>100.1 FM</strong>. Buiten Suriname luister je live via
            <strong> sunrisefmsuriname.com</strong>, TuneIn en onze mobiele apps.
          </p>
        </div>

        <div className="card info">
          <p className="eyebrow">Platforms</p>
          <h3>Overal bereikbaar</h3>
          <ul className="list">
            <li>Website: sunrisefmsuriname.com</li>
            <li>TuneIn: SunriseFM Suriname</li>
            <li>iOS & Android apps</li>
            <li>Smartphones, tablets en desktop</li>
          </ul>
        </div>

        <div className="card info">
          <p className="eyebrow">Sfeer</p>
          <h3>Surinaamse vibes</h3>
          <p>
            Een mix van hits, nieuws, talk en community. We brengen de energie van Suriname naar je speakers, waar je
            ook bent.
          </p>
        </div>
      </section>

      <section className="section card contact" id="contact">
        <div className="section__header">
          <p className="eyebrow">Contact</p>
          <h2>Neem contact op</h2>
          <p className="section__lede">Studio en kantoor in Paramaribo / Livorno.</p>
        </div>
        <div className="contact__grid">
          <div>
            <p className="contact__label">Adres</p>
            <p>Pandit Paltan Tewarieweg 37</p>
            <p>Paramaribo / Livorno</p>
          </div>
          <div>
            <p className="contact__label">Telefoon</p>
            <p>+597 482650</p>
            <p>+597 8820065</p>
          </div>
          <div>
            <p className="contact__label">Luister</p>
            <p>100.1 FM (Suriname)</p>
            <p>www.sunrisefmsuriname.com</p>
            <p>TuneIn · iOS · Android</p>
          </div>
        </div>
      </section>

      <footer className="footnote">© 2026 SunriseFM Suriname. Alle rechten voorbehouden.</footer>
    </main>
  );
}

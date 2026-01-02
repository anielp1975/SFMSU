export default function HomePage() {
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
          <audio controls preload="none">
            <source src="http://72.62.151.219/listen/sunrisefm_suriname/radio.mp3" type="audio/mpeg" />
            Je browser ondersteunt geen audio tag.
          </audio>
          <p className="hint">Werkt de stream niet? Vernieuw de pagina of probeer later opnieuw.</p>
        </div>
      </div>

      <footer className="footnote">© 2026 Radio SunriseFm Suriname. Alle rechten voorbehouden.</footer>
    </main>
  );
}

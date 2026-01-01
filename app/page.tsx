import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="card">
        <p className="eyebrow">Next.js op Hostinger</p>
        <h1>Welkom bij SFMSU</h1>
        <p className="lede">
          Je app draait op het moderne Next.js framework. Pas deze pagina aan,
          deploy naar Hostinger en je staat meteen live.
        </p>
        <div className="actions">
          <Link href="https://vercel.com/docs" target="_blank" className="button primary">
            Handleiding Next.js
          </Link>
          <Link href="https://www.hostinger.nl/tutorials" target="_blank" className="button ghost">
            Hostinger tips
          </Link>
        </div>
      </div>
      <footer>
        Klaar voor productie? Run <span className="code">npm run build</span> en upload de output.
      </footer>
    </main>
  );
}

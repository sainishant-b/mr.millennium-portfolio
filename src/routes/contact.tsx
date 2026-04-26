import { Link, createFileRoute } from "@tanstack/react-router";
import { GridScanBackground } from "../components/GridScanBackground";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mr. Millennium" },
      { name: "description", content: "Book Mr. Millennium for clubs, festivals, visual sets, and private events." },
      { property: "og:title", content: "Contact — Mr. Millennium" },
      { property: "og:description", content: "Booking and social links for Mr. Millennium." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground sm:px-8">
      <GridScanBackground />
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <Link to="/" className="font-display text-xs text-accent">
          MR.MILLENNIUM
        </Link>
        <Link to="/work" className="font-display text-[0.65rem] transition hover:text-accent">
          WORK
        </Link>
      </nav>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-5 font-display text-[0.65rem] text-accent">BOOKING LINE OPEN</p>
          <h1 className="pixel-title text-4xl leading-[1.3] sm:text-6xl">MR. MILLENNIUM / BOOKINGS</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
            Available for clubs, festivals, private parties, brand launches, and custom live visual sets.
          </p>
        </div>

        <div className="pixel-panel p-6 sm:p-8">
          <div className="space-y-5">
            <a className="pixel-button w-full px-6 py-5" href="mailto:booking@mrmillennium.com">
              booking@mrmillennium.com
            </a>
            <a className="pixel-button secondary w-full px-6 py-5" href="https://open.spotify.com" target="_blank" rel="noreferrer">
              Spotify
            </a>
            <a className="pixel-button secondary w-full px-6 py-5" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div className="mt-8 grid grid-cols-8 gap-1" aria-hidden="true">
            {Array.from({ length: 64 }).map((_, index) => (
              <span key={index} className={index % 5 === 0 || index % 7 === 0 ? "h-4 bg-accent" : "h-4 bg-muted"} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

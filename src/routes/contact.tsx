import { Link, createFileRoute } from "@tanstack/react-router";

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

const instagramUrl = "https://www.instagram.com/faceofmillennium?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const spotifyUrl = "https://open.spotify.com/artist/6KB8jy3ACCfQn1BOR90Stq";

function ContactPage() {
  return (
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background px-4 py-5 text-foreground sm:px-8 sm:py-6">
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <Link to="/" className="font-display text-xs text-accent">
          MR.MILLENNIUM
        </Link>
        <Link to="/work" className="font-display text-[0.65rem] transition hover:text-accent">
          WORK
        </Link>
      </nav>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-5 font-display text-[0.65rem] text-accent">BOOKING LINE OPEN</p>
          <h1 className="pixel-title text-[1.75rem] leading-[1.45] sm:text-6xl sm:leading-[1.3]">MR. MILLENNIUM / BOOKINGS</h1>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
            Available for clubs, festivals, private parties, brand launches, and custom live visual sets.
          </p>
        </div>

        <div className="pixel-panel p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-5">
            <a className="pixel-button w-full px-6 py-5" href="mailto:booking@mrmillennium.com">
              booking@mrmillennium.com
            </a>
            <a className="pixel-button secondary w-full px-6 py-5" href={spotifyUrl} target="_blank" rel="noreferrer">
              Spotify
            </a>
            <a className="pixel-button secondary w-full px-6 py-5" href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div className="mt-6 grid grid-cols-8 gap-1 sm:mt-8" aria-hidden="true">
            {Array.from({ length: 64 }).map((_, index) => (
              <span key={index} className={index % 5 === 0 || index % 7 === 0 ? "h-3 bg-accent sm:h-4" : "h-3 bg-muted sm:h-4"} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

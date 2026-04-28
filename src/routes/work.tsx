import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Mr. Millennium" },
      { name: "description", content: "Mr. Millennium work page featuring sets, releases, visuals, Spotify, and Instagram links." },
      { property: "og:title", content: "Work — Mr. Millennium" },
      { property: "og:description", content: "Explore mixes, releases, live visuals, Spotify, and Instagram." },
    ],
  }),
  component: WorkPage,
});

const projects = [
  { title: "Millennium Mix", tag: "Spotify Set", detail: "140 BPM breaks, electro bass, and neon-edged hooks." },
  { title: "Red Signal Session", tag: "Live Visuals", detail: "Pixel-reactive visual loops for warehouse lighting rigs." },
  { title: "Midnight Edits", tag: "Remixes", detail: "Club edits built from vintage synth stabs and drum machines." },
];

const instagramUrl = "https://www.instagram.com/faceofmillennium?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const spotifyUrl = "https://open.spotify.com/artist/6KB8jy3ACCfQn1BOR90Stq";

function WorkPage() {
  return (
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background px-4 py-5 text-foreground sm:px-8 sm:py-6">
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <Link to="/" className="font-display text-xs text-accent">
          MR.MILLENNIUM
        </Link>
        <Link to="/contact" className="font-display text-[0.65rem] transition hover:text-accent">
          CONTACT
        </Link>
      </nav>

      <section className="relative z-10 mx-auto w-full max-w-6xl py-12 sm:py-16">
        <p className="mb-5 font-display text-[0.65rem] text-accent">SELECT SET</p>
        <h1 className="pixel-title max-w-4xl text-[1.75rem] leading-[1.45] sm:text-6xl sm:leading-[1.3]">MR. MILLENNIUM / MIXES / VISUALS</h1>
        <div className="mt-9 grid gap-5 sm:mt-12 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="pixel-panel p-5 transition hover:-translate-y-1 hover:shadow-red sm:p-6">
              <p className="font-display text-[0.58rem] text-accent">{project.tag}</p>
              <h2 className="mt-5 font-display text-base leading-8 sm:text-lg">{project.title}</h2>
              <p className="mt-4 text-[0.95rem] leading-7 text-muted-foreground sm:text-base">{project.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2">
          <a className="pixel-button px-6 py-5" href={spotifyUrl} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a className="pixel-button secondary px-6 py-5" href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>
    </main>
  );
}

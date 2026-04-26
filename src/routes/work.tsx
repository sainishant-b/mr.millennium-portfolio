import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — 8-Bit DJ Portfolio" },
      { name: "description", content: "DJ work page featuring sets, releases, visuals, Spotify, and Instagram links." },
      { property: "og:title", content: "Work — 8-Bit DJ Portfolio" },
      { property: "og:description", content: "Explore mixes, releases, arcade visuals, Spotify, and Instagram." },
    ],
  }),
  component: WorkPage,
});

const projects = [
  { title: "Boss Level Mix", tag: "Spotify Set", detail: "140 BPM breaks, electro bass, and chip-tone hooks." },
  { title: "Red Screen Rave", tag: "Live Visuals", detail: "Pixel-reactive stage loops for warehouse lighting rigs." },
  { title: "Coin-Op Edits", tag: "Remixes", detail: "Club edits built from vintage console stabs and drum machines." },
];

function WorkPage() {
  return (
    <main className="scanline-mask min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <Link to="/" className="font-display text-xs text-accent">
          DJ_8BIT.EXE
        </Link>
        <Link to="/contact" className="font-display text-[0.65rem] transition hover:text-accent">
          CONTACT
        </Link>
      </nav>

      <section className="mx-auto w-full max-w-6xl py-16">
        <p className="mb-5 font-display text-[0.65rem] text-accent">SELECT STAGE</p>
        <h1 className="pixel-title max-w-4xl text-4xl leading-[1.3] sm:text-6xl">WORK / MIXES / VISUALS</h1>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="pixel-panel p-6 transition hover:-translate-y-1 hover:shadow-red">
              <p className="font-display text-[0.58rem] text-accent">{project.tag}</p>
              <h2 className="mt-5 font-display text-lg leading-8">{project.title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{project.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <a className="pixel-button px-6 py-5" href="https://open.spotify.com" target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a className="pixel-button secondary px-6 py-5" href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>
    </main>
  );
}

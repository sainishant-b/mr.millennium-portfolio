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

const mixes = [
  {
    title: "Dallas Local Opener",
    tag: "LIVE MIX",
    detail: "Martin Garrix Americas Tour opener.",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-669026416/dallas-local-opener-mr-millennium-mix-martin-garrix-americas-tour&color=%23e05a2b&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
  },
  {
    title: "Tech Shanti",
    tag: "REMIX",
    detail: "Mr. Millennium remix.",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-669026416/tech-shanti-mr-millennium-remix&color=%23e05a2b&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
  },
];

const instagramUrl = "https://www.instagram.com/faceofmillennium?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const spotifyUrl = "https://open.spotify.com/artist/6KB8jy3ACCfQn1BOR90Stq";
const soundcloudUrl = "https://soundcloud.com/user-669026416";
const youtubeUrl = "https://youtube.com/@faceofmillennium";
const SPOTIFY_ARTIST_ID = "6KB8jy3ACCfQn1BOR90Stq";

function WorkPage() {
  return (
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background px-4 py-5 text-foreground sm:px-8 sm:py-6">
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <Link to="/" className="font-display text-xs text-accent sm:text-sm">
          MR.MILLENNIUM
        </Link>
        <div className="flex items-center gap-3 font-display text-[0.62rem] sm:gap-5 sm:text-xs">
          <Link to="/contact" className="transition hover:text-accent">
            CONTACT
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto w-full max-w-6xl py-10 sm:py-16 space-y-12 sm:space-y-16">

        {/* Mixes */}
        <div>
          <p className="mb-4 font-display text-[0.65rem] text-accent">SELECT SET</p>
          <h1 className="pixel-title max-w-4xl text-[1.75rem] leading-[1.45] sm:text-6xl sm:leading-[1.3]">
            MR. MILLENNIUM
            <br />
            <span className="text-accent">/ MIXES / VISUALS</span>
          </h1>
          <div className="mt-8 grid gap-5 sm:mt-12 lg:grid-cols-2">
            {mixes.map((mix) => (
              <article key={mix.title} className="pixel-panel p-4 sm:p-6 flex flex-col gap-4">
                <div>
                  <p className="font-display text-[0.58rem] text-accent">{mix.tag}</p>
                  <h2 className="mt-3 font-display text-sm leading-7 sm:text-base">{mix.title}</h2>
                  <p className="mt-2 text-[0.9rem] leading-7 text-muted-foreground">{mix.detail}</p>
                </div>
                <iframe
                  title={mix.title}
                  width="100%"
                  height="120"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={mix.embedUrl}
                  className="w-full"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>

        {/* Spotify */}
        <div>
          <p className="mb-4 font-display text-[0.65rem] text-accent">LISTEN</p>
          <h2 className="pixel-title mb-5 text-2xl sm:text-4xl">ON SPOTIFY</h2>
          <div className="pixel-panel overflow-hidden p-0">
            <iframe
              title="Mr. Millennium on Spotify"
              src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>

        {/* SoundCloud */}
        <div>
          <p className="mb-4 font-display text-[0.65rem] text-accent">STREAM</p>
          <h2 className="pixel-title mb-5 text-2xl sm:text-4xl">ON SOUNDCLOUD</h2>
          <div className="pixel-panel overflow-hidden p-0">
            <iframe
              title="Mr. Millennium on SoundCloud"
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-669026416&color=%23e05a2b&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              loading="lazy"
            />
          </div>
        </div>

        {/* YouTube */}
        <div>
          <p className="mb-4 font-display text-[0.65rem] text-accent">WATCH</p>
          <h2 className="pixel-title mb-5 text-2xl sm:text-4xl">ON YOUTUBE</h2>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="pixel-panel flex flex-col items-center justify-center gap-4 py-16 sm:py-24 transition hover:-translate-y-1 hover:shadow-red cursor-pointer group"
          >
            <span className="font-display text-[0.65rem] text-accent group-hover:animate-pulse">▶ WATCH ON YOUTUBE</span>
            <span className="font-display text-xs text-muted-foreground">@faceofmillennium</span>
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <a className="pixel-button px-4 py-4 text-center sm:px-6 sm:py-5" href={spotifyUrl} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a className="pixel-button px-4 py-4 text-center sm:px-6 sm:py-5" href={soundcloudUrl} target="_blank" rel="noreferrer">
            SoundCloud
          </a>
          <a className="pixel-button px-4 py-4 text-center sm:px-6 sm:py-5" href={youtubeUrl} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a className="pixel-button px-4 py-4 text-center sm:px-6 sm:py-5" href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>

      </section>
    </main>
  );
}

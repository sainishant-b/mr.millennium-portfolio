import { Link, createFileRoute } from "@tanstack/react-router";
import djPortrait from "../assets/dj-ascii-art.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "8-Bit DJ Portfolio" },
      {
        name: "description",
        content: "Retro 8-bit DJ portfolio with mixes, live visuals, Spotify, Instagram, and contact details.",
      },
      { property: "og:title", content: "8-Bit DJ Portfolio" },
      {
        property: "og:description",
        content: "A pixel-powered portfolio for a DJ blending arcade nostalgia with heavy club energy.",
      },
    ],
  }),
  component: Index,
});

const gallery = ["LIVE SET", "NIGHT DRIVE", "WAREHOUSE", "CHIP BREAK"];

function Index() {
  return (
    <main className="scanline-mask min-h-screen bg-background text-foreground">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="font-display text-xs text-accent sm:text-sm">
          DJ_8BIT.EXE
        </Link>
        <div className="flex items-center gap-3 font-display text-[0.62rem] sm:gap-5 sm:text-xs">
          <Link to="/work" className="transition hover:text-accent">
            WORK
          </Link>
          <Link to="/contact" className="transition hover:text-accent">
            CONTACT
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[1fr_0.82fr]">
        <div className="space-y-8">
          <div className="inline-flex border border-border bg-muted px-3 py-2 font-display text-[0.58rem] text-muted-foreground">
            INSERT COIN // PRESS PLAY
          </div>
          <div className="space-y-5">
            <h1 className="pixel-title max-w-4xl text-4xl leading-[1.25] sm:text-6xl lg:text-7xl">
              DJ
              <br /> PIXEL
              <br /> VOLT
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Bass-heavy club sets, glitch visuals, and arcade-damaged edits built for sweaty late-night rooms.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/work" className="pixel-button px-6 py-4">
              View Work
            </Link>
            <Link to="/contact" className="pixel-button secondary px-6 py-4">
              Book DJ
            </Link>
          </div>

          <div className="sound-bars flex h-16 items-end gap-2" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((bar) => (
              <span key={bar} className="block h-14 w-5 bg-accent" />
            ))}
          </div>
        </div>

        <div className="pixel-panel relative mx-auto w-full max-w-md overflow-hidden p-3">
          <img
            src={djPortrait}
            alt="Purple 8-bit styled DJ portrait"
            className="aspect-[3/4] w-full object-cover grayscale-[20%] contrast-125"
          />
          <div className="absolute left-6 top-6 bg-accent px-3 py-2 font-display text-[0.55rem] text-accent-foreground">
            SIGNAL FOUND
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-4">
        {gallery.map((item, index) => (
          <div key={item} className="pixel-panel min-h-40 p-4 transition hover:-translate-y-1 hover:shadow-red">
            <div className="mb-8 flex justify-between font-display text-[0.55rem] text-accent">
              <span>0{index + 1}</span>
              <span>IMG SLOT</span>
            </div>
            <div className="grid h-20 grid-cols-5 gap-1">
              {Array.from({ length: 20 }).map((_, pixel) => (
                <span
                  key={pixel}
                  className={pixel % (index + 2) === 0 ? "bg-accent" : "bg-pixel-soft/40"}
                />
              ))}
            </div>
            <p className="mt-4 font-display text-[0.58rem]">{item}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ParticleTextEffect } from "../components/ui/particle-text-effect";
import TetrisLoading from "../components/ui/tetris-loader";
import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";
import photo4 from "../assets/photo4.webp";
import photo5 from "../assets/photo5.webp";
import photo6 from "../assets/photo6.webp";
import asciiVideo from "../assets/ascii-art.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mr. Millennium Portfolio" },
      {
        name: "description",
        content: "Mr. Millennium DJ portfolio with mixes, live visuals, Spotify, Instagram, and contact details.",
      },
      { property: "og:title", content: "Mr. Millennium Portfolio" },
      {
        property: "og:description",
        content: "A pixel-powered portfolio for Mr. Millennium blending retro visuals with heavy club energy.",
      },
    ],
  }),
  component: Index,
});

const gallery = [photo1, photo2, photo3, photo4, photo5, photo6];

const marqueeItems = [
  "BASS HEAVY",
  "GLITCH VISUALS",
  "WAREHOUSE READY",
  "FUTURE RETRO",
  "140 BPM",
  "LATE NIGHT",
  "CLUB EDITS",
  "BOOK NOW",
];

const SPOTIFY_ARTIST_ID = "6KB8jy3ACCfQn1BOR90Stq";

type AppState = "loading" | "start" | "main";

function Index() {
  const [appState, setAppState] = useState<AppState>("loading");
  const [loadingFading, setLoadingFading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showHeroGif, setShowHeroGif] = useState(false);

  useEffect(() => {
    if (appState !== "main") return;
    const t = setTimeout(() => setShowHeroGif(true), 4000);
    return () => clearTimeout(t);
  }, [appState]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoadingFading(true), 1200);
    const startTimer = setTimeout(() => setAppState("start"), 1600);
    return () => { clearTimeout(fadeTimer); clearTimeout(startTimer); };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
      else if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  return (
    <>
      {appState === "loading" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${loadingFading ? "opacity-0" : "opacity-100"}`}
        >
          <p className="mb-6 font-display text-[0.6rem] text-muted-foreground tracking-widest">LOADING SIGNAL...</p>
          <TetrisLoading size="lg" speed="fast" showLoadingText={false} />
          <p className="mt-6 font-display text-[0.55rem] text-accent animate-pulse">MR. MILLENNIUM</p>
        </div>
      )}

      {appState === "start" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background animate-in fade-in duration-500">
          <button
            onClick={() => setAppState("main")}
            className="pixel-button px-10 py-6 text-lg sm:text-xl shadow-[5px_5px_0_oklch(0.04_0.004_255),0_0_28px_oklch(0.45_0.19_28.5/55%)] hover:shadow-[8px_8px_0_oklch(0.04_0.004_255),0_0_40px_oklch(0.45_0.19_28.5/70%)]"
          >
            PRESS START
          </button>
        </div>
      )}

      {appState === "main" && (
        <main className="scanline-mask relative min-h-screen overflow-hidden bg-background text-foreground animate-in fade-in duration-700">
          
          <div className="relative flex flex-col min-h-[100svh] w-full">
            <div
              className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${showHeroGif ? "opacity-40" : "opacity-0"}`}
              aria-hidden="true"
            >
              <video
                src={asciiVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            {/* Particle text hero — absolute background covering header and hero */}
            <div className="absolute inset-0 z-[1] pointer-events-auto">
              <ParticleTextEffect
                words={["Mr.Millennium"]}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5 pointer-events-auto">
              <Link to="/" className="font-display text-xs text-accent sm:text-sm">
                MR.MILLENNIUM
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

            <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-4 pb-12 pt-4 sm:px-8 sm:pb-16 pointer-events-none">
              <div className="w-full">
                <Link to="/play" className="inline-flex border border-accent/60 bg-muted px-3 py-2 font-display text-[0.58rem] text-muted-foreground pointer-events-auto transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_16px_oklch(0.45_0.19_28.5/40%)] cursor-pointer group">
                  SIGNAL LIVE //<span className="ml-1 group-hover:animate-pulse"> PRESS PLAY ▶</span>
                </Link>
              </div>

              <div className="w-full space-y-6 sm:space-y-8 mt-auto pointer-events-auto">
                <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Bass-heavy club sets, glitch visuals, and future-retro edits built for sweaty late-night rooms.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link to="/work" className="pixel-button px-6 py-4">
                    View Work
                  </Link>
                  <Link to="/contact" className="pixel-button secondary px-6 py-4">
                    Book Mr. Millennium
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <section
            aria-label="ticker"
            className="relative z-10 w-full overflow-hidden border-y border-accent/40 bg-muted/40 py-3 pointer-events-auto"
          >
            <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-[0.7rem] text-accent sm:text-sm">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="flex items-center gap-10">
                  <span>{item}</span>
                  <span className="text-muted-foreground">//</span>
                </span>
              ))}
            </div>
          </section>

          <section className="relative z-10 w-full pb-0 bg-background pointer-events-auto">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.slice(0, 3).map((photo, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="pixel-panel overflow-hidden p-0 group cursor-pointer text-left"
              aria-label={`Open photo ${index + 1}`}
            >
              <div className="relative h-[62vh] min-h-[24rem] lg:h-[80vh] bg-muted [transform:translateZ(0)] [contain:layout_paint]">
                <img
                  src={photo}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[15%] contrast-110 transition-transform duration-500 group-hover:scale-105 [transform:translateZ(0)]"
                />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.slice(3).map((photo, index) => (
            <button
              type="button"
              key={index + 3}
              onClick={() => setLightboxIndex(index + 3)}
              className="pixel-panel overflow-hidden p-0 group cursor-pointer text-left"
              aria-label={`Open photo ${index + 4}`}
            >
              <div className="relative h-[62vh] min-h-[24rem] lg:h-[80vh] bg-muted [transform:translateZ(0)] [contain:layout_paint]">
                <img
                  src={photo}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[15%] contrast-110 transition-transform duration-500 group-hover:scale-105 [transform:translateZ(0)]"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-16 pointer-events-auto">
        <p className="mb-5 font-display text-[0.65rem] text-accent">LISTEN</p>
        <h2 className="pixel-title mb-6 text-2xl sm:text-4xl">ON SPOTIFY</h2>
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
      </section>
    </main>
    )}

    {lightboxIndex !== null && (
      <div
        role="dialog"
        aria-modal="true"
        onClick={() => setLightboxIndex(null)}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-200"
      >
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 font-display text-xs text-accent border border-accent/60 px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
        >
          CLOSE [ESC]
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)); }}
          aria-label="Previous"
          className="absolute left-3 sm:left-6 font-display text-2xl text-accent border border-accent/60 px-4 py-3 hover:bg-accent hover:text-accent-foreground transition"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length)); }}
          aria-label="Next"
          className="absolute right-3 sm:right-6 font-display text-2xl text-accent border border-accent/60 px-4 py-3 hover:bg-accent hover:text-accent-foreground transition"
        >
          ▶
        </button>
        <img
          src={gallery[lightboxIndex]}
          alt=""
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] max-w-[92vw] object-contain shadow-[0_0_40px_oklch(0.45_0.19_28.5/40%)]"
        />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-[0.65rem] text-accent">
          0{lightboxIndex + 1} / 0{gallery.length}
        </span>
      </div>
    )}
    </>
  );
}

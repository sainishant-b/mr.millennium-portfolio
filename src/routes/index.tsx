import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ParticleTextEffect } from "../components/ui/particle-text-effect";
import TetrisLoading from "../components/ui/tetris-loader";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";

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

const gallery = [
  { label: "LIVE SET", photo: photo1 },
  { label: "NIGHT DRIVE", photo: photo2 },
  { label: "WAREHOUSE", photo: photo3 },
  { label: "AFTERHOURS", photo: photo4 },
  { label: "CROWD", photo: photo5 },
];

type AppState = "loading" | "start" | "main";

function Index() {
  const [appState, setAppState] = useState<AppState>("loading");
  const [loadingFading, setLoadingFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoadingFading(true), 2800);
    const startTimer = setTimeout(() => setAppState("start"), 3300);
    return () => { clearTimeout(fadeTimer); clearTimeout(startTimer); };
  }, []);

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
            className="pixel-button px-10 py-6 text-lg sm:text-xl"
          >
            START
          </button>
        </div>
      )}

      {appState === "main" && (
        <main className="scanline-mask relative min-h-screen overflow-hidden bg-background text-foreground animate-in fade-in duration-700">
          
          <div className="relative flex flex-col min-h-[100svh] w-full">
            {/* Particle text hero — absolute background covering header and hero */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
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

          <section className="relative z-10 w-full pb-0 bg-background pointer-events-auto">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.slice(0, 3).map(({ label, photo }, index) => (
            <div key={label} className="pixel-panel overflow-hidden p-0 group cursor-pointer">
              <div className="relative h-[62vh] min-h-[24rem] lg:h-[80vh]">
                <img
                  src={photo}
                  alt={label}
                  className="w-full h-full object-cover grayscale-[15%] contrast-110 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent px-5 py-4 flex justify-between items-end">
                  <span className="font-display text-xs text-accent">0{index + 1}</span>
                  <span className="font-display text-xs">{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {gallery.slice(3).map(({ label, photo }, index) => (
            <div key={label} className="pixel-panel overflow-hidden p-0 group cursor-pointer">
              <div className="relative h-[62vh] min-h-[24rem] lg:h-[80vh]">
                <img
                  src={photo}
                  alt={label}
                  className="w-full h-full object-cover grayscale-[15%] contrast-110 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent px-5 py-4 flex justify-between items-end">
                  <span className="font-display text-xs text-accent">0{index + 4}</span>
                  <span className="font-display text-xs">{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    )}
    </>
  );
}

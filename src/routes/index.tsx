import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { GridScanBackground } from "../components/GridScanBackground";
import TetrisLoading from "../components/ui/tetris-loader";
import djPortrait from "../assets/dj-ascii-art.png";
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

function Index() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2800);
    const hideTimer = setTimeout(() => setGone(true), 3300);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      {!gone && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <p className="mb-6 font-display text-[0.6rem] text-muted-foreground tracking-widest">LOADING SIGNAL...</p>
          <TetrisLoading size="lg" speed="fast" showLoadingText={false} />
          <p className="mt-6 font-display text-[0.55rem] text-accent animate-pulse">MR. MILLENNIUM</p>
        </div>
      )}
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background text-foreground">
      <GridScanBackground />
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
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

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pb-12 pt-4 sm:min-h-[calc(100vh-5rem)] sm:px-8 sm:pb-16 lg:grid-cols-[1fr_0.82fr]">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex border border-border bg-muted px-3 py-2 font-display text-[0.58rem] text-muted-foreground">
            SIGNAL LIVE // PRESS PLAY
          </div>
          <div className="space-y-5">
            <h1 className="pixel-title max-w-4xl text-[2rem] leading-[1.32] sm:text-6xl lg:text-7xl">
              MR.
              <br /> MILLENNIUM
            </h1>
            <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Bass-heavy club sets, glitch visuals, and future-retro edits built for sweaty late-night rooms.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/work" className="pixel-button px-6 py-4">
              View Work
            </Link>
            <Link to="/contact" className="pixel-button secondary px-6 py-4">
              Book Mr. Millennium
            </Link>
          </div>

        </div>

        <div className="pixel-panel relative mx-auto w-full max-w-[19rem] overflow-hidden p-2 sm:max-w-md sm:p-3">
          <img
            src={djPortrait}
            alt="Purple 8-bit styled DJ portrait"
            className="aspect-[4/5] w-full object-cover grayscale-[20%] contrast-125 sm:aspect-[3/4]"
          />
          <div className="absolute left-4 top-4 bg-accent px-2 py-1.5 font-display text-[0.48rem] text-accent-foreground sm:left-6 sm:top-6 sm:px-3 sm:py-2 sm:text-[0.55rem]">
            MR. MILLENNIUM
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full pb-0">
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
    </>
  );
}

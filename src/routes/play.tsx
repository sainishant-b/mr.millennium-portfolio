import { useState, useEffect } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import TetrisGame, { type GamePhase } from "../components/ui/tetris-game"

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "TETRIS // Mr. Millennium" },
      {
        name: "description",
        content: "Play a retro Tetris game in Mr. Millennium's pixel-powered arcade.",
      },
    ],
  }),
  component: PlayPage,
})

function PlayPage() {
  const [phase, setPhase] = useState<GamePhase>("instructions")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const touch = window.matchMedia("(pointer: coarse)").matches
      const narrow = window.innerWidth < 768
      setIsMobile(touch || narrow)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <main className="scanline-mask relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Nav */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="font-display text-xs text-accent sm:text-sm">
          MR.MILLENNIUM
        </Link>
        <div className="flex items-center gap-3 font-display text-[0.62rem] sm:gap-5 sm:text-xs">
          <Link to="/" className="transition hover:text-accent">
            ← BACK
          </Link>
        </div>
      </nav>

      {/* Instructions screen */}
      {phase === "instructions" && (
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 pt-8 sm:pt-16 animate-in fade-in duration-500">
          <h1 className="pixel-title text-2xl sm:text-3xl mb-8 text-center">TETRIS</h1>

          <div className="pixel-panel p-6 sm:p-8 w-full max-w-md mb-8">
            <p className="font-display text-[0.6rem] text-accent mb-5 tracking-widest">
              {isMobile ? "TOUCH CONTROLS" : "KEYBOARD CONTROLS"}
            </p>

            {isMobile ? (
              <div className="space-y-3 text-[0.72rem] text-muted-foreground leading-6">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Move</span>
                  <span>Swipe ← →</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Soft Drop</span>
                  <span>Swipe ↓</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Hard Drop</span>
                  <span>Swipe ↑</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Rotate</span>
                  <span>Tap</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">D-Pad</span>
                  <span>On screen</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-[0.72rem] text-muted-foreground leading-6">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Move</span>
                  <span className="font-display text-[0.55rem]">← →</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Soft Drop</span>
                  <span className="font-display text-[0.55rem]">↓</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Hard Drop</span>
                  <span className="font-display text-[0.55rem]">SPACE</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-foreground">Rotate</span>
                  <span className="font-display text-[0.55rem]">↑</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Pause</span>
                  <span className="font-display text-[0.55rem]">P / ESC</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="font-display text-[0.5rem] text-muted-foreground animate-pulse">
              SIGNAL LOCKED // READY
            </p>
            <button
              onClick={() => setPhase("playing")}
              className="pixel-button px-10 py-5 text-sm sm:text-base shadow-[5px_5px_0_oklch(0.04_0.004_255),0_0_28px_oklch(0.45_0.19_28.5/55%)] hover:shadow-[8px_8px_0_oklch(0.04_0.004_255),0_0_40px_oklch(0.45_0.19_28.5/70%)]"
            >
              PRESS START
            </button>
          </div>
        </div>
      )}

      {/* Game screen */}
      {phase !== "instructions" && (
        <div className="relative z-10 mx-auto flex justify-center px-2 pt-2 sm:px-4 sm:pt-4 animate-in fade-in duration-300">
          <TetrisGame phase={phase} onPhaseChange={setPhase} isMobile={isMobile} />
        </div>
      )}

      {/* Game over back home button */}
      {phase === "gameover" && (
        <div className="relative z-10 flex justify-center mt-6 pb-8 animate-in fade-in duration-500">
          <Link to="/" className="pixel-button secondary px-6 py-3 text-xs">
            BACK TO HOME
          </Link>
        </div>
      )}
    </main>
  )
}

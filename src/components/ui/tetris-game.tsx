import { useState, useEffect, useCallback, useRef, useMemo } from "react"

// ── Piece definitions ──────────────────────────────────────────────────
const TETROMINOS = {
  I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: "#00e5ff" },
  O: { shape: [[1,1],[1,1]], color: "#ffd600" },
  T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: "#d500f9" },
  S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: "#00e676" },
  Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: "#ff1744" },
  J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: "#2979ff" },
  L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: "#ff9100" },
} as const

type PieceType = keyof typeof TETROMINOS
const PIECE_TYPES: PieceType[] = ["I","O","T","S","Z","J","L"]

const COLS = 10
const ROWS = 20
const EMPTY_COLOR = ""

// Scoring
const LINE_POINTS = [0, 100, 300, 500, 800]
const LINES_PER_LEVEL = 10
const BASE_SPEED = 800
const MIN_SPEED = 50
const SPEED_DECREASE = 60

// ── Types ──────────────────────────────────────────────────────────────
interface Cell {
  color: string
}

interface Piece {
  type: PieceType
  shape: number[][]
  color: string
  x: number
  y: number
}

export type GamePhase = "instructions" | "playing" | "paused" | "gameover"

// ── Helpers ────────────────────────────────────────────────────────────
function createEmptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ color: EMPTY_COLOR }))
  )
}

function rotate(shape: number[][]): number[][] {
  const N = shape.length
  const M = shape[0].length
  const rotated: number[][] = Array.from({ length: M }, () => Array(N).fill(0))
  for (let r = 0; r < N; r++)
    for (let c = 0; c < M; c++)
      rotated[c][N - 1 - r] = shape[r][c]
  return rotated
}

function randomPieceType(): PieceType {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]
}

function createPiece(type: PieceType): Piece {
  const t = TETROMINOS[type]
  return {
    type,
    shape: t.shape.map(row => [...row]),
    color: t.color,
    x: Math.floor((COLS - t.shape[0].length) / 2),
    y: 0,
  }
}

function fits(grid: Cell[][], piece: Piece, dx: number, dy: number, shape?: number[][]): boolean {
  const s = shape || piece.shape
  for (let r = 0; r < s.length; r++)
    for (let c = 0; c < s[r].length; c++)
      if (s[r][c]) {
        const nx = piece.x + c + dx
        const ny = piece.y + r + dy
        if (nx < 0 || nx >= COLS || ny >= ROWS) return false
        if (ny >= 0 && grid[ny][nx].color !== EMPTY_COLOR) return false
      }
  return true
}

// ── Component ──────────────────────────────────────────────────────────
export interface TetrisGameProps {
  phase: GamePhase
  onPhaseChange: (phase: GamePhase) => void
  isMobile: boolean
}

export default function TetrisGame({ phase, onPhaseChange, isMobile }: TetrisGameProps) {
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid)
  const [current, setCurrent] = useState<Piece | null>(null)
  const [nextType, setNextType] = useState<PieceType>(randomPieceType)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [clearingRows, setClearingRows] = useState<number[]>([])

  const gridRef = useRef(grid)
  const currentRef = useRef(current)
  const phaseRef = useRef(phase)
  const clearingRef = useRef(false)

  gridRef.current = grid
  currentRef.current = current
  phaseRef.current = phase

  const dropSpeed = useMemo(() => Math.max(MIN_SPEED, BASE_SPEED - (level - 1) * SPEED_DECREASE), [level])

  // ── Lock piece onto grid ───────────────────────────────────────────
  const lockPiece = useCallback((p: Piece, g: Cell[][]) => {
    const newGrid = g.map(row => row.map(cell => ({ ...cell })))
    for (let r = 0; r < p.shape.length; r++)
      for (let c = 0; c < p.shape[r].length; c++)
        if (p.shape[r][c]) {
          const ny = p.y + r
          const nx = p.x + c
          if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
            newGrid[ny][nx] = { color: p.color }
          }
        }
    return newGrid
  }, [])

  // ── Clear full rows ────────────────────────────────────────────────
  const clearRows = useCallback((g: Cell[][]): { grid: Cell[][]; cleared: number } => {
    const fullRows: number[] = []
    g.forEach((row, i) => {
      if (row.every(cell => cell.color !== EMPTY_COLOR)) fullRows.push(i)
    })
    if (fullRows.length === 0) return { grid: g, cleared: 0 }

    // Flash animation
    setClearingRows(fullRows)
    clearingRef.current = true

    return { grid: g, cleared: fullRows.length }
  }, [])

  const finishClear = useCallback((g: Cell[][], fullRows: number[]) => {
    const filtered = g.filter((_, i) => !fullRows.includes(i))
    const emptyRows: Cell[][] = Array.from({ length: fullRows.length }, () =>
      Array.from({ length: COLS }, () => ({ color: EMPTY_COLOR }))
    )
    return [...emptyRows, ...filtered]
  }, [])

  // ── Spawn new piece ────────────────────────────────────────────────
  const spawn = useCallback(() => {
    const type = nextType
    const p = createPiece(type)
    setNextType(randomPieceType())
    if (!fits(gridRef.current, p, 0, 0)) {
      // Game over
      onPhaseChange("gameover")
      return
    }
    setCurrent(p)
  }, [nextType, onPhaseChange])

  // ── Move piece ─────────────────────────────────────────────────────
  const movePiece = useCallback((dx: number, dy: number): boolean => {
    const p = currentRef.current
    if (!p || phaseRef.current !== "playing" || clearingRef.current) return false
    if (fits(gridRef.current, p, dx, dy)) {
      setCurrent(prev => prev ? { ...prev, x: prev.x + dx, y: prev.y + dy } : null)
      if (dy > 0) setScore(s => s + 1) // soft drop bonus
      return true
    }
    return false
  }, [])

  const rotatePiece = useCallback(() => {
    const p = currentRef.current
    if (!p || phaseRef.current !== "playing" || clearingRef.current) return
    const rotated = rotate(p.shape)
    // Try basic rotation
    if (fits(gridRef.current, p, 0, 0, rotated)) {
      setCurrent(prev => prev ? { ...prev, shape: rotated } : null)
      return
    }
    // Wall kicks: try offsets
    const kicks = [[-1,0],[1,0],[-2,0],[2,0],[0,-1]]
    for (const [kx, ky] of kicks) {
      if (fits(gridRef.current, p, kx, ky, rotated)) {
        setCurrent(prev => prev ? { ...prev, shape: rotated, x: prev.x + kx, y: prev.y + ky } : null)
        return
      }
    }
  }, [])

  const hardDrop = useCallback(() => {
    const p = currentRef.current
    if (!p || phaseRef.current !== "playing" || clearingRef.current) return
    let dropDist = 0
    while (fits(gridRef.current, p, 0, dropDist + 1)) dropDist++
    const droppedPiece = { ...p, y: p.y + dropDist }
    setScore(s => s + dropDist * 2)
    const newGrid = lockPiece(droppedPiece, gridRef.current)
    const { grid: postGrid, cleared } = clearRows(newGrid)
    setGrid(postGrid)
    if (cleared > 0) {
      // Delay spawn for clear animation
      setTimeout(() => {
        const fullRows: number[] = []
        postGrid.forEach((row, i) => {
          if (row.every(cell => cell.color !== EMPTY_COLOR)) fullRows.push(i)
        })
        const finalGrid = finishClear(postGrid, fullRows)
        setGrid(finalGrid)
        gridRef.current = finalGrid
        setClearingRows([])
        clearingRef.current = false
        setLines(prev => {
          const newLines = prev + cleared
          setLevel(Math.floor(newLines / LINES_PER_LEVEL) + 1)
          return newLines
        })
        setScore(s => s + LINE_POINTS[cleared] * level)
        setCurrent(null)
      }, 300)
    } else {
      setCurrent(null)
    }
  }, [lockPiece, clearRows, finishClear, level])

  // ── Gravity tick ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return
    if (!current) {
      spawn()
      return
    }
    const interval = setInterval(() => {
      if (clearingRef.current) return
      const p = currentRef.current
      if (!p) return
      if (fits(gridRef.current, p, 0, 1)) {
        setCurrent(prev => prev ? { ...prev, y: prev.y + 1 } : null)
      } else {
        // Lock
        const newGrid = lockPiece(p, gridRef.current)
        const { grid: postGrid, cleared } = clearRows(newGrid)
        setGrid(postGrid)
        if (cleared > 0) {
          setTimeout(() => {
            const fullRows: number[] = []
            postGrid.forEach((row, i) => {
              if (row.every(cell => cell.color !== EMPTY_COLOR)) fullRows.push(i)
            })
            const finalGrid = finishClear(postGrid, fullRows)
            setGrid(finalGrid)
            gridRef.current = finalGrid
            setClearingRows([])
            clearingRef.current = false
            setLines(prev => {
              const newLines = prev + cleared
              setLevel(Math.floor(newLines / LINES_PER_LEVEL) + 1)
              return newLines
            })
            setScore(s => s + LINE_POINTS[cleared] * level)
            setCurrent(null)
          }, 300)
        } else {
          setCurrent(null)
        }
      }
    }, dropSpeed)
    return () => clearInterval(interval)
  }, [phase, current, dropSpeed, spawn, lockPiece, clearRows, finishClear, level])

  // ── Keyboard controls ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === "gameover") return
      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        e.preventDefault()
        onPhaseChange(phase === "paused" ? "playing" : "paused")
        return
      }
      if (phase !== "playing") return
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          movePiece(-1, 0)
          break
        case "ArrowRight":
          e.preventDefault()
          movePiece(1, 0)
          break
        case "ArrowDown":
          e.preventDefault()
          movePiece(0, 1)
          break
        case "ArrowUp":
          e.preventDefault()
          rotatePiece()
          break
        case " ":
          e.preventDefault()
          hardDrop()
          break
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [phase, movePiece, rotatePiece, hardDrop, onPhaseChange])

  // ── Touch controls ─────────────────────────────────────────────────
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (phase !== "playing") return
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() }
  }, [phase])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (phase !== "playing" || !touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    const dt = Date.now() - touchStart.current.time
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (absDx < 10 && absDy < 10 && dt < 250) {
      // Tap → rotate
      rotatePiece()
    } else if (absDx > absDy && absDx > 30) {
      movePiece(dx > 0 ? 1 : -1, 0)
    } else if (absDy > absDx && absDy > 30) {
      if (dy < 0) {
        hardDrop()
      } else {
        movePiece(0, 1)
      }
    }
    touchStart.current = null
  }, [phase, movePiece, rotatePiece, hardDrop])

  // ── Restart ────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setGrid(createEmptyGrid())
    setCurrent(null)
    setNextType(randomPieceType())
    setScore(0)
    setLines(0)
    setLevel(1)
    setClearingRows([])
    clearingRef.current = false
    onPhaseChange("playing")
  }, [onPhaseChange])

  // ── Ghost piece (projection) ───────────────────────────────────────
  const ghostY = useMemo(() => {
    if (!current) return 0
    let drop = 0
    while (fits(grid, current, 0, drop + 1)) drop++
    return current.y + drop
  }, [current, grid])

  // ── Render the game grid as an array ───────────────────────────────
  const displayGrid = useMemo(() => {
    const dg = grid.map(row => row.map(cell => ({ ...cell, isGhost: false, isClearing: false })))

    // Mark clearing rows
    clearingRows.forEach(ri => {
      if (ri >= 0 && ri < ROWS) {
        dg[ri].forEach(cell => { cell.isClearing = true })
      }
    })

    // Draw ghost
    if (current && phase === "playing") {
      for (let r = 0; r < current.shape.length; r++)
        for (let c = 0; c < current.shape[r].length; c++)
          if (current.shape[r][c]) {
            const gx = current.x + c
            const gy = ghostY + r
            if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS && dg[gy][gx].color === EMPTY_COLOR) {
              dg[gy][gx] = { color: current.color, isGhost: true, isClearing: false }
            }
          }
    }

    // Draw current piece
    if (current) {
      for (let r = 0; r < current.shape.length; r++)
        for (let c = 0; c < current.shape[r].length; c++)
          if (current.shape[r][c]) {
            const px = current.x + c
            const py = current.y + r
            if (py >= 0 && py < ROWS && px >= 0 && px < COLS) {
              dg[py][px] = { color: current.color, isGhost: false, isClearing: false }
            }
          }
    }

    return dg
  }, [grid, current, ghostY, clearingRows, phase])

  // ── Next piece preview grid ────────────────────────────────────────
  const nextPreview = useMemo(() => {
    const t = TETROMINOS[nextType]
    return t.shape
  }, [nextType])
  const nextColor = TETROMINOS[nextType].color

  // Cell size responsive
  const cellClass = isMobile ? "tetris-cell-sm" : "tetris-cell"

  return (
    <div
      className="tetris-wrapper"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {/* Scoreboard */}
      <div className="tetris-sidebar">
        <div className="tetris-stat-box">
          <span className="tetris-stat-label">SCORE</span>
          <span className="tetris-stat-value">{score.toLocaleString()}</span>
        </div>
        <div className="tetris-stat-box">
          <span className="tetris-stat-label">LEVEL</span>
          <span className="tetris-stat-value">{level}</span>
        </div>
        <div className="tetris-stat-box">
          <span className="tetris-stat-label">LINES</span>
          <span className="tetris-stat-value">{lines}</span>
        </div>
        <div className="tetris-stat-box">
          <span className="tetris-stat-label">NEXT</span>
          <div className="tetris-next-grid">
            {nextPreview.map((row, ri) => (
              <div key={ri} className="flex">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`tetris-cell-preview ${cell ? "" : "empty"}`}
                    style={cell ? { backgroundColor: nextColor } : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game board */}
      <div className="tetris-board pixel-panel">
        {displayGrid.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((cell, ci) => (
              <div
                key={ci}
                className={`${cellClass} ${cell.color !== EMPTY_COLOR ? "filled" : ""} ${cell.isGhost ? "ghost" : ""} ${cell.isClearing ? "clearing" : ""}`}
                style={cell.color !== EMPTY_COLOR && !cell.isGhost ? { backgroundColor: cell.color } : cell.isGhost ? { backgroundColor: cell.color } : undefined}
              />
            ))}
          </div>
        ))}

        {/* Pause overlay */}
        {phase === "paused" && (
          <div className="tetris-overlay">
            <p className="font-display text-lg text-accent">PAUSED</p>
            <button onClick={() => onPhaseChange("playing")} className="pixel-button px-6 py-3 mt-4 text-xs">
              RESUME
            </button>
          </div>
        )}

        {/* Game over overlay */}
        {phase === "gameover" && (
          <div className="tetris-overlay">
            <p className="font-display text-lg text-accent mb-2">GAME OVER</p>
            <p className="font-display text-[0.55rem] text-muted-foreground mb-1">SCORE</p>
            <p className="font-display text-sm text-foreground mb-4">{score.toLocaleString()}</p>
            <div className="flex flex-col gap-3">
              <button onClick={restart} className="pixel-button px-6 py-3 text-xs">
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile controls */}
      {isMobile && phase === "playing" && (
        <div className="tetris-mobile-controls">
          <div className="tetris-dpad">
            <button className="tetris-dpad-btn rotate" onTouchStart={(e) => { e.stopPropagation(); rotatePiece() }} aria-label="Rotate">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            </button>
            <div className="tetris-dpad-row">
              <button className="tetris-dpad-btn" onTouchStart={(e) => { e.stopPropagation(); movePiece(-1, 0) }} aria-label="Left">◀</button>
              <button className="tetris-dpad-btn drop" onTouchStart={(e) => { e.stopPropagation(); hardDrop() }} aria-label="Hard Drop">⬇⬇</button>
              <button className="tetris-dpad-btn" onTouchStart={(e) => { e.stopPropagation(); movePiece(1, 0) }} aria-label="Right">▶</button>
            </div>
            <button className="tetris-dpad-btn" onTouchStart={(e) => { e.stopPropagation(); movePiece(0, 1) }} aria-label="Soft Drop">▼</button>
          </div>
          <button
            className="tetris-pause-btn"
            onClick={() => onPhaseChange("paused")}
            aria-label="Pause"
          >
            ⏸
          </button>
        </div>
      )}
    </div>
  )
}

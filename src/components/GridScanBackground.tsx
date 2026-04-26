import { GridScan } from "./GridScan";

export function GridScanBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-75">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#2F293A"
        scanColor="#B70E0F"
        scanOpacity={0.4}
        gridScale={0.1}
        lineStyle="solid"
        lineJitter={0.1}
        scanDirection="pingpong"
        noiseIntensity={0.01}
        scanGlow={0.5}
        scanSoftness={2}
        scanDuration={2}
        scanDelay={2}
        scanOnClick={false}
      />
    </div>
  );
}
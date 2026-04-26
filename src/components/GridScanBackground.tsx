import { GridScan } from "./GridScan";

export function GridScanBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] opacity-100 [mix-blend-mode:screen]">
      <GridScan
        sensitivity={0.55}
        lineThickness={1.4}
        linesColor="#6B607A"
        scanColor="#B70E0F"
        scanOpacity={0.75}
        gridScale={0.1}
        lineStyle="solid"
        lineJitter={0.1}
        scanDirection="pingpong"
        noiseIntensity={0.02}
        scanGlow={1.2}
        scanSoftness={2}
        scanDuration={2}
        scanDelay={0.25}
        scanOnClick={false}
      />
    </div>
  );
}
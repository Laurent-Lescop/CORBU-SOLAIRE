import type { SimulationResult } from '../core/types';

/** Lightweight SVG scene: keeps the preview available without requiring WebGL. */
const SimulationScene = ({ data }: { data: SimulationResult }) => {
  const scale = 112;
  const wallLeft = 155;
  const floorY = 356;
  const { topLeft, bottomRight } = data.windowCoordinates;
  const windowX = wallLeft + topLeft.x * scale;
  const windowY = floorY - topLeft.z * scale;
  const windowWidth = (bottomRight.x - topLeft.x) * scale;
  const windowHeight = (topLeft.z - bottomRight.z) * scale;
  const sunVisible = data.solarPosition.altitude > 0;
  const spotX = Math.max(210, Math.min(500, wallLeft + data.floorProjection.topLeft.x * 72));
  const spotY = Math.max(360, Math.min(480, 390 + data.floorProjection.topLeft.y * 18));

  return (
    <svg className="room-preview" viewBox="0 0 760 520" role="img" aria-label="Aperçu de la pièce et de la baie vitrée">
      <defs>
        <linearGradient id="room-wall" x2="0" y2="1"><stop stopColor="#34434a"/><stop offset="1" stopColor="#202b30"/></linearGradient>
        <linearGradient id="room-floor" x2="0" y2="1"><stop stopColor="#39464a"/><stop offset="1" stopColor="#1c2529"/></linearGradient>
        <linearGradient id="sun-glass" x2="0" y2="1"><stop stopColor="#f5bc63" stopOpacity=".65"/><stop offset="1" stopColor="#f5bc63" stopOpacity=".06"/></linearGradient>
      </defs>
      <path d="M155 76 L590 76 L650 126 L650 356 L215 356 L155 306 Z" fill="url(#room-wall)" stroke="#64737a" strokeWidth="1.5"/>
      <path d="M155 306 L215 356 L650 356 L590 306 Z" fill="#29363b" stroke="#586970" strokeWidth="1.5"/>
      <path d="M215 356 L650 356 L594 465 L159 465 Z" fill="url(#room-floor)" stroke="#64737a" strokeWidth="1.5"/>
      <path d="M590 76 L650 126 L650 356 L590 306 Z" fill="#263238" stroke="#64737a" strokeWidth="1.5"/>
      {[1, 2, 3].map((i) => <path key={`grid-x-${i}`} d={`M${215 + i * 108.75} 356 L${159 + i * 108.75} 465`} stroke="#607078" strokeOpacity=".26"/>)}
      {[1, 2, 3].map((i) => <path key={`grid-y-${i}`} d={`M${215 - i * 14} ${356 + i * 27.25} L${650 - i * 14} ${356 + i * 27.25}`} stroke="#607078" strokeOpacity=".26"/>)}
      {sunVisible && <ellipse cx={spotX} cy={spotY} rx={Math.max(30, windowWidth * .42)} ry="20" fill="url(#sun-glass)" transform={`rotate(-9 ${spotX} ${spotY})`}/>}
      <rect x={windowX} y={windowY} width={windowWidth} height={windowHeight} rx="2" fill="#83b8d3" fillOpacity=".53" stroke="#b6d5e5" strokeWidth="5"/>
      <path d={`M${windowX + windowWidth / 2} ${windowY} V${windowY + windowHeight}`} stroke="#d8edf6" strokeOpacity=".6" strokeWidth="2"/>
      <path d="M390 108 C470 18 570 30 600 92" fill="none" stroke="#f6ad55" strokeDasharray="4 6" strokeWidth="2" opacity=".8"/>
      <circle cx="600" cy="92" r="8" fill="#f6ad55"/>
      <text x="24" y="34" fill="#a8b4bb" fontFamily="monospace" fontSize="11">APERÇU SPATIAL · FAÇADE SUD</text>
      <text x="24" y="500" fill="#83919a" fontFamily="monospace" fontSize="10">4,00 m × 4,00 m · hauteur sous plafond 2,50 m</text>
      <text x="600" y="118" fill="#f6c27d" fontFamily="monospace" fontSize="10">SOLEIL</text>
    </svg>
  );
};

export default SimulationScene;

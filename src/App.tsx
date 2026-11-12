import { useMemo, useState } from 'react';
import { SimulationEngine } from './core/SimulationEngine';
import { WindowGeometry } from './core/geometry/WindowGeometry';
import type { WindowConfig } from './core/geometry/WindowGeometry';
import SimulationScene from './components/SimulationScene';
import Plan2D from './components/Plan2D';

const LOCATIONS = {
  Nantes: { lat: 47.2184, lng: -1.5536 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  Marseille: { lat: 43.2965, lng: 5.3698 },
  Strasbourg: { lat: 48.5734, lng: 7.7521 },
  Brest: { lat: 48.3904, lng: -4.4861 },
  Nice: { lat: 43.7102, lng: 7.262 },
  Toulouse: { lat: 43.6047, lng: 1.4442 },
} as const;

type LocationName = keyof typeof LOCATIONS;
type ViewMode = '3d' | '2d' | 'both';
const RATIOS = [0.5, 0.33, 0.25] as const;
const FORMATS = ['Carré', 'Panoramique', 'Vertical', 'Vertical Jumelé'] as const;
const POSITIONS = ['Centrée', 'Gauche', 'Droite', 'Haute', 'Basse'] as const;

function today(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function App() {
  const [location, setLocation] = useState<LocationName>('Nantes');
  const [ratio, setRatio] = useState<number>(0.33);
  const [format, setFormat] = useState<WindowConfig['type']>('Panoramique');
  const [position, setPosition] = useState<WindowConfig['position']>('Centrée');
  const [date, setDate] = useState(today);
  const [hour, setHour] = useState(12);
  const [view, setView] = useState<ViewMode>('3d');

  const simulation = useMemo(() => {
    const dimensions = WindowGeometry.getDimensions(ratio, format);
    const config: WindowConfig = { ratio, type: format, position, dimensions };
    const moment = new Date(`${date}T${String(hour).padStart(2, '0')}:00:00`);
    return SimulationEngine.runSimulation(config, moment, LOCATIONS[location].lat, LOCATIONS[location].lng);
  }, [date, format, hour, location, position, ratio]);

  const { solarPosition, windowDimensions } = simulation;
  const canvasClass = view === 'both' ? 'view-grid view-grid--both' : 'view-grid';

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">☼</div>
        <div>
          <p className="eyebrow">MOTEUR DE CALCUL BIOCLIMATIQUE</p>
          <h1>HÉLIOS-SIM <span>v2.6</span></h1>
        </div>
        <div className="topbar-status"><span className="status-dot" /> Simulation locale <span className="status-divider">·</span> Modèle solaire NOAA</div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <section className="control-section">
            <div className="section-heading"><span className="section-index">01</span><h2>Implantation</h2></div>
            <label className="field-label" htmlFor="location">Ville de référence</label>
            <select id="location" value={location} onChange={(event) => setLocation(event.target.value as LocationName)}>
              {Object.keys(LOCATIONS).map((name) => <option key={name}>{name}</option>)}
            </select>
            <div className="coordinate-row"><span>Latitude</span><strong>{LOCATIONS[location].lat.toFixed(4)}° N</strong></div>
            <div className="coordinate-row"><span>Longitude</span><strong>{Math.abs(LOCATIONS[location].lng).toFixed(4)}° {LOCATIONS[location].lng < 0 ? 'O' : 'E'}</strong></div>
          </section>

          <section className="control-section">
            <div className="section-heading"><span className="section-index">02</span><h2>Baie vitrée</h2></div>
            <label className="field-label">Part de la façade</label>
            <div className="segmented ratio-options" role="group" aria-label="Part de la façade">
              {RATIOS.map((value) => <button className={ratio === value ? 'selected' : ''} key={value} onClick={() => setRatio(value)}>{Math.round(value * 100)}%</button>)}
            </div>
            <label className="field-label" htmlFor="format">Typologie</label>
            <select id="format" value={format} onChange={(event) => setFormat(event.target.value as WindowConfig['type'])}>
              {FORMATS.map((item) => <option key={item}>{item}</option>)}
            </select>
            <label className="field-label" htmlFor="position">Position sur la façade</label>
            <select id="position" value={position} onChange={(event) => setPosition(event.target.value as WindowConfig['position'])}>
              {POSITIONS.map((item) => <option key={item}>{item}</option>)}
            </select>
            <div className="window-card">
              <div><span>Largeur</span><strong>{windowDimensions.width.toFixed(2)} m</strong></div>
              <div><span>Hauteur</span><strong>{windowDimensions.height.toFixed(2)} m</strong></div>
              <div><span>Surface vitrée</span><strong>{(10 * ratio).toFixed(2)} m²</strong></div>
              <div><span>FLJ estimé</span><strong>{simulation.flj.toFixed(1)}%</strong></div>
            </div>
          </section>

          <section className="control-section">
            <div className="section-heading"><span className="section-index">03</span><h2>Temps solaire</h2></div>
            <label className="field-label" htmlFor="date">Date</label>
            <input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value || today())} />
            <div className="hour-heading"><label className="field-label" htmlFor="hour">Heure</label><output htmlFor="hour">{String(hour).padStart(2, '0')}:00</output></div>
            <input id="hour" className="hour-slider" type="range" min="6" max="19" step="1" value={hour} onChange={(event) => setHour(Number(event.target.value))} />
            <div className="slider-labels"><span>06:00</span><span>19:00</span></div>
          </section>
        </aside>

        <section className="main-panel">
          <div className="telemetry-row">
            <div className="telemetry-card"><span>HAUTEUR SOLAIRE</span><strong>{solarPosition.altitude.toFixed(1)}<small>°</small></strong></div>
            <div className="telemetry-card"><span>AZIMUT</span><strong>{solarPosition.azimuth.toFixed(1)}<small>°</small></strong></div>
            <div className="telemetry-card"><span>DÉCLINAISON</span><strong>{solarPosition.declination.toFixed(1)}<small>°</small></strong></div>
            <div className="telemetry-card"><span>ANGLE HORAIRE</span><strong>{solarPosition.hourAngle.toFixed(1)}<small>°</small></strong></div>
          </div>

          <div className="visual-card">
            <div className="visual-header">
              <div><p className="eyebrow">CELLULE DE RÉFÉRENCE · 4 × 4 × 2,5 M</p><h2>Simulation solaire</h2></div>
              <div className="segmented view-options" role="group" aria-label="Mode de vue">
                <button className={view === '3d' ? 'selected' : ''} onClick={() => setView('3d')}>Vue 3D</button>
                <button className={view === '2d' ? 'selected' : ''} onClick={() => setView('2d')}>Plan 2D</button>
                <button className={view === 'both' ? 'selected' : ''} onClick={() => setView('both')}>Double</button>
              </div>
            </div>
            <div className={canvasClass}>
              {(view === '3d' || view === 'both') && <div className="simulation-canvas"><SimulationScene data={simulation} /></div>}
              {(view === '2d' || view === 'both') && <div className="plan-canvas"><Plan2D data={simulation} /></div>}
            </div>
            <div className="visual-footer"><span><i className="legend-sun" />Projection solaire</span><span><i className="legend-window" />Baie vitrée</span><span>Façade orientée au sud</span></div>
          </div>

          <div className="insight-row">
            <div className="insight-card"><span className="insight-icon">↗</span><div><h3>Profondeur de pénétration</h3><p>{solarPosition.altitude > 0 ? `${(windowDimensions.height / Math.tan(Math.max(solarPosition.altitude, 1) * Math.PI / 180)).toFixed(2)} m · estimation depuis le linteau` : 'Soleil sous l’horizon'}</p></div></div>
            <div className="insight-card"><span className="insight-icon">◉</span><div><h3>Facteur lumière jour estimé</h3><p>{simulation.flj.toFixed(1)}% · {simulation.flj >= 2 ? 'éclairement naturel satisfaisant' : 'éclairage complémentaire à prévoir'}</p></div></div>
          </div>
        </section>
      </div>
      <footer className="app-footer">HÉLIOS-SIM <span>·</span> Outil d’aide à la conception bioclimatique</footer>
    </main>
  );
}

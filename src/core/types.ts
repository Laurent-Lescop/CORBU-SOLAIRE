export interface SolarPosition {
  altitude: number;    // Degrees
  azimuth: number;      // Degrees
  declination: number;  // Degrees
  hourAngle: number;    // Degrees
  solarTime: number;    // Hours
}

export interface WindowDimensions {
  width: number;
  height: number;
  allège: number;
  linteau: number;
  lateral: number;
}

export interface WindowConfig {
  ratio: number;           // 0.50, 0.33, 0.25
  type: 'Carré' | 'Panoramique' | 'Vertical' | 'Vertical Jumelé';
  position: 'Centrée' | 'Gauche' | 'Droite' | 'Haute' | 'Basse';
  dimensions: WindowDimensions;
}

export interface SimulationResult {
  solarPosition: SolarPosition;
  windowDimensions: WindowDimensions;
  windowCoordinates: {
    topLeft: { x: number, z: number };
    bottomRight: { x: number, z: number };
  };
  floorProjection: {
    topLeft: { x: number, y: number };
    bottomRight: { x: number, y: number };
  };
  flj: number;
}

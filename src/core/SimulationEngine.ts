import { SolarCalculator } from './SolarCalculator';
import { WindowGeometry, WindowConfig } from './geometry/WindowGeometry';
import { SolarPosition } from './types';

export interface SimulationResult {
  solarPosition: SolarPosition;
  windowDimensions: any;
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

export class SimulationEngine {
  /**
   * Performs a full simulation for a specific window configuration at a specific time.
   */
  static runSimulation(
    config: WindowConfig,
    date: Date,
    lat: number,
    lng: number
  ): SimulationResult {
    // 1. Get dimensions and coordinates
    const dimensions = WindowGeometry.getDimensions(config.ratio, config.type);
    const coords = WindowGeometry.getWallCoordinates(config);

    // 2. Get solar position
    const solarPos = SolarCalculator.getSolarPosition(date, lat, lng);

    // 3. Project corners
    // The "z" in coordinates is the height from the floor.
    // The "y" in projection is the distance from the wall.
    const projTopLeft = SolarCalculator.projectPoint(
      coords.topLeft.x,
      coords.topLeft.z,
      coords.topLeft.z, // Using z as height from floor
      solarPos.azimuth,
      solarPos.altitude
    );

    const projBottomRight = SolarCalculator.projectPoint(
      coords.bottomRight.x,
      coords.bottomRight.z,
      coords.bottomRight.z, // Using z as height from floor
      solarPos.azimuth,
      solarPos.altitude
    );

    // Note: For a correct projection, we'd need to project all 4 corners and find the 
    // polygon, but for a simplified "shadow" or "patch" area, the distance between 
    // these two is a good start.

    return {
      solarPosition: solarPos,
      windowDimensions: dimensions,
      windowCoordinates: coords,
      floorProjection: {
        topLeft: projTopLeft,
        bottomRight: projBottomRight
      },
      flj: SolarCalculator.estimateFLJ(config.ratio)
    };
  }
}

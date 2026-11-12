import { SolarPosition } from '../types';

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

export class WindowGeometry {
  /**
   * Returns the dimensions of a window based on the ratio and type.
   * The reference wall is always 4.0m x 2.5m (10.0 m²).
   */
  static getDimensions(ratio: number, type: string): WindowDimensions {
    const totalArea = 10.0;
    const targetArea = totalArea * ratio;

    switch (type) {
      case 'Carré':
        const side = Math.sqrt(targetArea);
        return {
          width: side,
          height: side,
          allège: 0.13,
          linteau: 0.13,
          lateral: 0.88
        };
      case 'Panoramique':
        // Bandeau 2.5:1 (approx)
        const pWidth = Math.sqrt(targetArea * 2.5);
        const pHeight = targetArea / pWidth;
        return {
          width: pWidth,
          height: pHeight,
          allège: 0.55,
          linteau: 0.55,
          lateral: 0.89
        };
      case 'Vertical':
        // Toute Hauteur (approx 1:1.2)
        const vHeight = 2.40;
        const vWidth = targetArea / vHeight;
        return {
          width: vWidth,
          height: vHeight,
          allège: 0.025,
          linteau: 0.025,
          lateral: 0.98
        };
      case 'Vertical Jumelé':
        // 2 baies jumelées
        const jWidth = (targetArea / 2.38) / 2;
        const jHeight = 2.38;
        return {
          width: jWidth * 2, // Total width of both
          height: jHeight,
          allège: 0.025,
          linteau: 0.025,
          lateral: 0.98
        };
      default:
        return { width: 0, height: 0, allège: 0, linteau: 0, lateral: 0 };
    }
  }

  /**
   * Calculates the specific coordinates of window corners on the wall (0-4m wide, 0-2.5m high).
   */
  static getWallCoordinates(config: WindowConfig): { 
    topLeft: { x: number, z: number }, 
    bottomRight: { x: number, z: number } 
  } {
    const { width, height } = config.dimensions;
    let startX = (4.0 - width) / 2; // Default centered
    let startZ = (2.5 - height) / 2; // Default centered

    if (config.position === 'Gauche') startX = 0;
    if (config.position === 'Droite') startX = 4.0 - width;
    if (config.position === 'Haute') startZ = 2.5 - height;
    if (config.position === 'Basse') startZ = 0;

    return {
      topLeft: { x: startX, z: startZ + height },
      bottomRight: { x: startX + width, z: startZ }
    };
  }
}

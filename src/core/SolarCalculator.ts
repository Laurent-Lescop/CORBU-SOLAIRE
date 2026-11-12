import type { SolarPosition } from './types';

/**
 * HÉLIOS-SIM Core Math Engine
 * Handles astronomical calculations and solar projections.
 */
export class SolarCalculator {
  /**
   * Calculates the solar position for a given date and time.
   * @param date A Date object representing the target time.
   * @param lat Latitude in decimal degrees.
   * @param lng Longitude in decimal degrees.
   * @returns SolarPosition object
   */
  static getSolarPosition(date: Date, lat: number, lng: number): SolarPosition {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const startOfYear = new Date(year, 0, 1);
    const diffTime = date.getTime() - startOfYear.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const d = diffDays + 1;

    const declination = 23.45 * Math.sin((360 / 365) * (d - 81) * (Math.PI / 180));

    const utcHour = date.getUTCHours() + date.getUTCMinutes() / 60;
    const solarTime = utcHour + (lng / 15);
    const hourAngle = (solarTime - 12) * 15;

    const sinH = Math.sin(lat * (Math.PI / 180)) * Math.sin(declination * (Math.PI / 180)) +
                   Math.cos(lat * (Math.PI / 180)) * Math.cos(declination * (Math.PI / 180)) *
                   Math.cos(hourAngle * (Math.PI / 180));
    
    const altitude = Math.asin(sinH) * (180 / Math.PI);

    const cosA = (Math.sin(altitude * (Math.PI / 180)) * Math.sin(lat * (Math.PI / 180)) -
                   Math.sin(declination * (Math.PI / 180))) /
                  (Math.cos(altitude * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)));

    let azimuth = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
    
    if (Math.sin(hourAngle * (Math.PI / 180)) > 0) {
      azimuth = 360 - azimuth;
    }

    return {
      altitude,
      azimuth,
      declination,
      hourAngle,
      solarTime
    };
  }

  /**
   * Projects a window corner onto the floor.
   * @param xCoord Wall coordinate (x=0 is left, x=4.0 is right)
   * @param zCoord Wall coordinate (z=0 is bottom/floor, z=2.5 is top)
   * @param height Height from floor
   * @param azimuth Solar azimuth (0=N, 90=E, 180=S, 270=W)
   * @param altitude Solar altitude
   * @returns {x: number, y: number} Floor coordinates
   */
  static projectPoint(xCoord: number, zCoord: number, height: number, azimuth: number, altitude: number): { x: number, y: number } {
    if (altitude <= 0) return { x: xCoord, y: 0 };
    const theta = (azimuth - 180) * (Math.PI / 180);
    const cotAlt = 1 / Math.tan(altitude * (Math.PI / 180));
    
    const resY = height * cotAlt;
    const resX = xCoord - height * cotAlt * Math.sin(theta);
    
    return { x: resX, y: resY };
  }

  /**
   * Estimates the average Daylight Factor (FLJ) based on the window ratio.
   * Based on CSTB / BRE correlations.
   */
  static estimateFLJ(ratio: number): number {
    if (ratio === 0.50) return 2.8;
    if (ratio === 0.33) return 1.9;
    if (ratio === 0.25) return 1.4;
    return 0;
  }
}

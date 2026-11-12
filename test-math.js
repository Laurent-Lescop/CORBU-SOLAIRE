class SolarCalculator {
  getSolarPosition(date, lat, lng) {
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

  projectPoint(xCoord, zCoord, height, azimuth, altitude) {
    if (altitude <= 0) return { x: xCoord, y: 0 };
    const theta = (azimuth - 180) * (Math.PI / 180);
    const cotAlt = 1 / Math.tan(altitude * (Math.PI / 180));
    
    const resY = height * cotAlt;
    const resX = xCoord - height * cotAlt * Math.sin(theta);
    
    return { x: resX, y: resY };
  }
}

const calculator = new SolarCalculator();
// Nantes, France: Lat 47.2184, Lng -1.5536
// March 21st, 2026, 12:00 Solar Time
// To get 12:00 Solar Time at -1.5536 Lng, UTC is roughly 12:00 + (1.5536/15) = 12:06
const testDate = new Date(2026, 2, 21, 12, 6, 0); 
const lat = 47.2184;
const lng = -1.5536;

const pos = calculator.getSolarPosition(testDate, lat, lng);
console.log(`Solar Position: Altitude=${pos.altitude.toFixed(2)}°, Azimuth=${pos.azimuth.toFixed(2)}°`);

const projection = calculator.projectPoint(2, 2.5, 2.5, pos.azimuth, pos.altitude);
console.log(`Projection of (2, 2.5) at height 2.5: x=${projection.x.toFixed(2)}, y=${projection.y.toFixed(2)}`);

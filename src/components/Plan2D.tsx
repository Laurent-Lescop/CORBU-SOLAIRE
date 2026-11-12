import React from 'react';
import { SimulationResult } from '../core/types';

const Plan2D: React.FC<{ data: SimulationResult }> = ({ data }) => {
  const { floorProjection, windowDimensions, solarPosition } = data;

  // Floor is 4x4
  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '40px', 
      borderRadius: '8px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100%',
      border: '1px solid #ddd'
    }}>
      <div style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        border: '2px solid #333',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Grid lines */}
        <div style={{ position: 'absolute', top: '50%', width: '100%', borderTop: '1px dashed #ccc' }} />
        <div style={{ position: 'absolute', left: '50%', height: '100%', borderLeft: '1px dashed #ccc' }} />
        
        {/* Window Position (on the wall at y=0 or y=400) */}
        {/* Let's assume wall is at y=0 */}
        <div style={{
          position: 'absolute',
          left: `${((floorProjection.topLeft.x - 2) / 4) * 100}%`,
          top: '0',
          width: `${(windowDimensions.width / 4) * 100}%`,
          height: `${(windowDimensions.height / 2.5) * 100}%`,
          backgroundColor: 'rgba(170, 200, 255, 0.5)',
          border: '1px solid #007bff'
        }} />

        {/* Sun Patch */}
        <div style={{
          position: 'absolute',
          left: `${((floorProjection.topLeft.x + 2) / 4) * 100}%`,
          top: `${((floorProjection.topLeft.y + 2) / 4) * 100}%`,
          width: `${Math.abs(floorProjection.bottomRight.x - floorProjection.topLeft.x) * 25}%`,
          height: `${Math.abs(floorProjection.bottomRight.y - floorProjection.topLeft.y) * 25}%`,
          backgroundColor: 'rgba(255, 215, 0, 0.3)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%'
        }} />
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px', color: '#888' }}>
        Échelle : 1cm = 1m
      </div>
    </div>
  );
};

export default Plan2D;

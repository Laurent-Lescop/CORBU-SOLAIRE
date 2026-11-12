import React, { useMemo } from 'react';
import { SimulationResult } from '../core/types';

const AsmMap: React.FC<{ data: SimulationResult }> = ({ data }) => {
  const { floorProjection } = data;
  
  // 4x4 grid representation
  const grid = Array(4).fill(null).map(() => Array(4).fill('.'));

  // Mark the sun patch (simplified to one cell for the map)
  // If projection y is between 0-1, x between 0-1, etc.
  const gridX = Math.max(0, Math.min(3, Math.floor(floorProjection.topLeft.x / 1)));
  const gridY = Math.max(0, Math.min(3, Math.floor(floorProjection.topLeft.y / 1)));
  
  // Actually, let's just mark the area
  grid[gridY][gridX] = '*';

  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#0f0', 
      padding: '10px', 
      borderRadius: '4px', 
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.5',
      border: '1px solid #444'
    }}>
      <div style={{ marginBottom: '5px', borderBottom: '1px solid #444' }}>
        Cartographie d'ensoleillement (4x4m)
      </div>
      {grid.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => (
            <span key={x} style={{ margin: '0 2px' }}>{cell}</span>
          ))}
        </div>
      ))}
      <div style={{ marginTop: '5px', color: '#888', fontSize: '10px' }}>
        * = Zone d'impact solaire direct
      </div>
    </div>
  );
};

export default AsmMap;

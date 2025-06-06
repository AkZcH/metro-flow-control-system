
import React, { useEffect, useRef } from 'react';
import { stations, lines, Station, Line } from '../utils/metroData';

interface MetroMapProps {
  selectedFromStation?: string;
  selectedToStation?: string;
  onStationClick?: (stationId: string) => void;
}

const SCALE_FACTOR = 5;  // Scale factor for the coordinates

const MetroMap: React.FC<MetroMapProps> = ({ 
  selectedFromStation, 
  selectedToStation,
  onStationClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the metro map on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    lines.forEach(line => {
      drawLine(ctx, line);
    });

    // Draw stations
    stations.forEach(station => {
      const isSelected = station.id === selectedFromStation || station.id === selectedToStation;
      drawStation(ctx, station, isSelected);
    });
  }, [selectedFromStation, selectedToStation]);

  // Draw a metro line
  const drawLine = (ctx: CanvasRenderingContext2D, line: Line) => {
    const lineStations = line.stations.map(id => stations.find(s => s.id === id)).filter(Boolean) as Station[];
    
    if (lineStations.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(lineStations[0].coordinates.x * SCALE_FACTOR, lineStations[0].coordinates.y * SCALE_FACTOR);
    
    for (let i = 1; i < lineStations.length; i++) {
      ctx.lineTo(lineStations[i].coordinates.x * SCALE_FACTOR, lineStations[i].coordinates.y * SCALE_FACTOR);
    }

    ctx.strokeStyle = line.color;
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  // Draw a station
  const drawStation = (ctx: CanvasRenderingContext2D, station: Station, isSelected: boolean) => {
    const x = station.coordinates.x * SCALE_FACTOR;
    const y = station.coordinates.y * SCALE_FACTOR;
    
    // Draw station circle
    ctx.beginPath();
    ctx.arc(x, y, isSelected ? 8 : 6, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? '#FF1654' : '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    
    // Draw station name
    ctx.font = isSelected ? 'bold 12px Arial' : '12px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(station.name, x, y + 20);
  };

  // Handle click on map to select station
  const handleMapClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onStationClick) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / SCALE_FACTOR;
    const y = (e.clientY - rect.top) / SCALE_FACTOR;

    // Find the closest station
    let closestStation: Station | null = null;
    let minDistance = Number.MAX_VALUE;

    stations.forEach(station => {
      const dx = station.coordinates.x - x;
      const dy = station.coordinates.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance && distance < 10) {  // Within 10 units
        minDistance = distance;
        closestStation = station;
      }
    });

    if (closestStation) {
      onStationClick(closestStation.id);
    }
  };

  return (
    <div className="metro-map-container bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-metro-primary mb-2">Metro Map</h3>
      <canvas 
        ref={canvasRef}
        width={500}
        height={400}
        onClick={handleMapClick}
        className="border border-gray-200 rounded"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {lines.map(line => (
          <div key={line.id} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-1" 
              style={{ backgroundColor: line.color }}
            ></div>
            <span className="text-sm">{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetroMap;

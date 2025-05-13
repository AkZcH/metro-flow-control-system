
export interface Station {
  id: string;
  name: string;
  lines: string[];
  coordinates: { x: number; y: number };
}

export interface Line {
  id: string;
  name: string;
  color: string;
  stations: string[];
}

export interface Route {
  from: string;
  to: string;
  fare: number;
  estimatedTime: number; // in minutes
}

// Sample metro stations
export const stations: Station[] = [
  { 
    id: 's1', 
    name: 'Central Station', 
    lines: ['red', 'blue'], 
    coordinates: { x: 50, y: 50 } 
  },
  { 
    id: 's2', 
    name: 'North Terminal', 
    lines: ['red'], 
    coordinates: { x: 50, y: 20 } 
  },
  { 
    id: 's3', 
    name: 'South Square', 
    lines: ['red'], 
    coordinates: { x: 50, y: 80 } 
  },
  { 
    id: 's4', 
    name: 'East Riverside', 
    lines: ['blue'], 
    coordinates: { x: 80, y: 50 } 
  },
  { 
    id: 's5', 
    name: 'West Park', 
    lines: ['blue'], 
    coordinates: { x: 20, y: 50 } 
  },
  { 
    id: 's6', 
    name: 'University', 
    lines: ['green'], 
    coordinates: { x: 70, y: 30 } 
  },
  { 
    id: 's7', 
    name: 'Business District', 
    lines: ['green', 'blue'], 
    coordinates: { x: 70, y: 60 } 
  },
  { 
    id: 's8', 
    name: 'Stadium', 
    lines: ['green'], 
    coordinates: { x: 30, y: 70 } 
  },
];

// Metro lines
export const lines: Line[] = [
  {
    id: 'red',
    name: 'Red Line',
    color: '#EF476F',
    stations: ['s2', 's1', 's3'],
  },
  {
    id: 'blue',
    name: 'Blue Line',
    color: '#247BA0',
    stations: ['s5', 's1', 's4', 's7'],
  },
  {
    id: 'green',
    name: 'Green Line',
    color: '#06D6A0',
    stations: ['s6', 's7', 's8'],
  },
];

// Calculate fare between stations
export const calculateFare = (fromStationId: string, toStationId: string): number => {
  if (fromStationId === toStationId) return 0;
  
  // Find which lines connect these stations
  const fromStation = stations.find(s => s.id === fromStationId);
  const toStation = stations.find(s => s.id === toStationId);
  
  if (!fromStation || !toStation) return 0;
  
  // Check if they're on the same line
  const commonLines = fromStation.lines.filter(line => toStation.lines.includes(line));
  
  // Basic fare calculation (could be more complex in real systems)
  const baseFare = 2.50;
  const transferFee = commonLines.length === 0 ? 1.00 : 0;
  
  // Distance-based fare (mock calculation)
  const dx = fromStation.coordinates.x - toStation.coordinates.x;
  const dy = fromStation.coordinates.y - toStation.coordinates.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const distanceFare = distance * 0.1; // 10 cents per distance unit
  
  return Math.round((baseFare + transferFee + distanceFare) * 100) / 100;
};

export const calculateTravelTime = (fromStationId: string, toStationId: string): number => {
  if (fromStationId === toStationId) return 0;
  
  // Find which lines connect these stations
  const fromStation = stations.find(s => s.id === fromStationId);
  const toStation = stations.find(s => s.id === toStationId);
  
  if (!fromStation || !toStation) return 0;
  
  // Check if they're on the same line
  const commonLines = fromStation.lines.filter(line => toStation.lines.includes(line));
  
  // Calculate distance
  const dx = fromStation.coordinates.x - toStation.coordinates.x;
  const dy = fromStation.coordinates.y - toStation.coordinates.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Basic time calculation
  const baseTimePerUnit = 1.5; // 1.5 minutes per distance unit
  const transferTime = commonLines.length === 0 ? 5 : 0; // 5 minute transfer penalty
  
  return Math.round(distance * baseTimePerUnit + transferTime);
};

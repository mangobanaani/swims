// components/Gauge.tsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GaugeProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

const GaugeComponent: React.FC<GaugeProps> = ({ title, value, unit, min, max }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 w-40 h-40 text-center">
      <h3 className="text-md font-semibold mb-4 text-gray-700">{title}</h3>
      <div style={{ width: 128, height: 128 }}>
        <CircularProgressbar
          value={percentage}
          text={`${value} ${unit}`}
          styles={buildStyles({
            pathColor: '#3b82f6',
            textColor: '#1f2937',
            trailColor: '#e5e7eb',
            backgroundColor: '#f8fafc',
          })}
        />
      </div>
    </div>
  );
};

export default GaugeComponent;
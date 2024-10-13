// components/SensorCard.tsx
import React from 'react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-3xl font-semibold">
        {value} {unit}
      </p>
    </div>
  );
};

export default SensorCard;

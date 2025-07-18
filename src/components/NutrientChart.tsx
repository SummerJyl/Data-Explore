import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Nutrient {
  nutrientName: string;
  value: number;
  unitName: string;
}

interface NutrientChartProps {
  nutrients: Nutrient[];
  title?: string;
}

const NutrientChart: React.FC<NutrientChartProps> = ({ nutrients, title }) => {
  const chartData = nutrients
    .filter((n) => typeof n.value === 'number' && !isNaN(n.value))
    .map((n) => ({
      name: n.nutrientName,
      value: n.value,
      unit: n.unitName,
    }));

  if (chartData.length === 0) return null;

  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && <h3 style={{ textAlign: 'center' }}>{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutrientChart;

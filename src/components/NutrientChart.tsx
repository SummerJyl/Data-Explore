import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Nutrient {
  nutrientName: string;
  value: number;
  unitName: string;
}

interface NutrientChartProps {
  nutrients: Nutrient[];
}

const NutrientChart: React.FC<NutrientChartProps> = ({ nutrients }) => {
  // Filter for some key nutrients you want to show
  const chartData = nutrients
    .filter(n => ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'].includes(n.nutrientName))
    .map(n => ({
      name: n.nutrientName,
      value: n.value,
      unit: n.unitName,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number, name: string, props) => [`${value} ${props.payload.unit}`, name]} />
        <Bar dataKey="value" fill="#3182CE" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutrientChart;

import React, { useEffect, useState } from 'react';
import ChartCard from '../components/ChartCard';

interface GlucoseReading {
  timestamp: string;
  glucose: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<GlucoseReading[]>([]);

  useEffect(() => {
    fetch('/src/data/glucose-readings.json')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Bio Health Data Explorer</h1>
      <ChartCard title="Glucose Levels Over Time" data={data} />
    </main>
  );
};

export default Home;

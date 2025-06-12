import React, { useEffect, useState } from 'react';
import { fetchFoodData } from '../api/usdaApi';

const Home = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getFoods() {
      setLoading(true);
      setError(null);
      const results = await fetchFoodData('Vitamin D'); // or any query
      if (results.length === 0) {
        setError('No results found');
      }
      setFoods(results);
      setLoading(false);
    }

    getFoods();
  }, []);

  return (
    <main>
      <h1>Bio Health Data Explorer</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {foods.map((food) => (
          <li key={food.fdcId}>
            {food.description} - {food.dataType}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;

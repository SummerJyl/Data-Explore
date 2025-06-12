import React, { useState } from 'react';
import { fetchFoodData } from '../api/usdaApi';

type FoodItem = {
  fdcId: number;
  description: string;
  dataType: string;
  // Add other fields as needed
};

const Home = () => {
  const [query, setQuery] = useState('Vitamin D');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await fetchFoodData(query);
      if (results.length === 0) {
        setError('No results found');
      }
      setFoods(results);
    } catch {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Bio Health Data Explorer</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search nutrients or foods"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {foods.map(food => (
          <li key={food.fdcId}>
            {food.description} - {food.dataType}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;

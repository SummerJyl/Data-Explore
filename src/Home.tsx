import { useState } from 'react';
import { fetchFoodData } from './api/usdaApi'; // adjust path as needed

interface FoodDetails {
  fdcId: number;
  description: string;
}

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetchFoodData(query);
      setResults(response || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search foods..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((result: FoodDetails) => (
            <li key={result.fdcId}>{result.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

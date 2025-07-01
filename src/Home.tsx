import { useState } from 'react';
import { fetchFoodData } from './api/usdaApi'; // adjust path as needed

interface FoodDetails {
  fdcId: number;
  description: string;
}

const nutrientOptions = [
  'Protein',
  'Fat',
  'Carbs',
  'Vitamins',
  'Minerals',
];

const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [results, setResults] = useState<FoodDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleFilter = (nutrient: string) => {
    setSelectedFilters(prev =>
      prev.includes(nutrient)
        ? prev.filter(f => f !== nutrient)
        : [...prev, nutrient]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetchFoodData(query, selectedFilters);
      setResults(response || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Bio Health Data Explorer</h1>
      <p>Search nutritional info from the USDA food database.</p>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search foods..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filters">
        {nutrientOptions.map(nutrient => (
          <label key={nutrient}>
            <input
              type="checkbox"
              checked={selectedFilters.includes(nutrient)}
              onChange={() => toggleFilter(nutrient)}
            />
            {nutrient}
          </label>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="results-list">
          {results.map((result: FoodDetails) => (
            <li key={result.fdcId}>{result.description}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;

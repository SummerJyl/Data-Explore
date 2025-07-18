import React, { useState } from 'react';
import { fetchFoodData } from '../api/usdaApi';
import FoodCard from '../components/FoodCard';  // ✅ Valid import here


interface FoodItem {
  fdcId: number;
  description: string;
  dataType: string;
}

const nutrientOptions = ['Protein', 'Fat', 'Carbs', 'Vitamins', 'Minerals'];

const Home = () => {
  const [query, setQuery] = useState('Vitamin D');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (nutrient: string) => {
    setSelectedFilters(prev =>
      prev.includes(nutrient)
        ? prev.filter(f => f !== nutrient)
        : [...prev, nutrient]
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await fetchFoodData(query, selectedFilters);
      if (results.length === 0) {
        setError('No results found.');
      }
      setFoods(results.map(item => ({
        fdcId: item.fdcId,
        description: item.description,
        dataType: item.dataType || 'Unknown',
      })));
      setVisibleCount(10);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Bio Health Data Explorer</h1>
      <p>Search nutritional info from the USDA food database.</p>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search foods..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="filters">
        {nutrientOptions.map(nutrient => (
          <label key={nutrient} style={{ marginRight: '1rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedFilters.includes(nutrient)}
              onChange={() => toggleFilter(nutrient)}
            />{' '}
            {nutrient}
          </label>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div
            className="results-grid"
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}
          >
            {foods.slice(0, visibleCount).map(food => (
              <FoodCard
                key={food.fdcId}
                food={food}
                selectedFilters={selectedFilters}
              />
            ))}
          </div>

          {visibleCount < foods.length && (
            <button
              onClick={() => setVisibleCount(prev => prev + 10)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#2c7a7b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Show More
            </button>
          )}
        </>
      )}
    </main>
  );
};

export default Home;

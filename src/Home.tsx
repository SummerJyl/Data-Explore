import React, { useState } from 'react';
import { fetchFoodData, fetchFoodDetails, FoodItem, NutrientDetail } from '../api/usdaApi';
import NutrientChart from '../components/NutrientChart';

const Home = () => {
  const [query, setQuery] = useState('Vitamin D');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedFoodNutrients, setSelectedFoodNutrients] = useState<NutrientDetail[]>([]);

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
      setSelectedFood(null); // Clear previous selection
      setSelectedFoodNutrients([]);
    } catch {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFoodClick = async (food: FoodItem) => {
    setSelectedFood(food);
    const nutrients = await fetchFoodDetails(food.fdcId);
    setSelectedFoodNutrients(nutrients);
  };

  return (
    <main>
      <h1>Bio Health Data Explorer</h1>

      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search foods..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-grid">
        {foods.slice(0, visibleCount).map(food => (
          <div
            key={food.fdcId}
            className="result-card"
            onClick={() => handleFoodClick(food)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{food.description}</h3>
            <p>FDC ID: {food.fdcId}</p>
          </div>
        ))}
      </div>

      {visibleCount < foods.length && (
        <button onClick={() => setVisibleCount(prev => prev + 10)}>
          Show More
        </button>
      )}

      {selectedFood && selectedFoodNutrients.length > 0 && (
        <section className="nutrient-chart-container">
          <h2>{selectedFood.description} - Nutrients</h2>
          <NutrientChart nutrients={selectedFoodNutrients} />
        </section>
      )}
    </main>
  );
};

export default Home;

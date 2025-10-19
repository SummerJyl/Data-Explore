import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFoodData, fetchFoodDetails } from '../api/usdaApi';
import type { FoodDetails, NutrientDetail } from '../api/usdaApi';
import NutrientChart from '../components/NutrientChart';

interface UserData {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

const Home = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<FoodDetails[]>([]);
  const [allFoods, setAllFoods] = useState<FoodDetails[]>([]); // Store unfiltered results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedFood, setSelectedFood] = useState<FoodDetails | null>(null);
  const [selectedFoodNutrients, setSelectedFoodNutrients] = useState<NutrientDetail[]>([]);
  
  // Filter state
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const filterOptions = [
    { id: 'highProtein', label: 'High Protein (>20g/100g)' },
    { id: 'highCarbs', label: 'High Carbs (>40g/100g)' },
    { id: 'highFat', label: 'High Fat (>20g/100g)' },
    { id: 'lowCalorie', label: 'Low Calorie (<100 kcal/100g)' }
  ];

  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await fetchFoodData(query);
      if (results.length === 0) {
        setError('No results found');
      }
      setAllFoods(results); // Store all results
      applyFilters(results, activeFilters); // Apply current filters
      setSelectedFood(null);
      setSelectedFoodNutrients([]);
    } catch {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    applyFilters(allFoods, newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFoods(allFoods);
    setVisibleCount(10);
  };

  const applyFilters = (foodList: FoodDetails[], filters: string[]) => {
    if (filters.length === 0) {
      setFoods(foodList);
      setVisibleCount(10);
      return;
    }

    const filtered = foodList.filter(food => {
      // Extract nutrient values (per 100g)
      const nutrients = food.foodNutrients || [];
      
      const protein = nutrients.find(n => 
        n.nutrientName?.toLowerCase() === 'protein'
      )?.value || 0;
      
      const carbs = nutrients.find(n => 
        n.nutrientName?.toLowerCase().includes('carbohydrate')
      )?.value || 0;
      
      const fat = nutrients.find(n => 
        n.nutrientName?.toLowerCase().includes('total lipid') ||
        n.nutrientName?.toLowerCase() === 'fat'
      )?.value || 0;
      
      const calories = nutrients.find(n => 
        n.nutrientName?.toLowerCase() === 'energy' ||
        n.nutrientName?.toLowerCase().includes('energy')
      )?.value || 0;

      // Check each active filter
      let matches = true;
      
      if (filters.includes('highProtein')) {
        matches = matches && protein > 20;
      }
      if (filters.includes('highCarbs')) {
        matches = matches && carbs > 40;
      }
      if (filters.includes('highFat')) {
        matches = matches && fat > 20;
      }
      if (filters.includes('lowCalorie')) {
        matches = matches && calories < 100;
      }

      return matches;
    });

    setFoods(filtered);
    setVisibleCount(10);
  };

  const handleFoodClick = async (food: FoodDetails) => {
    setSelectedFood(food);
    try {
      const nutrients = await fetchFoodDetails(food.fdcId);
      setSelectedFoodNutrients(nutrients);
    } catch {
      setError('Failed to fetch nutrient details.');
    }
  };

  return (
    <main>
      {/* User Profile Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        {user ? (
          <>
            <div>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                Welcome, {user.firstName}!
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                {user.email}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => navigate('/goals')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                My Goals
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ margin: 0 }}>Not logged in</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Register
              </button>
            </div>
          </>
        )}
      </div>

      <h1>Bio Health Data Explorer</h1>
      
      {/* Filter Section */}
      {user && (
        <div style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>Filter by Nutrients:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {filterOptions.map(filter => (
              <label
                key={filter.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: activeFilters.includes(filter.id) ? '#e7f3ff' : '#f8f9fa',
                  border: activeFilters.includes(filter.id) ? '2px solid #007bff' : '1px solid #dee2e6',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(filter.id)}
                  onChange={() => toggleFilter(filter.id)}
                  style={{ cursor: 'pointer' }}
                />
                {filter.label}
              </label>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Clear All
              </button>
            )}
          </div>
          {activeFilters.length > 0 && (
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
              {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active
            </p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search foods..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-grid">
        {foods.slice(0, visibleCount).map((food) => (
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
        <button onClick={() => setVisibleCount((prev) => Math.min(prev + 10, foods.length))}>
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
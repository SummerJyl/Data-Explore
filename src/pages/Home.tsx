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
  const [query, setQuery] = useState('Vitamin D');
  const [foods, setFoods] = useState<FoodDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedFood, setSelectedFood] = useState<FoodDetails | null>(null);
  const [selectedFoodNutrients, setSelectedFoodNutrients] = useState<NutrientDetail[]>([]);
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
      setFoods(results);
      setSelectedFood(null);
      setSelectedFoodNutrients([]);
    } catch {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
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
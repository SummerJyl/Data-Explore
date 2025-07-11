import React, { useState } from 'react';
import type { NutrientDetail } from "../api/usdaApi";
import { fetchFoodDetails, filterNutrientsByCategory } from '../api/usdaApi';
// import NutrientChart from './NutrientChart'; // optional

interface Food {
  description: string;
  fdcId: number;
  dataType: string;
}

interface FoodCardProps {
  food: Food;
  selectedFilters: string[];
}

const FoodCard: React.FC<FoodCardProps> = ({ food, selectedFilters }) => {
  const [detailedNutrients, setDetailedNutrients] = useState<NutrientDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = async () => {
    console.log('FoodCard clicked:', food.description);
    if (!expanded) {
      setLoading(true);
      try {
        const nutrients = await fetchFoodDetails(food.fdcId);

        console.log('Fetched nutrients:', nutrients);
        const filtered = filterNutrientsByCategory(nutrients, selectedFilters);
        console.log('Filtered nutrients:', filtered);

        setDetailedNutrients(filtered);
      } catch (error) {
        console.error('Failed to fetch nutrient details', error);
      } finally {
        setLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: 'pointer', border: '1px solid #ddd', marginBottom: 16, padding: 12 }}
    >
      <h3>{food.description}</h3>
      <p>FDC ID: {food.fdcId}</p>
      <p>Data Type: {food.dataType}</p>

      {loading && <p>Loading nutrients...</p>}

      {expanded && detailedNutrients && detailedNutrients.length > 0 ? (
        <ul>
  {detailedNutrients.map((nutrient) => (
    <li key={nutrient.nutrientName}>
      {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
    </li>
  ))}
</ul>

      ) : expanded && <p>No nutrients found for selected filters.</p>}
    </div>
  );
};

export default FoodCard;

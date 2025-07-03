const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
export const apiKey = import.meta.env.VITE_USDA_API_KEY || 'test-api-key';

export interface NutrientDetail {
  nutrientName: string;
  value: number;
  unitName: string;
}

export interface FoodDetails {
  description: string;
  fdcId: number;
  foodNutrients: NutrientDetail[];
}

// Fetch detailed nutrient info for a specific food by fdcId
export async function fetchFoodDetails(fdcId: number): Promise<NutrientDetail[]> {
  const response = await fetch(`${BASE_URL}/${fdcId}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch food details');
  }
  const data = await response.json();
  return data.foodNutrients;
}

// Fetch food search results by query and optional filters
export async function fetchFoodData(query: string, filters: string[] = []): Promise<FoodDetails[]> {
  let url = `${BASE_URL}/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  if (filters.length > 0) {
    const filtersParam = filters.join(',');
    url += `&filters=${encodeURIComponent(filtersParam)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch food data');
  }

  const data = await response.json();
  return data.foods || [];
}

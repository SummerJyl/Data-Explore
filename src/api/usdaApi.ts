const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export const apiKey = import.meta.env.VITE_USDA_API_KEY || 'test-api-key';

export async function fetchFoodData(query: string): Promise<FoodDetails[]> {
  const url = `${BASE_URL}/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch food data');
  }

  const data = await response.json();
  return data.foods; // adjust if the structure is different
}

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

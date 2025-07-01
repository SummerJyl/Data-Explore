const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export const apiKey = import.meta.env.VITE_USDA_API_KEY || 'test-api-key';

export async function fetchFoodData(query: string, filters: string[] = []): Promise<FoodDetails[]> {
  let url = `${BASE_URL}/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  if (filters.length > 0) {
    // Convert filter names to IDs if needed, or just join filters as a param
    const filtersParam = filters.join(','); // adjust if your API expects IDs or another format
    url += `&filters=${encodeURIComponent(filtersParam)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch food data');
  }

  const data = await response.json();
  return data.foods; // or whatever your API response structure is
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

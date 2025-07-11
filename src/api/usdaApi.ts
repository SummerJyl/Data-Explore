const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
export const apiKey = import.meta.env.VITE_USDA_API_KEY || 'test-api-key';

export interface NutrientDetail {
  nutrientName: string;
  unitName: string;
  value: number;
}

export interface FoodDetails {
  description: string;
  fdcId: number;
  dataType: string;
  foodNutrients: NutrientDetail[];
}

export async function fetchFoodDetails(fdcId: number): Promise<NutrientDetail[]> {
  const response = await fetch(`${BASE_URL}/${fdcId}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch food details');
  }
  const data = await response.json();

  console.log('Full food detail response:', data);  // Inspect full API response
  console.log('foodNutrients array sample:', data.foodNutrients?.slice(0, 5)); // First 5 nutrients sample

  return data.foodNutrients || [];
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

export const nutrientNameMap: Record<string, string[]> = {
  protein: ['Protein'],
  fat: ['Total lipid (fat)'],
  carbs: ['Carbohydrate, by difference'],
  vitamins: [
    'Vitamin A, RAE',
    'Vitamin A, IU',
    'Vitamin B-6',
    'Vitamin B-12',
    'Vitamin C, total ascorbic acid',
    'Vitamin D',
    'Vitamin D (D2 + D3)',
    'Vitamin E (alpha-tocopherol)',
    'Vitamin K (phylloquinone)',
    'Folate, total',
    'Folic acid',
    'Niacin',
    'Riboflavin',
    'Thiamin',
  ],
  minerals: [
    'Calcium, Ca',
    'Iron, Fe',
    'Magnesium, Mg',
    'Phosphorus, P',
    'Potassium, K',
    'Sodium, Na',
    'Zinc, Zn',
    'Copper, Cu',
    'Manganese, Mn',
    'Selenium, Se',
  ],
};

export function filterNutrientsByCategory(
  foodNutrients: NutrientDetail[],
  selectedFilters: string[]
): NutrientDetail[] {
  if (selectedFilters.length === 0) return foodNutrients;

  const keywords = selectedFilters.flatMap(
    (filter) => nutrientNameMap[filter.toLowerCase()] || []
  );

  // console.log('Keywords to filter by:', keywords);
  // console.log('Sample nutrient item:', foodNutrients[0]);

  const filtered = foodNutrients.filter((nutrient: NutrientDetail) => {
    if (!nutrient.nutrientName) return false;  // <-- use nutrientName, NOT nutrient.name
    const nameLower = nutrient.nutrientName.toLowerCase();
    return keywords.some((keyword) =>
      nameLower === keyword.toLowerCase() ||
      nameLower.includes(keyword.toLowerCase())
    );
  });

  console.log('Filtered nutrients inside function:', filtered);
  return filtered;
}
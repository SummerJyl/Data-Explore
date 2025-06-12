const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function fetchFoodData(query: string) {
  const apiKey = import.meta.env.VITE_USDA_API_KEY;

  const url = `${BASE_URL}/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=5`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.foods; // array of food items
  } catch (error) {
    console.error('Error fetching food data:', error);
    return [];
  }
}

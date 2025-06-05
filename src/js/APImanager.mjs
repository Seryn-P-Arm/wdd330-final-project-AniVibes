// APIManager.mjs - Handles Jikan & Spoonacular API Fetches

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with actual key

// Fetch anime based on mood and optional genre
export async function fetchAnimeByMood(mood, genre) {
  try {
    const query = `${JIKAN_BASE_URL}/anime?q=${mood}&genres=${genre || ''}&limit=12`;
    const res = await fetch(query);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching anime:', err);
    return [];
  }
}

// Fetch snacks from Spoonacular API based on mood keyword
export async function fetchSnacksByMood(mood) {
  try {
    const url = `${SPOONACULAR_BASE_URL}?query=${mood}+snack&number=10&apiKey=${SPOONACULAR_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error('Error fetching snacks:', err);
    return [];
  }
}

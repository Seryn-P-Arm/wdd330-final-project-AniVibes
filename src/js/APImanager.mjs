// APIManager.mjs - Handles Jikan & Spoonacular API Fetches

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const SPOONACULAR_API_KEY = '7525781dd26f4eef944def629207535e';

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
    const url = `${SPOONACULAR_BASE_URL}?query=${mood}+snack&number=6&apiKey=${SPOONACULAR_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    // Fetch details for each snack
    const snacksWithDetails = await Promise.all(
      data.results.map(async (snack) => {
        const detailUrl = `https://api.spoonacular.com/recipes/${snack.id}/information?apiKey=${SPOONACULAR_API_KEY}`;
        const detailRes = await fetch(detailUrl);
        const detailData = await detailRes.json();

        return {
          id: snack.id,
          title: snack.title,
          image: snack.image,
          summary: detailData.summary,
          instructions: detailData.instructions || '',
          sourceUrl: detailData.sourceUrl || '#',
        };
      })
    );

    return snacksWithDetails;
  } catch (err) {
    console.error('Error fetching snacks:', err);
    return [];
  }
}


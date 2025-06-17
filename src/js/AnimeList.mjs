import { UIHandler } from './UIHandler.mjs';

export function renderAnimeList(containerId, animeArray) {
  const wrapper = document.getElementById(containerId);
  const container = wrapper?.querySelector('.anime-cards');

  if (!container) {
    console.warn('Anime container not found');
    return;
  }

  container.innerHTML = '';

  if (!animeArray || animeArray.length === 0) {
    container.innerHTML = '<p>No anime found for the selected mood or genre.</p>';
    return;
  }

  console.log('🧪 Rendering Anime Cards:', animeArray);

  animeArray.forEach((anime) => {
    try {
      const card = document.createElement('div');
      card.classList.add('anime-card');

      const badge = anime.trending ? '<span class="badge">Trending Now</span>' : '';
      const imgUrl = anime.images?.jpg?.image_url || 'fallback.jpg';

      card.innerHTML = `
        ${badge}
        <img src="${imgUrl}" alt="${anime.title} poster">
        <div class="anime-info">
          <h3>${anime.title || anime.title_english}</h3>
          <p class="rating">⭐ ${anime.rating || 'N/A'}</p>
          <p class="synopsis">${anime.synopsis || 'No synopsis available.'}</p>
          <p class="episodes">Episodes: ${anime.episodes || 'Unknown'}</p>
          <button class="add-watchlist" data-id="${anime.mal_id}">+ Watchlist</button>
        </div>
      `;
      container.appendChild(card);
    } catch (err) {
      console.warn('Failed to render anime card:', err, anime);
    }
  });

  // ✅ Only dispatch the event
  container.querySelectorAll('.add-watchlist').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const anime = animeArray.find(a => a.mal_id == id);
      const event = new CustomEvent('addToWatchlist', { detail: { anime } });
      document.dispatchEvent(event);
    });
  });
}

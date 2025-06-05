// AnimeList.mjs - Dynamically displays anime results based on mood/genre

export function renderAnimeList(containerId, animeArray) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!animeArray || animeArray.length === 0) {
    container.innerHTML = '<p>No anime found for the selected mood or genre.</p>';
    return;
  }

  animeArray.forEach((anime) => {
    const card = document.createElement('div');
    card.classList.add('anime-card');

    const badge = anime.trending ? '<span class="badge">Trending Now</span>' : '';

    card.innerHTML = `
      ${badge}
      <img src="${anime.image_url}" alt="${anime.title} poster">
      <div class="anime-info">
        <h3>${anime.title}</h3>
        <p class="rating">⭐ ${anime.rating || 'N/A'}</p>
        <p class="synopsis">${anime.synopsis || 'No synopsis available.'}</p>
        <p class="episodes">Episodes: ${anime.episodes || 'Unknown'}</p>
        <button class="add-watchlist" data-id="${anime.mal_id}">+ Watchlist</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('.add-watchlist').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const anime = animeArray.find(a => a.mal_id == id);
      const event = new CustomEvent('addToWatchlist', { detail: { anime } });
      document.dispatchEvent(event);
    });
  });
}

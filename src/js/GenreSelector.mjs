// GenreSelector.mjs - Handles Genre UI and Selections

let selectedGenre = null;

// Fetches genre options from the Jikan API
async function fetchGenres() {
  const res = await fetch('https://api.jikan.moe/v4/genres/anime');
  const data = await res.json();
  return data.data; // this is an array of genres
}

// Renders genre options to the UI
export async function renderGenreOptions(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const genres = await fetchGenres();
    container.innerHTML = '';

    genres.forEach((genre) => {
      const button = document.createElement('button');
      button.classList.add('genre-btn');
      button.textContent = genre.name;
      button.setAttribute('data-genre-id', genre.mal_id);

      button.addEventListener('click', () => selectGenre(genre.mal_id));
      container.appendChild(button);
    });
  } catch (error) {
    console.error('Failed to load genres:', error);
    container.innerHTML = '<p>Genres failed to load 😢</p>';
  }
}

// Handles genre selection and UI highlighting
function selectGenre(genreId) {
  selectedGenre = genreId;
  const buttons = document.querySelectorAll('.genre-btn');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-genre-id') === String(genreId));
  });

  const event = new CustomEvent('genreSelected', { detail: { genre: genreId } });
  document.dispatchEvent(event);
}

export function getSelectedGenre() {
  return selectedGenre;
}

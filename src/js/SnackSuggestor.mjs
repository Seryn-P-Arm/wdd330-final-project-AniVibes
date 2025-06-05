// SnackSuggestor.mjs - Displays snack results based on mood and anime

import { fetchSnackSuggestions } from './js/APIManager.mjs';

export async function renderSnackSuggestions(containerId, mood) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<p>Loading snack suggestions...</p>';

  try {
    const snacks = await fetchSnackSuggestions(mood);

    if (!snacks || snacks.length === 0) {
      container.innerHTML = '<p>No snacks found for this mood. Try a different one!</p>';
      return;
    }

    container.innerHTML = '';
    const snackGrid = document.createElement('div');
    snackGrid.classList.add('snack-grid');

    snacks.forEach(snack => {
      const card = document.createElement('div');
      card.classList.add('snack-card');

      card.innerHTML = `
        <img src="${snack.image}" alt="${snack.title}" class="snack-img" />
        <div class="snack-info">
          <h4>${snack.title}</h4>
          <p>${snack.summary ? snack.summary.substring(0, 80) + '...' : 'No description available.'}</p>
        </div>
      `;

      snackGrid.appendChild(card);
    });

    container.appendChild(snackGrid);
  } catch (error) {
    console.error('Error loading snack suggestions:', error);
    container.innerHTML = '<p>Failed to load snacks. Please try again later.</p>';
  }
}

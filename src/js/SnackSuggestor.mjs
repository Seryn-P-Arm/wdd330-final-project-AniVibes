// SnackSuggestor.mjs module - Handles Snack Pairings depending on the Mood and Genre
import { UIHandler } from './UIHandler.mjs';

// Render Snack Suggestions/Pairings
export function renderSnackSuggestions(containerId, snacks) {
  const containerWrapper = document.getElementById(containerId);
  if (!containerWrapper) return;

  const container = containerWrapper.querySelector('.snack-list');
  if (!container) {
    console.warn('Snack list container not found');
    return;
  }

  container.innerHTML = '<p>Loading snack suggestions...</p>';

  if (!snacks || snacks.length === 0) {
    container.innerHTML = '<p>No snacks found for this mood. Try a different one!</p>';
    return;
  }

  // Create a Snack Grid
  container.innerHTML = '';
  const snackGrid = document.createElement('div');
  snackGrid.classList.add('snack-grid');

  // Loop through the snack list to create a card for each one
  snacks.forEach(snack => {
    const card = document.createElement('div');
    card.classList.add('snack-card');

    card.innerHTML = `
      <img src="${snack.image}" alt="${snack.title}" class="snack-img" />
      <div class="snack-info">
        <h4>${snack.title}</h4>
        <p>${snack.summary ? snack.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'No description available.'}</p>
        <a href="${snack.sourceUrl}" target="_blank" rel="noopener noreferrer" class="recipe-link">View Full Recipe 🍽️</a>
      </div>
    `;

    // Create a button that will Add the Snack to Watchlist
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Snack Plan 🛒';
    addButton.classList.add('add-snack-btn');
    addButton.addEventListener('click', () => {
      const existing = JSON.parse(localStorage.getItem('snacks')) || [];
      const alreadyAdded = existing.some(s => s.id === snack.id);
      if (!alreadyAdded) {
        existing.push(snack);
        localStorage.setItem('snacks', JSON.stringify(existing));
        UIHandler.showToast(`${snack.title} added to your snack plan! 🎉`);
      } else {
        UIHandler.showToast(`${snack.title} is already in your snack plan! 📝`);
      }
    });
    card.appendChild(addButton);

    snackGrid.appendChild(card);
  });

  container.appendChild(snackGrid);
}

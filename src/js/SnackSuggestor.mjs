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
        <p>${snack.summary ? snack.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'No description available.'}</p>
        <a href="${snack.sourceUrl}" target="_blank" rel="noopener noreferrer" class="recipe-link">View Full Recipe 🍽️</a>
      </div>
    `;

    snackGrid.appendChild(card);
  });

  container.appendChild(snackGrid);
}

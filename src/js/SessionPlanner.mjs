// SessionPlanner.mjs - Builds the anime + snack watch session timeline
import { UIHandler } from './UIHandler.mjs';
import { WatchlistManager } from './WatchListManager.mjs'; // WatchListManager → WatchlistManager (consistent casing)

export function buildSessionTimeline(containerId, watchlist, snacks) {
  const section = document.getElementById(containerId);
  const container = section.querySelector('.session-output');
  container.innerHTML = ''; // ✨ Clear the container

  if (!watchlist || watchlist.length === 0) {
    container.innerHTML = '<p>Your session is empty. Add anime to get started!</p>';
    return;
  }

  let totalTime = 0;
  const timeline = document.createElement('div');
  timeline.classList.add('timeline');

  // 🍿 Loop through each anime and build timeline blocks
  watchlist.forEach((anime, index) => {
    const block = document.createElement('div');
    block.classList.add('timeline-block');

    const timeEstimate = anime.episodes ? anime.episodes * 24 : 0;
    totalTime += timeEstimate;

    block.innerHTML = `
      <h3>${anime.title}</h3>
      <p>Episodes: ${anime.episodes || 'N/A'}</p>
      <p>Estimated Time: ${timeEstimate} mins</p>
    `;
    timeline.appendChild(block);
  });

  // 🍱 Snack Section: A standalone visual summary of all snacks
  if (snacks && snacks.length > 0) {
    const snackSection = document.createElement('div');
    snackSection.classList.add('snack-section');

    const snackHeader = document.createElement('h3');
    snackHeader.textContent = 'Snack Plan 🍱';
    snackSection.appendChild(snackHeader);

    const snackGrid = document.createElement('div');
    snackGrid.classList.add('snack-grid');

    snacks.forEach(snack => {
      const snackCard = document.createElement('div');
      snackCard.classList.add('snack-card');
      snackCard.innerHTML = `
        <img src="${snack.image}" alt="${snack.title}" class="snack-img" />
        <h4>${snack.title}</h4>
        <a href="${snack.sourceUrl}" target="_blank">View Recipe</a>
      `;
      snackGrid.appendChild(snackCard);
    });

    snackSection.appendChild(snackGrid);
    container.appendChild(snackSection);
  }

  // 📅 Total Watch Time Summary
  const summary = document.createElement('div');
  summary.classList.add('timeline-summary');
  summary.innerHTML = `<h3>Total Watch Time: ${totalTime} mins</h3>`;

  container.appendChild(timeline);
  container.appendChild(summary);

  // 🧹 Clear snack plan listener
  document.getElementById('clear-snacks')?.addEventListener('click', () => {
  localStorage.removeItem('snacks');

  // Rebuild timeline without snacks
  const watchlist = WatchlistManager.getWatchlist();
  const snacks = []; // Empty snacks array
  buildSessionTimeline('session-plan', watchlist, snacks);

  UIHandler.showToast('Snacks cleared! Time to bring your own popcorn 🍿', 'info');
});

}

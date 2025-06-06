// SessionPlanner.mjs - Builds the anime + snack watch session timeline

export function buildSessionTimeline(containerId, watchlist, snacks) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!watchlist || watchlist.length === 0) {
    container.innerHTML = '<p>Your session is empty. Add anime to get started!</p>';
    return;
  }

  let totalTime = 0;
  const timeline = document.createElement('div');
  timeline.classList.add('timeline');

  watchlist.forEach((anime, index) => {
    const block = document.createElement('div');
    block.classList.add('timeline-block');

    const timeEstimate = anime.episodes ? anime.episodes * 24 : 0; // avg 24 min per ep
    totalTime += timeEstimate;

    const snack = snacks[index] || null;

    block.innerHTML = `
      <h3>${anime.title}</h3>
      <p>Episodes: ${anime.episodes || 'N/A'}</p>
      <p>Estimated Time: ${timeEstimate} mins</p>
      ${snack ? `
        <div class="snack-pairing">
          <img src="${snack.image}" alt="${snack.title}" class="snack-img">
          <p><strong>Snack:</strong> ${snack.title}</p>
        </div>
      ` : '<p><em>No snack paired.</em></p>'}
    `;

    timeline.appendChild(block);
  });

  const summary = document.createElement('div');
  summary.classList.add('timeline-summary');
  summary.innerHTML = `<h3>Total Watch Time: ${totalTime} mins</h3>`;

  container.appendChild(timeline);
  container.appendChild(summary);
}

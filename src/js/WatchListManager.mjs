// WatchlistManager.mjs - Manages user watchlist & localStorage
import { UIHandler } from './UIHandler.mjs';

const WATCHLIST_KEY = 'anivibes_watchlist';

export const WatchlistManager = {
  getWatchlist() {
    const list = localStorage.getItem(WATCHLIST_KEY);
    return list ? JSON.parse(list) : [];
  },

  addToWatchlist(anime) {
    const currentList = this.getWatchlist();
    const alreadyExists = currentList.find(item => item.mal_id === anime.mal_id);

    if (!alreadyExists) {
      currentList.push(anime);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentList));
      return true;
    }
    return false;
  },

  removeFromWatchlist(mal_id) {
    const currentList = this.getWatchlist();
    const updatedList = currentList.filter(item => item.mal_id !== mal_id);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedList));
  },

  clearWatchlist() {
    localStorage.removeItem(WATCHLIST_KEY);
  },

  isInWatchlist(mal_id) {
    return this.getWatchlist().some(item => item.mal_id === mal_id);
  },

  renderWatchlist() {
    const watchlist = this.getWatchlist();
    const container = document.querySelector('.watchlist-items');
    if (!container) return;

    container.innerHTML = ''; // Clear existing items first

    watchlist.forEach(anime => {
      const li = document.createElement('li');
      li.classList.add('watchlist-card');

      // Anime title
      const titleSpan = document.createElement('span');
      titleSpan.classList.add('watchlist-title');
      titleSpan.textContent = anime.title;

      // Optional: Add poster image
      const img = document.createElement('img');
      img.src = anime.images?.jpg?.image_url || '';
      img.alt = anime.title;
      img.classList.add('watchlist-thumb');

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '❌';
      removeBtn.classList.add('remove-button');
      removeBtn.addEventListener('click', () => {
        this.removeFromWatchlist(anime.mal_id);
        this.renderWatchlist();
        UIHandler.showToast('Anime removed successfully');
      });

      li.appendChild(img);
      li.appendChild(titleSpan);
      li.appendChild(removeBtn);
      container.appendChild(li);
    });
  }
};

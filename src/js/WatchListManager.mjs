// WatchlistManager.mjs - Manages user watchlist & localStorage

const WATCHLIST_KEY = 'anivibes_watchlist';

export const WatchlistManager = {
  getWatchlist() {
    const list = localStorage.getItem(WATCHLIST_KEY);
    return list ? JSON.parse(list) : [];
  },

  addToWatchlist(anime) {
    const currentList = this.getWatchlist();
    if (!currentList.find(item => item.mal_id === anime.mal_id)) {
      currentList.push(anime);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentList));
    }
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
  }
};

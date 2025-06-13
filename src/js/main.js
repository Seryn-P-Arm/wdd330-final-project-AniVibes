// main.js - Entry Point for AniVibes Web Application

import { fetchAnimeByMood, fetchSnacksByMood } from './APImanager.mjs';  // Fix casing: APImanager → APIManager
import { setupMoodSelector } from './MoodSelector.mjs';
import { renderMoodOptions, setDefaultMood } from './MoodSelector.mjs';
import { renderGenreOptions } from './GenreSelector.mjs';
import { renderAnimeList } from './AnimeList.mjs';
import { renderSnackSuggestions } from './SnackSuggestor.mjs';
import { WatchlistManager } from './WatchListManager.mjs'; // WatchListManager → WatchlistManager (consistent casing)
import { buildSessionTimeline } from './SessionPlanner.mjs';
import { UIHandler } from './UIHandler.mjs';
import { loadFromLocalStorage } from './utils.mjs';

// Entry Function
document.addEventListener('DOMContentLoaded', () => {
  console.log('AniVibes App Loaded');

  renderMoodOptions('.mood-options');
  setDefaultMood(); // optionally set initial mood

  renderGenreOptions('.genre-options');

  let currentMood = null;
  let currentGenre = null;

  document.addEventListener('genreSelected', (e) => {
    currentGenre = e.detail.genre;
    updateRecommendations();
  });

  async function updateRecommendations() {
    if (!currentMood) return;

    const animeResults = await fetchAnimeByMood(currentMood, currentGenre);
    console.log('🎥 Anime fetched:', animeResults);

    renderAnimeList('anime-list', animeResults); // 💥 Fixed

    const snackResults = await fetchSnacksByMood(currentMood);
    renderSnackSuggestions('snack-suggestions', snackResults); // Consistent and happy
  }


  // Setup UI elements and event listeners
  setupMoodSelector(async (selectedMood) => {
    console.log("🧠 Mood selected:", selectedMood);
    currentMood = selectedMood;
    await updateRecommendations(); // call the unified updater
  });

  // Load existing watchlist from storage or wherever your WatchlistManager does it
  WatchlistManager.renderWatchlist();

  // Initialize session planner functionality
  document.getElementById('generate-session').addEventListener('click', () => {
    // Load watchlist from localStorage or get from WatchlistManager (depending on your setup) 
    const watchlist = WatchlistManager.getWatchlist();

    // Load snacks from localStorage — here's the magic line you asked about
    const snacks = loadFromLocalStorage('snacks');

    buildSessionTimeline('session-plan', watchlist, snacks);
  });

  document.addEventListener('addToWatchlist', (e) => {
    const { anime } = e.detail;
    const added = WatchlistManager.addToWatchlist(anime);
    WatchlistManager.renderWatchlist();

    UIHandler.showToast(
      added ? `${anime.title} added to your watchlist! 🎉` : `${anime.title} is already there! 📝`,
      added ? 'success' : 'info'
    );
  });

  // UI enhancements
  UIHandler.init();
});

// main.js - Entry Point for AniVibes Web Application

import { fetchAnimeByMood, fetchSnacksByMood } from './js/APIManager.mjs';
import { setupMoodSelector } from './js/MoodSelector.mjs';
import { renderAnimeList } from './js/AnimeList.mjs';
import { renderSnackSuggestions } from './js/SnackSuggestor.mjs';
import { setupWatchlist } from './js/WatchlistManager.mjs';
import { buildSessionTimeline } from './js/SessionPlanner.mjs';
import { initUIAnimations } from './js/UIHandler.mjs';
import { loadFromLocalStorage } from './js/utils.mjs';

// Entry Function
document.addEventListener('DOMContentLoaded', () => {
  console.log('AniVibes App Loaded');

  // Setup UI elements and event listeners
  setupMoodSelector(async (selectedMood, selectedGenre) => {
    console.log(`Selected Mood: ${selectedMood}, Genre: ${selectedGenre}`);

    const animeResults = await fetchAnimeByMood(selectedMood, selectedGenre);
    renderAnimeList(animeResults);

    const snackResults = await fetchSnacksByMood(selectedMood);
    renderSnackSuggestions(snackResults);
  });

  // Load existing watchlist from storage
  setupWatchlist();

  // Initialize session planner functionality
  buildSessionTimeline();

  // UI enhancements
  initUIAnimations();
});

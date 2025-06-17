// MoodSelector.mjs - Handles Mood UI and Selections

const moodOptions = [
  { label: 'Relaxing', emoji: '😌' },
  { label: 'Emotional', emoji: '😭' },
  { label: 'Scary', emoji: '👻' },
  { label: 'Funny', emoji: '😂' },
  { label: 'Exciting', emoji: '🔥' },
  { label: 'Romantic', emoji: '💖' },
  { label: 'Chill', emoji: '🍃' },
  { label: 'Mysterious', emoji: '🕵️‍♂️' }
];

let selectedMood = null;

// Renders mood options to the UI
export function renderMoodOptions(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';

  moodOptions.forEach((mood) => {
    const button = document.createElement('button');
    button.classList.add('mood-btn');
    button.textContent = `${mood.emoji} ${mood.label}`;
    button.setAttribute('data-mood', mood.label.toLowerCase());
    button.addEventListener('click', () => selectMood(mood.label.toLowerCase()));
    container.appendChild(button);
  });
}

// Handles mood selection and UI highlighting
function selectMood(mood) {
  selectedMood = mood;
  const buttons = document.querySelectorAll('.mood-btn');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-mood') === mood);
  });
  
  const event = new CustomEvent('moodSelected', { detail: { mood } });
  document.dispatchEvent(event);
}

export function getSelectedMood() {
  return selectedMood;
}

export function setDefaultMood(mood = 'relaxing') {
  selectMood(mood);
}

// Initializes the mood selector with event listener
export function setupMoodSelector(callback) {
  const container = document.querySelector('#mood-selector .mood-options');
  renderMoodOptions('.mood-options');

  setDefaultMood();

  // Listen for mood selection changes
  document.addEventListener('moodSelected', (event) => {
    const selectedMood = event.detail.mood;
    const selectedGenre = null;
    callback(selectedMood, selectedGenre);
  });
}
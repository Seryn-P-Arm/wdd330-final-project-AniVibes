// UIHandler.mjs - Animations & dynamic UI updates

export const UIHandler = {
  toastQueue: new Set(),

  init() {
    this.setupAnimations();
    this.observeTrendingBadges();
    this.setupToastContainer();
  },

  setupAnimations() {
    const animatableElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-active');
        }
      });
    }, { threshold: 0.1 });

    animatableElements.forEach(el => observer.observe(el));
  },

  observeTrendingBadges() {
    const trendingBadges = document.querySelectorAll('[data-trending="true"]');
    trendingBadges.forEach(badge => {
      badge.classList.add('trending-flash');
    });
  },

  setupToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  },

  showToast(message, type = 'info') {
    const key = `${type}:${message}`;
    if (this.toastQueue.has(key)) return;

    this.toastQueue.add(key);

    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');

      // Remove toast after it shows
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
          toast.remove();
          this.toastQueue.delete(key);
        }, 300);
      }, 3000);
    }, 50);
  },

  toggleLoading(state, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.classList.toggle('loading', state);
  }
};

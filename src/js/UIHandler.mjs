// UIHandler.mjs - Animations & dynamic UI updates

export const UIHandler = {
  init() {
    this.setupAnimations();
    this.observeTrendingBadges();
  },

  setupAnimations() {
    const animatableElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-active');
        }
      });
    }, {
      threshold: 0.1
    });

    animatableElements.forEach(el => observer.observe(el));
  },

  observeTrendingBadges() {
    const trendingBadges = document.querySelectorAll('[data-trending="true"]');
    trendingBadges.forEach(badge => {
      badge.classList.add('trending-flash');
    });
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }, 100);
  },

  toggleLoading(state, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (state) {
      target.classList.add('loading');
    } else {
      target.classList.remove('loading');
    }
  }
};

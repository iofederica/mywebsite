/* ============================================================
   THEME TOGGLE
   ============================================================ */

(function () {
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeBtn');
  const dropdown  = document.getElementById('themeDropdown');
  const labelEl   = document.getElementById('themeLabel');
  const iconEl    = document.getElementById('themeIcon');

  const icons = {
    light: '<i class="fa-solid fa-sun"></i>',
    dark:  '<i class="fa-solid fa-moon"></i>',
    auto:  '<i class="fa-solid fa-circle-half-stroke"></i>',
  };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    labelEl.textContent = theme;
    iconEl.innerHTML    = icons[theme];
    localStorage.setItem('theme', theme);
  }

  // Apply saved preference on load (anti-FOUC script in <head> already set
  // the attribute; this just syncs the button label/icon)
  const saved = localStorage.getItem('theme') || 'auto';
  applyTheme(saved);

  // Open / close dropdown
  themeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    themeBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close on outside click
  document.addEventListener('click', function () {
    dropdown.classList.remove('open');
    themeBtn.setAttribute('aria-expanded', 'false');
  });

  // Selection
  dropdown.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      applyTheme(btn.dataset.themeVal);
      dropdown.classList.remove('open');
      themeBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ============================================================
   SMOOTH SCROLL TO HOME
   ============================================================ */

function scrollToHome() {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}


/* ============================================================
   CAROUSELS
   ============================================================ */

(function () {
  function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const wrapper  = carousel.closest('.carousel-wrapper');
    const prevBtn  = wrapper.querySelector('.carousel-prev');
    const nextBtn  = wrapper.querySelector('.carousel-next');

    // Scroll by roughly one card width
    function getScrollAmount() {
      const card = carousel.querySelector('.card');
      return card ? card.offsetWidth + 14 : 200;
    }

    prevBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Optional: also allow mouse-wheel horizontal scroll over the carousel
    carousel.addEventListener('wheel', function (e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        carousel.scrollBy({ left: e.deltaY * 1.5, behavior: 'smooth' });
      }
    }, { passive: false });
  }

  setupCarousel('projects-carousel');
  setupCarousel('learning-carousel');
})();

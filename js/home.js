// ============================================
// Jumia — Homepage Controller
// ============================================

import {
  initStore,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from './store.js';

import {
  renderHeader,
  renderFooter,
  renderCategorySection,
} from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize store (seeds data on first visit)
  initStore();

  // 2. Render header
  renderHeader('home');

  // 3. Render hero carousel
  renderHeroCarousel();

  // 4. Render category sections
  renderCategorySections();

  // 5. Render footer
  renderFooter();

  // 6. Attach scroll arrow listeners
  attachScrollArrows();
});

// ==========================================
// Hero Carousel
// ==========================================

function renderHeroCarousel() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const slides = [
    {
      title: 'Jumia Grand Launch',
      subtitle: 'Up to 60% OFF on Electronics, Fashion & More!',
      cta: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
    },
    {
      title: 'New Phones, Best Prices',
      subtitle: 'Latest Samsung, Tecno & iPhones at unbeatable Kenyan prices.',
      cta: 'Browse Phones',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80',
    },
    {
      title: 'Free Delivery Friday',
      subtitle: 'Enjoy FREE delivery on all orders above KSh 2,000 every Friday!',
      cta: 'Learn More',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ded7a60e4?w=1600&q=80',
    },
  ];

  const slidesHTML = slides
    .map(
      (slide, i) => `
      <div class="hero-slide ${i === 0 ? 'active' : ''}" data-index="${i}" style="background-image: linear-gradient(rgba(13, 13, 26, 0.4), rgba(13, 13, 26, 0.8)), url('${slide.image}'); background-size: cover; background-position: center;">
        <div class="hero-slide-content container">
          <h1 class="hero-title">${slide.title}</h1>
          <p class="hero-subtitle">${slide.subtitle}</p>
          <a href="#categories-start" class="btn btn-lg hero-cta">${slide.cta}</a>
        </div>
        <div class="hero-slide-overlay"></div>
      </div>`
    )
    .join('');

  const dotsHTML = slides
    .map(
      (_, i) =>
        `<button class="hero-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
    )
    .join('');

  const carouselHTML = `
    <section class="hero-carousel" id="hero-carousel">
      <div class="hero-slides">
        ${slidesHTML}
      </div>
      <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous slide">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next slide">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="hero-dots" id="hero-dots">
        ${dotsHTML}
      </div>
    </section>
  `;

  main.insertAdjacentHTML('beforeend', carouselHTML);

  // Carousel logic
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoRotate;

  function goToSlide(index) {
    const allSlides = document.querySelectorAll('.hero-slide');
    const allDots = document.querySelectorAll('.hero-dot');

    allSlides.forEach((s) => s.classList.remove('active'));
    allDots.forEach((d) => d.classList.remove('active'));

    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    allSlides[currentSlide].classList.add('active');
    allDots[currentSlide].classList.add('active');
  }

  function startAutoRotate() {
    autoRotate = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function stopAutoRotate() {
    clearInterval(autoRotate);
  }

  startAutoRotate();

  document.getElementById('hero-prev')?.addEventListener('click', () => {
    stopAutoRotate();
    goToSlide(currentSlide - 1);
    startAutoRotate();
  });

  document.getElementById('hero-next')?.addEventListener('click', () => {
    stopAutoRotate();
    goToSlide(currentSlide + 1);
    startAutoRotate();
  });

  document.querySelectorAll('.hero-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      stopAutoRotate();
      goToSlide(parseInt(dot.dataset.index));
      startAutoRotate();
    });
  });
}

// ==========================================
// Category Sections
// ==========================================

function renderCategorySections() {
  const main = document.getElementById('main-content');
  if (!main) return;

  // Anchor for CTA scrolling
  main.insertAdjacentHTML('beforeend', '<div id="categories-start"></div>');

  const categories = getCategories();
  let sectionsHTML = '';

  categories.forEach((cat) => {
    const products = getProductsByCategory(cat);
    if (products.length > 0) {
      sectionsHTML += renderCategorySection(cat, products);
    }
  });

  main.insertAdjacentHTML('beforeend', sectionsHTML);
}

// ==========================================
// Scroll Arrow Listeners
// ==========================================

function attachScrollArrows() {
  document.querySelectorAll('.scroll-arrow').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      const row = document.getElementById(`${sectionId}-row`);
      if (!row) return;

      const scrollAmount = row.clientWidth * 0.75;
      const direction = btn.classList.contains('scroll-arrow-left') ? -1 : 1;

      row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    });
  });
}

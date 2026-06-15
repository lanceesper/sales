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

  // 3. Render hero section (sidebar + carousel + side cards)
  renderHeroSection();

  // 4. Render category sections
  renderCategorySections();

  // 5. Render footer
  renderFooter();

  // 6. Attach scroll arrow listeners
  attachScrollArrows();
});

// ==========================================
// Sub-category Data for Flyout Menus
// ==========================================

const subCategoryData = {
  'Electronics': [
    { heading: 'TV & VIDEO', items: ['Smart TVs', 'LED TVs', 'TV Accessories', 'Projectors', 'DVD Players'] },
    { heading: 'AUDIO', items: ['Speakers', 'Headphones', 'Earbuds', 'Soundbars', 'Home Theatre'] },
    { heading: 'ACCESSORIES', items: ['Power Banks', 'Chargers', 'Cables', 'Memory Cards', 'Batteries'] },
  ],
  'Phones & Tablets': [
    { heading: 'SMARTPHONES', items: ['Samsung', 'Tecno', 'iPhone', 'Xiaomi', 'Nokia', 'Infinix'] },
    { heading: 'TABLETS', items: ['Samsung Tablets', 'iPad', 'Android Tablets', 'Kids Tablets'] },
    { heading: 'ACCESSORIES', items: ['Phone Cases', 'Screen Protectors', 'Chargers', 'Earphones', 'Power Banks'] },
  ],
  'Computing': [
    { heading: 'LAPTOPS', items: ['HP Laptops', 'Lenovo Laptops', 'Dell Laptops', 'MacBooks', 'Gaming Laptops'] },
    { heading: 'PERIPHERALS', items: ['Keyboards', 'Mice', 'Monitors', 'Printers', 'Webcams'] },
    { heading: 'STORAGE', items: ['Flash Drives', 'External HDDs', 'SSDs', 'Memory Cards', 'USB Hubs'] },
  ],
  'Fashion': [
    { heading: "MEN'S FASHION", items: ['Shirts', 'Trousers', 'Shoes', 'Watches', 'Accessories'] },
    { heading: "WOMEN'S FASHION", items: ['Dresses', 'Tops', 'Handbags', 'Shoes', 'Jewelry'] },
    { heading: 'FOOTWEAR', items: ['Sneakers', 'Sandals', 'Formal Shoes', 'Boots', 'Sports Shoes'] },
  ],
  'Home & Kitchen': [
    { heading: 'KITCHEN & DINING', items: ['Cookware', 'Kitchen Utensils', 'Water Dispensers', 'Cutlery', 'Storage'] },
    { heading: 'HOME APPLIANCES', items: ['Blenders', 'Kettles', 'Microwaves', 'Refrigerators', 'Cookers'] },
    { heading: 'HOME DECOR', items: ['Rugs & Carpets', 'Wall Art', 'Curtains', 'Bedding', 'Lighting'] },
  ],
  'Health & Beauty': [
    { heading: 'SKINCARE', items: ['Moisturizers', 'Sunscreen', 'Serums', 'Face Wash', 'Masks'] },
    { heading: 'MAKEUP', items: ['Foundation', 'Lipstick', 'Mascara', 'Eyeshadow', 'Brushes'] },
    { heading: 'PERSONAL CARE', items: ['Toothpaste', 'Deodorant', 'Hair Care', 'Perfumes', 'Shaving'] },
  ],
  'Sports & Outdoors': [
    { heading: 'FITNESS', items: ['Yoga Mats', 'Dumbbells', 'Resistance Bands', 'Skipping Ropes', 'Gym Wear'] },
    { heading: 'OUTDOOR', items: ['Hiking Bags', 'Camping Gear', 'Water Bottles', 'Sunglasses', 'Hats'] },
    { heading: 'SPORTS', items: ['Footballs', 'Volleyballs', 'Basketball', 'Running Shoes', 'Jerseys'] },
  ],
  'Grocery': [
    { heading: 'DAIRY & EGGS', items: ['Fresh Milk', 'Yoghurt', 'Cheese', 'Eggs', 'Butter'] },
    { heading: 'BEVERAGES', items: ['Tea', 'Coffee', 'Juice', 'Water', 'Soda'] },
    { heading: 'PANTRY', items: ['Rice', 'Cooking Oil', 'Flour', 'Sugar', 'Spices'] },
  ],
};

// Category icons as SVG strings
const categoryIcons = {
  'Electronics': '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  'Phones & Tablets': '<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  'Computing': '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 17h20"/><path d="M6 21h12"/></svg>',
  'Fashion': '<svg viewBox="0 0 24 24"><path d="M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a2 2 0 00-1.34 2.23l1.09 7.97C3.75 16.29 6 18 6 18v3a1 1 0 001 1h10a1 1 0 001-1v-3s2.25-1.71 2.63-4.34l1.09-7.97a2 2 0 00-1.34-2.23z"/></svg>',
  'Home & Kitchen': '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  'Health & Beauty': '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  'Sports & Outdoors': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  'Grocery': '<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
};

// ==========================================
// Hero Section (3-Column)
// ==========================================

function renderHeroSection() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const categories = getCategories();

  // Build sidebar items
  const sidebarItems = categories.map((cat) => {
    const icon = categoryIcons[cat] || categoryIcons['Electronics'];
    const subCats = subCategoryData[cat] || [];

    const flyoutHTML = subCats.length > 0 ? `
      <div class="sidebar-flyout">
        <div class="flyout-grid">
          ${subCats.map(group => `
            <div class="flyout-group">
              <h4>${group.heading}</h4>
              ${group.items.map(item => `<a href="#">${item}</a>`).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div class="sidebar-category-item">
        <span class="sidebar-category-icon">${icon}</span>
        <span class="sidebar-category-name">${cat}</span>
        <span class="sidebar-category-arrow">
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </span>
        ${flyoutHTML}
      </div>
    `;
  }).join('');

  // Build carousel slides
  const slides = [
    {
      title: 'Jumia Anniversary Sale',
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
      <div class="hero-slide ${i === 0 ? 'active' : ''}" data-index="${i}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5)), url('${slide.image}'); background-size: cover; background-position: center;">
        <div class="hero-slide-content">
          <h1 class="hero-title">${slide.title}</h1>
          <p class="hero-subtitle">${slide.subtitle}</p>
          <a href="#categories-start" class="hero-cta">${slide.cta}</a>
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

  // Build side cards
  const sideCardsHTML = `
    <div class="hero-side">
      <a href="#" class="hero-side-card">
        <div class="hero-side-card-icon" style="background: #E8F5E9;">📞</div>
        <div class="hero-side-card-text">
          <div class="hero-side-card-title">CALL TO ORDER</div>
          <div class="hero-side-card-subtitle">0711 011 011</div>
        </div>
      </a>
      <a href="#" class="hero-side-card">
        <div class="hero-side-card-icon" style="background: #FFF3E0;">🚚</div>
        <div class="hero-side-card-text">
          <div class="hero-side-card-title">FREE DELIVERY</div>
          <div class="hero-side-card-subtitle">Orders above KSh 2,000</div>
        </div>
      </a>
      <a href="#" class="hero-side-card">
        <div class="hero-side-card-icon" style="background: #E3F2FD;">💰</div>
        <div class="hero-side-card-text">
          <div class="hero-side-card-title">SELL ON JUMIA</div>
          <div class="hero-side-card-subtitle">Millions of Visitors</div>
        </div>
      </a>
      <a href="#" class="hero-side-card">
        <div class="hero-side-card-icon" style="background: #FCE4EC;">🏪</div>
        <div class="hero-side-card-text">
          <div class="hero-side-card-title">BEST PRICES</div>
          <div class="hero-side-card-subtitle">As seen on Price Check</div>
        </div>
      </a>
    </div>
  `;

  // Assemble the hero section
  const heroHTML = `
    <section class="hero-section" id="hero-section">
      <div class="hero-sidebar" id="hero-sidebar">
        ${sidebarItems}
      </div>

      <div class="hero-carousel" id="hero-carousel">
        <div class="hero-slides">
          ${slidesHTML}
        </div>
        <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div class="hero-dots" id="hero-dots">
          ${dotsHTML}
        </div>
      </div>

      ${sideCardsHTML}
    </section>
  `;

  main.insertAdjacentHTML('beforeend', heroHTML);

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

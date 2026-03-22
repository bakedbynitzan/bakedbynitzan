/* ============================================
   ניצן - משהו מתוק | Product Catalog & UI Logic
   ============================================ */

const WHATSAPP_BASE = 'https://wa.me/9720505851612?text=';

const products = [
  {
    id: 1,
    name: 'אלפחורס',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 60,
    image: 'images/alfachores.png',
    description: '10 יחידות אלפחורס עם מילוי דולסה דה לצ\'ה וקוקוס. עוגיית החמאה הקלאסית שנמסה בפה.'
  },
  {
    id: 2,
    name: 'עוגיות שוקולד חלב ובלונדי',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 95,
    image: 'images/cookies-blondi.png',
    badge: 'פופולרי',
    description: '5 יחידות קוטר 8 (גדולות). עוגיות שוקולד חלב ובלונדי - קריספי מבחוץ ורך מבפנים.'
  },
  {
    id: 3,
    name: 'מגולגלות נוטלה וקינדר',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 76,
    image: 'images/megulgalot-nutella.png',
    description: '12 יחידות מגולגלות במילוי נוטלה וקינדר. שכבות של בצק חמאה עם שוקולד - כל ביס הוא חוויה.'
  },
  {
    id: 4,
    name: 'מגולגלות קינדר',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 76,
    image: 'images/megulgalot-kinder.png',
    description: '12 יחידות מגולגלות קקאו במילוי קינדר. בצק שוקולד כהה עם שכבות קרם קינדר לבן.'
  },
  {
    id: 5,
    name: 'כדורי שוקולד',
    category: 'desserts',
    categoryLabel: 'קינוחים',
    price: 85,
    image: 'images/chocolate-balls.png',
    description: '20 יחידות כדורי שוקולד - קוקוס ושוקולד עם סוכריות צבעוניות. מושלם לאירוח ולמתנה.'
  },
  {
    id: 6,
    name: '6 עוגיות טעמים',
    category: 'cookies',
    categoryLabel: 'עוגיות',
    price: 160,
    image: 'images/cookies-6-flavors.png',
    badge: 'הנמכר ביותר',
    description: 'מבחר 6 עוגיות בטעמים: קינדר ונוטלה, חצי חצי, אמסטרדם, שוקולד קונפטי, 100% פיסטוק ופירות יער.'
  },
  {
    id: 7,
    name: 'מארז קייק פופס ועוגיות',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 200,
    image: 'images/box-cakepops.png',
    description: 'מארז מפנק עם עוגיות קרמל מלוח, נוטלה ושוקולד חלב לצד קייק פופס שוקולד חלב עם סרט ורוד.'
  },
  {
    id: 8,
    name: 'מארז מגולגלות ובראוניז',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 170,
    image: 'images/box-brownies-megulgalot.png',
    description: '16 מגולגלות קינדר + בראוניז 16x16 עם צ\'אנקים של שוקולד לבן ומריר וזילוף נוטלה.'
  },
  {
    id: 9,
    name: 'מארז עוגייה ענקית ומגולגלות',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 300,
    image: 'images/box-giant-cookie.png',
    description: 'עוגייה ענקית קוטר 16 עם מילוי ומלא תוספות + 16 יח\' מגולגלות קינדר. מתנה מרשימה!'
  },
  {
    id: 10,
    name: 'מארז יום הולדת',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 300,
    image: 'images/box-birthday.png',
    badge: 'ליום הולדת',
    description: 'מארז חגיגי עם עוגת שוקולד מעוצבת, מגולגלות נוטלה וקינדר, אלפחורס וקייק פופס. מושלם לחגיגה!'
  },
  {
    id: 11,
    name: 'מארז פרימיום',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 340,
    image: 'images/box-premium-340.png',
    badge: 'פרימיום',
    description: 'חיתוכיות שוקולד 16x16, כדורי קדאיף דובאי, 14 מגולגלות נוטלה וקינדר ועוגיות קראמבל פיסטוק עם ליבת שוקולד לבן.'
  },
  {
    id: 12,
    name: 'מארז VIP',
    category: 'boxes',
    categoryLabel: 'מארזים',
    price: 450,
    image: 'images/box-premium-450.png',
    badge: 'VIP',
    description: 'המארז הגדול והמרשים ביותר! עוגיות קראמבל פיסטוק, מגולגלות, בראוניז פיסטוק, גלילי וופל ועוד. מתנה שלא שוכחים.'
  }
];

function createWhatsAppLink(productName) {
  const msg = encodeURIComponent(`היי ניצן! ראיתי את הקטלוג ואשמח להזמין: ${productName}`);
  return `${WHATSAPP_BASE}${msg}`;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="product-card-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
    </div>
    <div class="product-card-content">
      <div class="product-card-category">${product.categoryLabel}</div>
      <h3 class="product-card-title">${product.name}</h3>
      <p class="product-card-description">${product.description}</p>
      <div class="product-card-footer">
        <span class="product-card-price">${product.price} &#8362;</span>
        <a href="${createWhatsAppLink(product.name)}" class="product-card-order" target="_blank" rel="noopener" onclick="event.stopPropagation();">
          להזמנה
        </a>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openModal(product));
  return card;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  filtered.forEach((product, i) => {
    const card = createProductCard(product);
    grid.appendChild(card);
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add('visible'), i * 60);
    });
  });
}

// --- Filters ---

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// --- Modal ---

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal(product) {
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalCategory').textContent = product.categoryLabel;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = `${product.price} \u20AA`;
  document.getElementById('modalOrderBtn').href = createWhatsAppLink(product.name);

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- Navbar scroll effect ---

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- Mobile Menu ---

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// --- Smooth scroll for anchor links ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Init ---

renderProducts();

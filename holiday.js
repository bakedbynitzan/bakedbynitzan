/* ============================================================
   ספיישל ט"ו באב — לבבות אדומים נופלים + באדג' צף בצד
   קובץ עצמאי ובטוח להסרה (מחיקת שתי השורות מ-index.html מספיקה).
   פעיל אוטומטית רק בחלון התאריכים; מחוצה לו הקוד לא עושה כלום.
   ============================================================ */
(function () {
  'use strict';

  // ── חלון הפעילות: ט"ו באב תשפ"ו ≈ 29/7/2026 ──
  // פעיל 24/7/2026 עד סוף 31/7/2026. אחרי כן — כבוי אוטומטית.
  var START = new Date(2026, 6, 24, 0, 0, 0);
  var END = new Date(2026, 7, 1, 0, 0, 0); // 1/8/2026 00:00
  var now = new Date();
  if (now < START || now >= END) return;

  // גווני אדום/ורוד ללבבות
  var COLORS = ['#e11d48', '#dc2626', '#e63950', '#ff4d6d', '#ff5c8a', '#c81e3a', '#ff2d55'];
  var heartsLayer = null;
  var heartTimer = null;

  function motionOff() {
    try {
      if (document.documentElement.classList.contains('a11y-no-animations')) return true;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    } catch (e) {}
    return false;
  }

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  function rand(min, max) { return min + Math.random() * (max - min); }

  // ── לבבות נופלים ──
  function spawnHeart() {
    if (!heartsLayer) return;
    var h = document.createElement('span');
    h.className = 'tubav-heart';
    h.textContent = Math.random() < 0.15 ? '♡' : '♥';
    var dur = rand(5, 11);
    h.style.left = rand(0, 100).toFixed(2) + 'vw';
    h.style.fontSize = rand(12, 34).toFixed(0) + 'px';
    h.style.color = COLORS[(Math.random() * COLORS.length) | 0];
    h.style.animationDuration = dur.toFixed(2) + 's';
    h.style.setProperty('--tubav-drift', rand(-80, 80).toFixed(0) + 'px');
    h.style.setProperty('--tubav-spin', rand(-90, 90).toFixed(0) + 'deg');
    h.style.setProperty('--tubav-opacity', rand(0.35, 0.8).toFixed(2));
    heartsLayer.appendChild(h);
    setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, dur * 1000 + 600);
  }

  function startHearts() {
    heartsLayer = document.createElement('div');
    heartsLayer.id = 'tubav-hearts';
    heartsLayer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(heartsLayer);

    var rate = window.innerWidth < 768 ? 550 : 330;
    var cap = window.innerWidth < 768 ? 45 : 75;
    heartTimer = setInterval(function () {
      if (motionOff()) { heartsLayer.innerHTML = ''; return; }
      if (document.hidden) return;
      if (heartsLayer.childElementCount < cap) {
        spawnHeart();
        if (Math.random() < 0.5) spawnHeart(); // לפעמים שניים בבת אחת — צפיפות גבוהה יותר
      }
    }, rate);

    for (var i = 0; i < 16; i++) setTimeout(spawnHeart, i * 150);
  }

  // ── פתיחת מוצר הספיישל ── מאתר את כרטיס המוצר לפי השם ומדמה לחיצה
  // (פותח את המודאל הקיים של האתר — עובד גם אם הנתונים מגיעים מ-Firebase/GitHub)
  function findSpecialCard() {
    var cards = document.querySelectorAll('.product-card');
    for (var i = 0; i < cards.length; i++) {
      var title = cards[i].querySelector('.product-card-title');
      if (title && title.textContent.indexOf('באב') !== -1) return cards[i];
    }
    return null;
  }

  function openSpecial() {
    var card = findSpecialCard();
    if (card) { card.click(); return; }
    // אם המוצר לא מוצג (סינון קטגוריה) — מציגים הכל ואז פותחים
    var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      allBtn.click();
      setTimeout(function () {
        var c = findSpecialCard();
        if (c) { c.click(); return; }
        var cat = document.getElementById('catalog');
        if (cat) cat.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      var cat = document.getElementById('catalog');
      if (cat) cat.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ── קידום המארז בקטלוג ── תווית "ספיישל" + מיקום במרכז השורה הראשונה
  function promoteSpecial() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    var card = null;
    var kids = grid.children;
    for (var i = 0; i < kids.length; i++) {
      var t = kids[i].querySelector && kids[i].querySelector('.product-card-title');
      if (t && t.textContent.indexOf('באב') !== -1) { card = kids[i]; break; }
    }
    if (!card) return;

    // תווית "ספיישל" — זהה בעיצוב לתווית "פופולרי"
    if (!card.querySelector('.tubav-special-tag')) {
      var tag = document.createElement('span');
      tag.className = 'product-card-badge tubav-special-tag';
      tag.textContent = 'ספיישל';
      var content = card.querySelector('.product-card-content');
      card.insertBefore(tag, content || card.firstChild);
    }

    // מיקום במרכז השורה הראשונה (אינדקס 1 — האמצע ב-RTL בפריסת 3 עמודות)
    var target = 1;
    var idx = Array.prototype.indexOf.call(grid.children, card);
    if (grid.children.length > target && idx !== target) {
      var ref = idx < target ? (grid.children[target + 1] || null) : grid.children[target];
      grid.insertBefore(card, ref);
    }
  }

  // עוטף את renderProducts של האתר כדי לשמר את הקידום גם אחרי סינון קטגוריות
  function hookRender() {
    if (typeof window.renderProducts === 'function' && !window.renderProducts.__tubavPatched) {
      var orig = window.renderProducts;
      window.renderProducts = function () {
        var r = orig.apply(this, arguments);
        promoteSpecial();
        return r;
      };
      window.renderProducts.__tubavPatched = true;
    }
    promoteSpecial(); // מקרה שכבר עברנו רינדור ראשוני
  }

  // ── באדג' צף ──
  function showBadge() {
    try { if (sessionStorage.getItem('tubav_badge_closed')) return; } catch (e) {}
    var badge = el(
      '<div id="tubav-badge" role="complementary" aria-label="ספיישל ט״ו באב">' +
        '<a class="tubav-badge-link" href="#catalog"><span class="tubav-badge-heart">❤️</span> ספיישל ט״ו באב · להזמנה</a>' +
        '<button class="tubav-badge-close" aria-label="סגירה">&times;</button>' +
      '</div>'
    );
    document.body.appendChild(badge);
    requestAnimationFrame(function () { badge.classList.add('tubav-badge-show'); });

    badge.querySelector('.tubav-badge-link').addEventListener('click', function (e) {
      e.preventDefault();
      openSpecial();
    });
    badge.querySelector('.tubav-badge-close').addEventListener('click', function () {
      badge.classList.remove('tubav-badge-show');
      try { sessionStorage.setItem('tubav_badge_closed', '1'); } catch (e) {}
      setTimeout(function () { if (badge.parentNode) badge.parentNode.removeChild(badge); }, 400);
    });
  }

  function init() {
    showBadge();
    hookRender();
    if (!motionOff()) {
      startHearts();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

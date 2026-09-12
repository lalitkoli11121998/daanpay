document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Toast helper ---------- */
  var toastEl = document.createElement('div');
  toastEl.className = 'toast';
  document.body.appendChild(toastEl);
  var toastTimer = null;

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2200);
  }

  /* ---------- Mobile nav toggle ---------- */
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      var isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 4) {
      header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.04)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ---------- Popular search chips ---------- */
  var searchInput = document.querySelector('.search-input');
  var chips = document.querySelectorAll('.chip-row .chip');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      if (searchInput) {
        searchInput.value = chip.textContent;
      }
    });
  });

  /* ---------- Search submit ---------- */
  var searchForm = document.querySelector('.search-row');
  var searchBtn = searchForm ? searchForm.querySelector('.btn') : null;

  function runSearch() {
    var query = searchInput ? searchInput.value.trim() : '';
    if (!query) {
      searchInput.focus();
      showToast('Enter a temple name, deity, or city to search.');
      return;
    }
    // Placeholder for real navigation: window.location.href = 'temples.html?q=' + encodeURIComponent(query);
    showToast('Searching for "' + query + '"…');
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', runSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runSearch();
    });
  }

  /* ---------- State chips ---------- */
  document.querySelectorAll('.state-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Placeholder for real navigation: window.location.href = 'temples.html?state=' + encodeURIComponent(chip.textContent);
      showToast('Browsing temples in ' + chip.textContent + '…');
    });
  });

  /* ---------- Offer method slider ---------- */
  var offerSlider = document.getElementById('offerSlider');
  if (offerSlider) {
    var offerSlides = offerSlider.querySelectorAll('.offer-slide');
    var offerDots = offerSlider.querySelectorAll('.offer-dot');
    var offerIndex = 0;
    var offerTimer = null;

    function goToOfferSlide(i) {
      offerSlides.forEach(function (s) { s.classList.remove('is-active'); });
      offerDots.forEach(function (d) { d.classList.remove('is-active'); });
      offerSlides[i].classList.add('is-active');
      offerDots[i].classList.add('is-active');
      offerIndex = i;
    }

    function startOfferAutoplay() {
      clearInterval(offerTimer);
      offerTimer = setInterval(function () {
        goToOfferSlide((offerIndex + 1) % offerSlides.length);
      }, 2000);
    }

    function stopOfferAutoplay() {
      clearInterval(offerTimer);
    }

    offerDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToOfferSlide(parseInt(dot.getAttribute('data-index'), 10));
        stopOfferAutoplay();
        startOfferAutoplay();
      });
    });

    offerSlider.addEventListener('mouseenter', stopOfferAutoplay);
    offerSlider.addEventListener('mouseleave', startOfferAutoplay);
    offerSlider.addEventListener('focusin', stopOfferAutoplay);
    offerSlider.addEventListener('focusout', startOfferAutoplay);

    startOfferAutoplay();
  }

  /* ---------- Live donation ticker ---------- */
  var tickerEl = document.getElementById('ticker-text');
  var tickerMessages = [
    'Anita from Pune donated ₹501 to Siddhivinayak Temple · 2 min ago',
    'Rahul from Chennai donated ₹1,001 to Meenakshi Amman Temple · 4 min ago',
    'Priya from Delhi donated ₹251 to Kashi Vishwanath Temple · 6 min ago',
    'Suresh from Bengaluru donated ₹5,001 to Sri Venkateswara Temple · 9 min ago',
    'Meera from Kolkata donated ₹101 to Kashi Vishwanath Temple · 11 min ago'
  ];
  var tickerIndex = 0;

  if (tickerEl) {
    setInterval(function () {
      tickerIndex = (tickerIndex + 1) % tickerMessages.length;
      tickerEl.classList.add('fade');
      setTimeout(function () {
        tickerEl.textContent = tickerMessages[tickerIndex];
        tickerEl.classList.remove('fade');
      }, 300);
    }, 4000);
  }

  /* ---------- Temple cards ---------- */
  document.querySelectorAll('.temple-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var name = card.querySelector('h3') ? card.querySelector('h3').textContent : 'this temple';
      // Placeholder for real navigation: window.location.href = 'temple-details.html?id=...';
      showToast('Opening ' + name + '…');
    });
  });

});
(function () {
  'use strict';

  /* ===== Navbar scroll effect ===== */
  var navbar = document.getElementById('navbar');
  var ticking = false;

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateNavbar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();

  /* ===== Mobile menu toggle ===== */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');
  var mobileClose = document.getElementById('mobileClose');
  var mobileLinks = mobileMenu.querySelectorAll('a');

  function openMobile() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMobile();
    } else {
      openMobile();
    }
  });

  mobileClose.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', closeMobile);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobile);
  });

  /* ===== IntersectionObserver reveal animations ===== */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ===== Navbar link active indicator on scroll ===== */
  var sections = document.querySelectorAll('.section-site');
  var navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    var scrollY = window.scrollY + 120;
    var currentId = '';

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.style.color = '#fff';
      } else {
        link.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateActiveLink);
  }, { passive: true });

  updateActiveLink();

})();

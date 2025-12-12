/* ptj.js — interactions for portfolio website (updated) */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');
  const themeButton = document.getElementById('theme-button');
  const scrollUp = document.getElementById('scroll-up');
  const darkClass = 'dark-theme';

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.toggle('show');
        navMenu.style.display = navMenu.classList.contains('show') ? 'block' : 'none';
      }
    });
  }

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) { navMenu.classList.remove('show'); navMenu.style.display = ''; }
      document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });

  (function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add(darkClass);
    updateThemeIcon();
  })();

  function updateThemeIcon(){
    if (!themeButton) return;
    const isDark = document.body.classList.contains(darkClass);
    themeButton.classList.toggle('uil-sun', isDark);
    themeButton.classList.toggle('uil-moon', !isDark);
  }

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(darkClass);
      const isDark = document.body.classList.contains(darkClass);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }

  const sections = document.querySelectorAll('section[id]');
  function scrollActive(){
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav__list a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) link.classList.add('active-link');
        else link.classList.remove('active-link');
      }
    });
  }
  window.addEventListener('scroll', scrollActive);

  function showScrollUp(){
    if (!scrollUp) return;
    if (window.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
  }
  window.addEventListener('scroll', showScrollUp);

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // skills accordion
  document.querySelectorAll('.skills__header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      document.querySelectorAll('.skills__content').forEach(c => c.classList.remove('skills__open'));
      parent.classList.toggle('skills__open');
    });
  });

  // Swiper init
  if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
      loop: false,
      grabCursor: true,
      spaceBetween: 32,
      slidesPerView: 1,
      centeredSlides: false,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        700: { slidesPerView: 1, spaceBetween: 28 },
        1000: { slidesPerView: 1, spaceBetween: 32 },
        1400: { slidesPerView: 1, spaceBetween: 36 }
      }
    });
  } else {
    console.warn('Swiper library not found. Make sure swiper-bundle.min.js is included before ptj.js');
  }

  // contact demo
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendBtn.setAttribute('disabled','');
      sendBtn.textContent = 'Sending...';
      setTimeout(() => {
        sendBtn.removeAttribute('disabled');
        sendBtn.textContent = 'Send Message';
        alert('Demo: message not actually sent. Integrate backend or Formspree to send real emails.');
      }, 900);
    });
  }

  /* Qualification modal logic */
  const qualModal = document.getElementById('qual-modal');
  const qualModalContent = document.getElementById('qual-modal-content');
  const qualModalTitle = document.getElementById('qual-modal-title');
  const qualModalClose = document.getElementById('qual-modal-close');
  const qualModalBackdrop = document.getElementById('qual-modal-backdrop');

  const QUAL_DATA = {
    ssc: {
      title: 'SSC — Sri Viswashanthi High School (2020)',
      html: `<h4>Subjects</h4>
             <ul>
               <li>Science</li>
               <li>Mathematics</li>
               <li>English</li>
               <li>Social</li>
               <li>Telugu</li>
               <li>Hindi</li>
               <li>Physics</li>
             </ul>
             <p><strong>CGPA:</strong> 10</p>`
    },
    class12: {
      title: 'Class 12th — Viswasai Junior College (2022)',
      html: `<h4>Subjects</h4>
             <ul>
               <li>Mathematics</li>
               <li>Physics</li>
               <li>Chemistry</li>
               <li>English</li>
               <li>Sanskrit</li>
             </ul>
             <p><strong>CGPA:</strong> 8.58</p>`
    },
    college: {
      title: 'College — KL University, Vijayawada (2022 - 2026)',
      html: `<h4>Relevant Subjects / Topics</h4>
             <ul>
               <li>C Programming</li>
               <li>Java</li>
               <li>HTML & CSS</li>
               <li>Operating Systems</li>
               <li>Software Engineering</li>
               <li>DBMS (Database Management Systems)</li>
               <li>Network Security</li>
             </ul>
             <p><strong>CGPA:</strong> 8.86</p>`
    }
  };

  function openQualModal(key) {
    const data = QUAL_DATA[key];
    if (!data) return;
    qualModalTitle.textContent = data.title;
    qualModalContent.innerHTML = data.html;
    qualModal.setAttribute('aria-hidden', 'false');
    qualModalClose.focus();
  }

  function closeQualModal() {
    qualModal.setAttribute('aria-hidden', 'true');
    qualModalContent.innerHTML = '';
  }

  // attach to every view more link via data-q
  document.querySelectorAll('.qualification__more').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.getAttribute('data-q') || 'class12';
      if (key === 'ssc' || key === 'class12' || key === 'college') openQualModal(key);
    });
  });

  qualModalClose.addEventListener('click', closeQualModal);
  qualModalBackdrop.addEventListener('click', closeQualModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQualModal(); });

  // small focus-trap
  qualModal.addEventListener('keydown', function(e){
    if (e.key === 'Tab') {
      const focusable = qualModal.querySelectorAll('button, a, input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

});

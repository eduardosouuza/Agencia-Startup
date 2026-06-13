/* ============================================================
   Nexus Code — interações
   ============================================================ */
(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5511999999999'; // placeholder — troque pelo número real

  /* ---------- WhatsApp links ---------- */
  document.querySelectorAll('.js-wa').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = el.getAttribute('data-msg') || 'Olá!';
      const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  /* ---------- Work carousel ---------- */
  const workCarousel = document.querySelector('.work-carousel');
  if (workCarousel) {
    const slides = Array.from(workCarousel.querySelectorAll('[data-work-slide]'));
    const dots = Array.from(workCarousel.querySelectorAll('.work-dots button'));
    const prev = workCarousel.querySelector('.work-prev');
    const next = workCarousel.querySelector('.work-next');
    let current = 0;

    const positionClass = (offset) => {
      if (offset === 0) return 'is-active';
      if (offset === 1) return 'is-next';
      if (offset === -1) return 'is-prev';
      if (offset === 2) return 'is-far-next';
      if (offset === -2) return 'is-far-prev';
      return '';
    };

    const renderWork = () => {
      slides.forEach((slide, index) => {
        const rawOffset = index - current;
        const offset = ((rawOffset + slides.length + Math.floor(slides.length / 2)) % slides.length) - Math.floor(slides.length / 2);

        slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next');
        const nextClass = positionClass(offset);
        if (nextClass) slide.classList.add(nextClass);
        slide.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === current);
      });
    };

    const goToWork = (index) => {
      current = (index + slides.length) % slides.length;
      renderWork();
    };

    prev?.addEventListener('click', () => goToWork(current - 1));
    next?.addEventListener('click', () => goToWork(current + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goToWork(index)));

    workCarousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') goToWork(current - 1);
      if (event.key === 'ArrowRight') goToWork(current + 1);
    });

    renderWork();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close others
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Hero terminal: reveal lines in sequence ---------- */
  function playTerminal() {
    const lines = document.querySelectorAll('#termBody .term-line');
    if (!lines.length) return;
    const anim = document.body.getAttribute('data-anim');
    if (anim === 'off') {
      lines.forEach((l) => { l.style.opacity = 1; l.style.transform = 'none'; });
      return;
    }
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transition = 'opacity .4s ease, transform .4s ease';
        line.style.opacity = 1;
        line.style.transform = 'none';
      }, 200 + i * 260);
    });
  }
  
  window.addEventListener('heroAnimated', playTerminal);
  
  // Fallback se algo falhar
  window.addEventListener('load', () => setTimeout(playTerminal, 8000));
})();

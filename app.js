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
      }, 600 + i * 260);
    });
  }
  // kick off after fonts/layout settle
  window.addEventListener('load', () => setTimeout(playTerminal, 300));
  // fallback if load already fired
  if (document.readyState === 'complete') setTimeout(playTerminal, 400);
})();

/* ============================================================
   DevAuto Pro — interações
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

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const anim = document.body.getAttribute('data-anim');
    if (anim === 'off') { el.textContent = target + suffix; return; }
    const dur = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(animateCount);
  }

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

  /* ---------- expose a refresh hook for Tweaks (re-run counters etc.) ---------- */
  window.__devauto = {
    replayCounters() {
      document.querySelectorAll('[data-count]').forEach((el) => {
        el.textContent = '0';
        animateCount(el);
      });
    },
  };
})();

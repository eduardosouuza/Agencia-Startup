/* ============================================================
   DevAuto Pro — GSAP ScrollTrigger animations
   ============================================================ */
(function () {
  'use strict';

  const allReveals = document.querySelectorAll('.reveal');

  /* -- Fallback: GSAP não carregou (CDN offline, bloqueado etc.) -- */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    allReveals.forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = (el.getAttribute('data-count') || '0') + (el.getAttribute('data-suffix') || '');
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* -- Respeita prefers-reduced-motion e data-anim="off" -- */
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.body.getAttribute('data-anim') === 'off'
  ) {
    allReveals.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  /* ════════════════════════════════════════════════════════════
     1. TOMA CONTA DO SISTEMA CSS .reveal
     Adiciona .in (destino = opacity:1) e desativa transitions
     para GSAP ter controle exclusivo do timing.
  ════════════════════════════════════════════════════════════ */
  allReveals.forEach(function (el) {
    el.classList.add('in');
    el.style.transition = 'none';
  });

  /* ════════════════════════════════════════════════════════════
     2. ESTADO INICIAL — esconde elementos que serão animados
        pelo scroll (hero fica de fora — tem sua própria timeline)
  ════════════════════════════════════════════════════════════ */
  var HEADS = '#servicos .section-head, #processo .section-head, ' +
              '#resultados .section-head, #depoimentos .section-head, #faq .section-head';

  gsap.set('.logos-inner',            { opacity: 0, y: 28 });
  gsap.set(HEADS,                     { opacity: 0, y: 38 });
  gsap.set('.svc-card',               { opacity: 0, y: 54 });
  gsap.set('.step',                   { opacity: 0, x: -30, y: 18 });
  gsap.set('.stat',                   { opacity: 0, y: 34 });
  gsap.set('.tst-card',               { opacity: 0, y: 46 });
  gsap.set('.faq-item',               { opacity: 0, y: 20 });
  gsap.set('.cta-box',                { opacity: 0, y: 54, scale: 0.97 });
  gsap.set('.foot-brand, .foot-col',  { opacity: 0, y: 32 });

  /* ════════════════════════════════════════════════════════════
     3. HERO — entrada na carga da página (sem ScrollTrigger)
  ════════════════════════════════════════════════════════════ */
  gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.12 })
    .from('.hero-badge',    { opacity: 0, y: 18, duration: 0.52 })
    .from('.hero .eyebrow', { opacity: 0, y: 18, duration: 0.52 }, '-=0.3')
    .from('.hero h1',       { opacity: 0, y: 30, duration: 0.72 }, '-=0.32')
    .from('.hero-sub',      { opacity: 0, y: 20, duration: 0.62 }, '-=0.42')
    .from('.hero-actions',  { opacity: 0, y: 18, duration: 0.6  }, '-=0.36')
    .from('.hero-trust',    { opacity: 0, y: 14, duration: 0.5  }, '-=0.28')
    .from('.hero-visual',   { opacity: 0, y: 34, duration: 0.82 }, '-=0.68')
    .from('.hero-scroll',   { opacity: 0, y: 10, duration: 0.4  }, '-=0.2');

  /* ════════════════════════════════════════════════════════════
     4. HERO ORBS — parallax ao rolar
  ════════════════════════════════════════════════════════════ */
  gsap.to('.hero-orb.ho-1', {
    y: -85,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 },
  });
  gsap.to('.hero-orb.ho-2', {
    y: 68,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5 },
  });

  /* ════════════════════════════════════════════════════════════
     5. LOGOS
  ════════════════════════════════════════════════════════════ */
  gsap.to('.logos-inner', {
    opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.logos', start: 'top 88%' },
  });

  /* ════════════════════════════════════════════════════════════
     6. SERVIÇOS
  ════════════════════════════════════════════════════════════ */
  gsap.to('#servicos .section-head', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#servicos .section-head', start: 'top 82%' },
  });
  gsap.to('.svc-card', {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out',
    scrollTrigger: { trigger: '.svc-grid', start: 'top 78%' },
  });

  /* ════════════════════════════════════════════════════════════
     7. PROCESSO
  ════════════════════════════════════════════════════════════ */
  gsap.to('#processo .section-head', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#processo .section-head', start: 'top 82%' },
  });
  gsap.to('.step', {
    opacity: 1, y: 0, x: 0, duration: 0.65, stagger: 0.13, ease: 'power3.out',
    scrollTrigger: { trigger: '.steps', start: 'top 78%' },
  });

  /* ════════════════════════════════════════════════════════════
     8. RESULTADOS + contadores animados
  ════════════════════════════════════════════════════════════ */
  gsap.to('#resultados .section-head', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#resultados .section-head', start: 'top 82%' },
  });
  gsap.to('.stat', {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
  });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        var proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(proxy.val) + suffix; },
          onComplete: function () { el.textContent = target + suffix; },
        });
      },
    });
  });

  /* ════════════════════════════════════════════════════════════
     9. DEPOIMENTOS
  ════════════════════════════════════════════════════════════ */
  gsap.to('#depoimentos .section-head', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#depoimentos .section-head', start: 'top 82%' },
  });
  gsap.to('.tst-card', {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.tst-grid', start: 'top 80%' },
  });

  /* ════════════════════════════════════════════════════════════
     10. FAQ
  ════════════════════════════════════════════════════════════ */
  gsap.to('#faq .section-head', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#faq .section-head', start: 'top 82%' },
  });
  gsap.to('.faq-item', {
    opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
    scrollTrigger: { trigger: '.faq-list', start: 'top 82%' },
  });

  /* ════════════════════════════════════════════════════════════
     11. CTA
  ════════════════════════════════════════════════════════════ */
  gsap.to('.cta-box', {
    opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-box', start: 'top 82%' },
  });

  /* ════════════════════════════════════════════════════════════
     12. FOOTER
  ════════════════════════════════════════════════════════════ */
  gsap.to('.foot-brand, .foot-col', {
    opacity: 1, y: 0, duration: 0.62, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: 'footer', start: 'top 88%' },
  });

})();

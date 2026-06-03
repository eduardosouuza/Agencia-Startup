/* ============================================================
   Nexus Code — GSAP ScrollTrigger animations
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
  var HEADS = '#trabalhos .work-head, #servicos .section-head, #processo .section-head, ' +
              '#resultados .section-head, #depoimentos .section-head, #faq .section-head';

  gsap.set('.logos-inner',            { opacity: 0, y: 28 });
  gsap.set(HEADS,                     { opacity: 0, y: 38 });
  gsap.set('.work-carousel',          { opacity: 0, y: 48, scale: 0.98 });
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
    .from('.hero .eyebrow', { opacity: 0, y: 18, duration: 0.52 })
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
     DYNAMISM: HIGH-IMPACT SECTION TRANSITIONS
  ════════════════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section, footer, .logos');
  sections.forEach(sec => {
    const reveals = sec.querySelectorAll('.reveal');
    
    if (reveals.length > 0) {
      // RESET inicial mais forte para o GSAP
      gsap.set(reveals, { opacity: 0, y: 60, scale: 0.96 });

      gsap.to(reveals, {
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power4.out', // Mais agressivo e limpo
        scrollTrigger: {
          trigger: sec,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Parallax de seção mais acentuado (Clean overlap)
    gsap.fromTo(sec, 
      { y: 40 },
      {
        y: -40,
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  // Efeito de 'Blur' e Escurecimento no scroll (Foco na seção ativa)
  document.querySelectorAll('section').forEach(sec => {
    gsap.to(sec, {
      filter: 'brightness(0.7) blur(2px)',
      scrollTrigger: {
        trigger: sec,
        start: 'bottom 20%',
        end: 'bottom 0%',
        scrub: true
      }
    });
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

/* ============================================================
   Nexus Code — Advanced Awwwards-style Animations
   Using GSAP + ScrollTrigger
   ============================================================ */
(function () {
  'use strict';

  /* -- Check dependencies -- */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* -- Global Variables -- */
  const isMobile = window.innerWidth < 860;
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPerc = document.getElementById('preloaderPerc');

  /* -- Initialize Cursor -- */
  const initCursor = () => {
    if (isMobile) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor movement
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    // Magnetic effect
    const magneticElements = document.querySelectorAll('.btn, .svc-ico, .brand, .nav-links a');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.3;
        const moveY = (e.clientY - centerY) * 0.3;
        gsap.to(el, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });

    // Hover states
    const hoverElements = document.querySelectorAll('a, button, .svc-card, .work-slide, .step');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      el.addEventListener('mousedown', () => cursor.classList.add('click'));
      el.addEventListener('mouseup', () => cursor.classList.remove('click'));
    });
  };

  /* -- Split Text Helper (Manual) -- */
  const splitText = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = text.split(' ').map(word => 
      `<span class="word-wrapper" style="overflow:hidden; display:inline-block;">
        <span class="word" style="display:inline-block;">${word}</span>
      </span>`
    ).join(' ');
  };

  /* -- Preloader Logic -- */
  const runPreloader = () => {
    let perc = 0;
    
    // Safety timeout: force hide preloader if it gets stuck
    const safetySwitch = setTimeout(() => {
      if (preloader && preloader.style.display !== 'none') {
        startHeroAnimation();
      }
    }, 5000);

    // Pre-initialize ALL reveals so they are ready for GSAP
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('in');
      el.style.transition = 'none';
    });

    const interval = setInterval(() => {
      perc += Math.floor(Math.random() * 15) + 5;
      if (perc >= 100) {
        perc = 100;
        clearInterval(interval);
        clearTimeout(safetySwitch);
        setTimeout(startHeroAnimation, 200);
      }
      if (preloaderBar) preloaderBar.style.width = perc + '%';
      if (preloaderPerc) preloaderPerc.innerText = perc + '%';
    }, 30);
  };

  /* -- Hero Animation -- */
  const startHeroAnimation = () => {
    if (!preloader || preloader.dataset.started === 'true') return;
    preloader.dataset.started = 'true';

    const tl = gsap.timeline({ 
      defaults: { ease: 'expo.out' },
      onStart: () => {
        initScrollAnimations();
      },
      onComplete: () => {
        // Refresh ScrollTrigger to ensure all positions are calculated correctly
        ScrollTrigger.refresh();
      }
    });

    tl.to(preloader, {
      yPercent: -100,
      duration: 1.4,
      ease: 'expo.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        window.dispatchEvent(new CustomEvent('heroAnimated'));
      }
    });

    // Initial Hero Entrance (staggered with preloader exit)
    tl.from('.hero .eyebrow', { opacity: 0, y: 30, duration: 1 }, '-=0.8')
      .from('.hero h1 .word', { 
        yPercent: 100, 
        opacity: 0,
        duration: 1.2, 
        stagger: 0.04,
        ease: 'expo.out'
      }, '-=1')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 1 }, '-=1')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 1 }, '-=0.9')
      .from('.hero-visual', { 
        opacity: 0, 
        scale: 0.92, 
        y: 50, 
        duration: 1.5,
        ease: 'expo.out'
      }, '-=1.2')
      .from('.float-chip', { 
        opacity: 0, 
        scale: 0.5, 
        y: 20,
        stagger: 0.15, 
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=1.1')
      .from('.hero-scroll', { opacity: 0, y: -20, duration: 0.8 }, '-=0.6');
  };

  /* -- Scroll Animations -- */
  const initScrollAnimations = () => {
    if (isMobile) return;

    // Section Reveals
    const sections = document.querySelectorAll('section, footer, .logos');
    sections.forEach(sec => {
      // Find reveals that are NOT in the hero (hero has its own timeline)
      const reveals = Array.from(sec.querySelectorAll('.reveal')).filter(el => !el.closest('.hero'));
      
      if (reveals.length > 0) {
        gsap.from(reveals, {
          opacity: 0,
          y: 70,
          scale: 0.94,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Parallax effect on backgrounds or specific images
      const parallaxImg = sec.querySelector('img');
      if (parallaxImg) {
        gsap.to(parallaxImg, {
          y: -30,
          scrollTrigger: {
            trigger: sec,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Special: Counter animation
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-count')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => el.innerText = Math.round(obj.val) + suffix
          });
        }
      });
    });

    // Hero Orbs Parallax
    gsap.to('.hero-orb.ho-1', {
      y: -100,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.hero-orb.ho-2', {
      y: 100,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
    });
  };

  /* -- Start Everything -- */
  const init = () => {
    splitText('.hero h1');
    initCursor();
    runPreloader();
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

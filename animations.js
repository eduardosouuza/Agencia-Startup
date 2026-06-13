/* ============================================================
   Nexus Code — Advanced Awwwards-style Experience
   Stabilized for Production Deployment
   ============================================================ */
(function () {
  'use strict';

  // State flags to prevent double initialization
  let isInitialized = false;

  /* -- Check dependencies -- */
  const checkDependencies = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not found. Falling back to CSS.');
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      return false;
    }
    gsap.registerPlugin(ScrollTrigger);
    return true;
  };

  /* -- Global Variables -- */
  const isMobile = window.innerWidth < 860;
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPerc = document.getElementById('preloaderPerc');

  /* -- Initialize Cursor -- */
  const initCursor = () => {
    if (isMobile) return;
    
    // Cleanup if already exists
    const oldCursor = document.querySelector('.cursor');
    if (oldCursor) oldCursor.remove();

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Smooth ticker for cursor
    const tickerFunc = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    };
    gsap.ticker.add(tickerFunc);

    // Magnetic effect
    const magneticElements = document.querySelectorAll('.btn, .svc-ico, .brand, .nav-links a, .wa-float');
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

    // Hover states for cursor
    const hoverSelectors = 'a, button, .svc-card, .work-slide, .step, .faq-q, .wa-float';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    });
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
  };

  /* -- Split Text Helper -- */
  const splitText = (selector) => {
    const el = document.querySelector(selector);
    if (!el || el.dataset.split === 'true') return;
    const text = el.innerText.trim();
    el.innerHTML = text.split(' ').map(word => 
      `<span class="word-wrapper" style="overflow:hidden; display:inline-block;">
        <span class="word" style="display:inline-block;">${word}</span>
      </span>`
    ).join(' ');
    el.dataset.split = 'true';
  };

  /* -- Preloader Logic -- */
  const runPreloader = () => {
    let perc = 0;
    
    // Safety timeout: force hide preloader if it gets stuck
    const safetySwitch = setTimeout(() => {
      if (preloader && preloader.style.display !== 'none') {
        console.log('Safety switch triggered');
        startHeroAnimation();
      }
    }, 6000);

    // Pre-initialize ALL reveals: hide them initially for GSAP to reveal them
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('in');
      el.style.transition = 'none';
      if (!isMobile) el.style.opacity = '0'; 
    });

    const interval = setInterval(() => {
      // Slower, more granular progress for premium feel
      perc += Math.floor(Math.random() * 3) + 1; 
      
      if (perc >= 100) {
        perc = 100;
        clearInterval(interval);
        clearTimeout(safetySwitch);
        // Small delay before hero starts for smooth transition
        setTimeout(startHeroAnimation, 500);
      }
      if (preloaderBar) preloaderBar.style.width = perc + '%';
      if (preloaderPerc) preloaderPerc.innerText = perc + '%';
    }, 45); // Slower interval
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
        ScrollTrigger.refresh();
      }
    });

    tl.to(preloader, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        window.dispatchEvent(new CustomEvent('heroAnimated'));
      }
    });

    // Entrance sequence
    tl.from('.hero .eyebrow', { opacity: 0, y: 30, duration: 1 }, '-=0.6')
      .from('.hero h1 .word', { 
        yPercent: 100, 
        opacity: 0,
        duration: 1.2, 
        stagger: 0.04,
        ease: 'expo.out'
      }, '-=0.9')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 1 }, '-=1')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 1 }, '-=0.9')
      .from('.hero-visual', { 
        opacity: 0, 
        scale: 0.95, 
        y: 40, 
        duration: 1.4,
        ease: 'expo.out'
      }, '-=1.1')
      .from('.float-chip', { 
        opacity: 0, 
        scale: 0.7, 
        y: 15,
        stagger: 0.1, 
        duration: 0.8,
        ease: 'back.out(1.5)'
      }, '-=1')
      .from('.hero-scroll', { opacity: 0, y: -15, duration: 0.6 }, '-=0.4');
  };

  /* -- Scroll Animations -- */
  const initScrollAnimations = () => {
    if (isMobile) return;

    // Refresh triggers to ensure correct positions
    ScrollTrigger.refresh();

    const sections = document.querySelectorAll('section, footer, .logos');
    sections.forEach(sec => {
      // Only reveals not in Hero
      const reveals = Array.from(sec.querySelectorAll('.reveal')).filter(el => !el.closest('.hero'));
      
      if (reveals.length > 0) {
        gsap.from(reveals, {
          opacity: 0,
          y: 50,
          scale: 0.96,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Smooth parallax for images
      const img = sec.querySelector('img');
      if (img && !sec.classList.contains('work-section')) {
        gsap.to(img, {
          y: -40,
          scrollTrigger: {
            trigger: sec,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Counter animation logic
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
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = Math.round(obj.val) + suffix;
            }
          });
        }
      });
    });

    // Floating parallax for hero orbs
    gsap.to('.hero-orb.ho-1', {
      y: -120,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-orb.ho-2', {
      y: 120,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
  };

  /* -- Entry Point -- */
  const init = () => {
    if (isInitialized) return;
    isInitialized = true;

    if (!checkDependencies()) return;

    splitText('.hero h1');
    initCursor();
    runPreloader();
  };

  // Run on load or immediately if already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('load', init);
  }

})();

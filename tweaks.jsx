/* ============================================================
   DevAuto Pro — Landing page
   Dark mode roxo · corporativo · IBM Plex Mono + Sans
   ============================================================ */

/* ---------- Tokens ---------- */
:root {
  /* surfaces (violet-tinted dark) */
  --bg:        oklch(0.155 0.024 292);
  --bg-2:      oklch(0.185 0.030 292);
  --surface:   oklch(0.205 0.032 292);
  --surface-2: oklch(0.250 0.038 292);
  --border:    oklch(0.40 0.05 292 / 0.22);
  --border-2:  oklch(0.55 0.08 292 / 0.30);

  /* text */
  --text:      oklch(0.97 0.010 292);
  --text-mut:  oklch(0.76 0.022 292);
  --text-dim:  oklch(0.60 0.022 292);

  /* accent (tweakable: --accent overridden by JS) */
  --accent:    #8b5cf6;
  --accent-2:  #c026d3;
  --accent-ink: #ffffff;

  /* derived glows */
  --glow:       color-mix(in oklab, var(--accent) 100%, transparent);
  --accent-12:  color-mix(in oklab, var(--accent) 12%, transparent);
  --accent-18:  color-mix(in oklab, var(--accent) 18%, transparent);
  --accent-30:  color-mix(in oklab, var(--accent) 30%, transparent);

  /* fonts (tweakable: --font-head) */
  --font-head: 'IBM Plex Mono', ui-monospace, monospace;
  --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;

  --radius: 16px;
  --radius-sm: 10px;
  --maxw: 1200px;
  --gutter: clamp(20px, 5vw, 64px);

  --reveal-dur: .7s;
  --reveal-y: 26px;
}

/* animation intensity */
body[data-anim="off"]   { --reveal-dur: .001s; --reveal-y: 0px; }
body[data-anim="subtle"]{ --reveal-dur: .55s;  --reveal-y: 16px; }
body[data-anim="rich"]  { --reveal-dur: .8s;   --reveal-y: 34px; }

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ambient background field */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(1100px 700px at 78% -8%,  var(--accent-18), transparent 60%),
    radial-gradient(900px 600px at -10% 18%,  color-mix(in oklab, var(--accent-2) 14%, transparent), transparent 60%);
  pointer-events: none;
}
/* fine grid texture */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(to right,  oklch(0.5 0.04 292 / .05) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(0.5 0.04 292 / .05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 22%, #000 0%, transparent 72%);
  pointer-events: none;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
h1, h2, h3, h4 { font-family: var(--font-head); font-weight: 600; line-height: 1.08; letter-spacing: -0.02em; margin: 0; }

.wrap { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }

/* ---------- Eyebrow / labels ---------- */
.eyebrow {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.eyebrow::before {
  content: "";
  width: 26px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
}

.section-head { max-width: 720px; margin-bottom: clamp(40px, 6vw, 72px); }
.section-head h2 {
  font-size: clamp(30px, 4.6vw, 52px);
  margin-top: 18px;
}
.section-head p {
  color: var(--text-mut);
  font-size: clamp(16px, 1.5vw, 19px);
  margin: 18px 0 0;
  text-wrap: pretty;
}

section { position: relative; padding: clamp(72px, 11vw, 140px) 0; }
.alt-bg { background: var(--bg-2); border-block: 1px solid var(--border); }

/* ---------- Buttons ---------- */
.btn {
  --bw: 1px;
  font-family: var(--font-head);
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 999px;
  border: var(--bw) solid transparent;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.3,.7,.4,1), box-shadow .25s, background .25s, border-color .25s;
  white-space: nowrap;
}
.btn svg { width: 18px; height: 18px; }
.btn-primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: var(--accent-ink);
  box-shadow: 0 8px 30px -8px var(--accent-30), inset 0 1px 0 oklch(1 0 0 / .25);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 44px -10px var(--accent-30), inset 0 1px 0 oklch(1 0 0 / .3); }
.btn-ghost {
  background: oklch(1 0 0 / .03);
  color: var(--text);
  border-color: var(--border-2);
}
.btn-ghost:hover { background: oklch(1 0 0 / .06); border-color: var(--accent); transform: translateY(-2px); }
.btn-lg { padding: 17px 30px; font-size: 15.5px; }

/* ---------- Nav ---------- */
header.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;
}
header.nav.scrolled {
  background: color-mix(in oklab, var(--bg) 72%, transparent);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  backdrop-filter: blur(16px) saturate(150%);
  border-bottom-color: var(--border);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 76px; }
.brand { display: flex; align-items: center; gap: 11px; font-family: var(--font-head); font-weight: 600; font-size: 18px; letter-spacing: -0.01em; }
.brand .mark {
  width: 34px; height: 34px; border-radius: 9px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: grid; place-items: center;
  box-shadow: 0 4px 16px -4px var(--accent-30), inset 0 1px 0 oklch(1 0 0 / .3);
  position: relative;
}
.brand .mark::after {
  content: "";
  position: absolute; inset: 8px;
  border: 2px solid var(--accent-ink);
  border-radius: 4px;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: rotate(45deg);
  opacity: .92;
}
.brand b { font-weight: 600; }
.brand span { color: var(--accent); }

.nav-links { display: flex; align-items: center; gap: 36px; }
.nav-links a {
  font-size: 14.5px;
  color: var(--text-mut);
  position: relative;
  transition: color .2s;
}
.nav-links a::after {
  content: ""; position: absolute; left: 0; bottom: -6px;
  width: 0; height: 1.5px; background: var(--accent);
  transition: width .25s;
}
.nav-links a:hover { color: var(--text); }
.nav-links a:hover::after { width: 100%; }
.nav-cta { display: flex; align-items: center; gap: 14px; }

.nav-burger { display: none; background: none; border: 0; color: var(--text); cursor: pointer; padding: 8px; }
.nav-burger svg { width: 26px; height: 26px; }

/* mobile menu */
.mobile-menu {
  position: fixed; inset: 76px 0 auto 0; z-index: 99;
  background: color-mix(in oklab, var(--bg) 96%, transparent);
  -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 18px var(--gutter) 28px;
  display: none;
  flex-direction: column;
  gap: 4px;
  transform: translateY(-12px);
  opacity: 0;
  transition: transform .3s, opacity .3s;
}
.mobile-menu.open { display: flex; transform: none; opacity: 1; }
.mobile-menu a { padding: 13px 4px; font-size: 17px; border-bottom: 1px solid var(--border); color: var(--text-mut); }
.mobile-menu .btn { margin-top: 16px; justify-content: center; }

/* ---------- Hero ---------- */
.hero { padding-top: clamp(140px, 18vh, 200px); padding-bottom: clamp(80px, 12vw, 130px); }
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 7px 14px 7px 9px;
  border: 1px solid var(--border-2);
  border-radius: 999px;
  background: oklch(1 0 0 / .03);
  font-family: var(--font-head);
  font-size: 12.5px;
  color: var(--text-mut);
  margin-bottom: 28px;
}
.hero-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: oklch(0.78 0.17 150); box-shadow: 0 0 0 4px oklch(0.78 0.17 150 / .18); }
.hero h1 {
  font-size: clamp(38px, 6.4vw, 76px);
  margin-bottom: 26px;
}
.hero h1 .grad {
  background: linear-gradient(110deg, var(--accent), var(--accent-2) 80%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
.hero-sub { font-size: clamp(17px, 1.8vw, 21px); color: var(--text-mut); max-width: 540px; margin-bottom: 36px; text-wrap: pretty; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
.hero-trust { display: flex; align-items: center; gap: 22px; margin-top: 42px; flex-wrap: wrap; }
.hero-trust .tnum { font-family: var(--font-head); font-size: 26px; font-weight: 600; color: var(--text); }
.hero-trust .titem { display: flex; flex-direction: column; }
.hero-trust .titem small { color: var(--text-dim); font-size: 13px; }
.hero-trust .tsep { width: 1px; height: 38px; background: var(--border); }

/* hero visual: terminal/automation card */
.hero-visual { position: relative; }
.term {
  background: color-mix(in oklab, var(--surface) 92%, #000);
  border: 1px solid var(--border-2);
  border-radius: var(--radius);
  box-shadow: 0 40px 80px -30px oklch(0 0 0 / .6), 0 0 0 1px oklch(1 0 0 / .03) inset;
  overflow: hidden;
  position: relative;
}
.term::before {
  content: "";
  position: absolute; inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(140deg, var(--accent-30), transparent 40%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.term-bar { display: flex; align-items: center; gap: 8px; padding: 14px 16px; border-bottom: 1px solid var(--border); }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: var(--surface-2); }
.term-bar i:nth-child(1) { background: #ff5f57; } .term-bar i:nth-child(2) { background: #febc2e; } .term-bar i:nth-child(3) { background: #28c840; }
.term-bar .tfile { margin-left: 10px; font-family: var(--font-head); font-size: 12.5px; color: var(--text-dim); }
.term-body { padding: 22px 22px 26px; font-family: var(--font-head); font-size: 13.5px; line-height: 1.85; }
.term-line { display: flex; gap: 14px; opacity: 0; transform: translateY(6px); }
.term-line .ln { color: var(--text-dim); user-select: none; min-width: 16px; text-align: right; }
.cmt { color: var(--text-dim); } .kw { color: var(--accent); } .str { color: oklch(0.82 0.13 150); } .fn { color: oklch(0.82 0.12 230); } .num { color: oklch(0.84 0.13 60); }
.term-cursor { display: inline-block; width: 8px; height: 16px; background: var(--accent); vertical-align: -2px; animation: blink 1.1s steps(2) infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* floating chips on hero visual */
.float-chip {
  position: absolute;
  display: flex; align-items: center; gap: 9px;
  padding: 11px 15px;
  background: color-mix(in oklab, var(--surface) 88%, #000);
  border: 1px solid var(--border-2);
  border-radius: 12px;
  font-family: var(--font-head);
  font-size: 12.5px;
  box-shadow: 0 20px 40px -16px oklch(0 0 0 / .6);
  animation: floaty 6s ease-in-out infinite;
}
.float-chip .ico { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; background: var(--accent-18); color: var(--accent); }
.float-chip .ico svg { width: 15px; height: 15px; }
.float-chip.fc1 { top: -24px; right: 30px; animation-delay: 0s; }
.float-chip.fc2 { bottom: 40px; left: -34px; animation-delay: 1.5s; }
@keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

/* hero layout: centered */
body[data-hero="centered"] .hero-grid { grid-template-columns: 1fr; text-align: center; max-width: 880px; margin-inline: auto; }
body[data-hero="centered"] .hero-sub { margin-inline: auto; }
body[data-hero="centered"] .eyebrow, body[data-hero="centered"] .hero-badge { justify-content: center; }
body[data-hero="centered"] .hero-actions, body[data-hero="centered"] .hero-trust { justify-content: center; }
body[data-hero="centered"] .hero-visual { margin-top: 56px; max-width: 760px; margin-inline: auto; }
body[data-hero="centered"] .hero-text { display: flex; flex-direction: column; align-items: center; }

/* hero layout: minimal (no terminal) */
body[data-hero="minimal"] .hero-grid { grid-template-columns: 1fr; max-width: 920px; }
body[data-hero="minimal"] .hero-visual { display: none; }
body[data-hero="minimal"] .hero h1 { font-size: clamp(42px, 8vw, 92px); }

/* ---------- Logos strip ---------- */
.logos { padding: 46px 0; border-block: 1px solid var(--border); }
.logos-inner { display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap; }
.logos .lbl { font-family: var(--font-head); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-dim); }
.logos .row { display: flex; align-items: center; gap: clamp(24px, 4vw, 52px); flex-wrap: wrap; }
.logos .row span { font-family: var(--font-head); font-weight: 600; font-size: 17px; color: var(--text-dim); opacity: .8; transition: color .2s, opacity .2s; }
.logos .row span:hover { color: var(--text); opacity: 1; }

/* ---------- Services ---------- */
.svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.svc-card {
  position: relative;
  padding: 30px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: transform .35s cubic-bezier(.3,.7,.4,1), border-color .35s, background .35s;
}
.svc-card:hover { transform: translateY(-6px); border-color: var(--border-2); }
.svc-card .svc-ico {
  width: 50px; height: 50px; border-radius: 13px;
  display: grid; place-items: center;
  background: var(--accent-12);
  color: var(--accent);
  border: 1px solid var(--accent-18);
  margin-bottom: 22px;
  transition: background .35s, color .35s, transform .35s;
}
.svc-card:hover .svc-ico { transform: scale(1.06) rotate(-3deg); }
.svc-card .svc-ico svg { width: 24px; height: 24px; }
.svc-card h3 { font-size: 21px; margin-bottom: 10px; }
.svc-card p { color: var(--text-mut); font-size: 15.5px; margin: 0 0 18px; }
.svc-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.svc-tags span { font-family: var(--font-head); font-size: 11.5px; color: var(--text-dim); padding: 4px 10px; border: 1px solid var(--border); border-radius: 999px; }
.svc-card .glow {
  position: absolute; top: -40%; right: -30%; width: 70%; height: 80%;
  background: radial-gradient(circle, var(--accent-18), transparent 70%);
  opacity: 0; transition: opacity .4s; pointer-events: none;
}
.svc-card:hover .glow { opacity: 1; }

/* card style: filled */
body[data-cards="filled"] .svc-card { background: linear-gradient(160deg, var(--surface-2), var(--surface)); }
body[data-cards="filled"] .svc-card:hover { background: linear-gradient(160deg, var(--accent-12), var(--surface)); }
/* card style: gradient-border */
body[data-cards="gradient"] .svc-card { background: var(--bg-2); border-color: transparent; }
body[data-cards="gradient"] .svc-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  background: linear-gradient(150deg, var(--accent-30), transparent 55%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
body[data-cards="gradient"] .svc-card:hover::before { background: linear-gradient(150deg, var(--accent), var(--accent-2) 70%, transparent); }

/* ---------- Process ---------- */
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; counter-reset: step; }
.step { position: relative; padding: 28px 24px; }
.step .snum {
  font-family: var(--font-head); font-size: 14px; font-weight: 600;
  width: 46px; height: 46px; border-radius: 12px;
  display: grid; place-items: center;
  border: 1px solid var(--border-2);
  background: oklch(1 0 0 / .02);
  color: var(--accent);
  margin-bottom: 22px;
}
.step h3 { font-size: 19px; margin-bottom: 9px; }
.step p { color: var(--text-mut); font-size: 14.5px; margin: 0; }
.step:not(:last-child)::after {
  content: ""; position: absolute; top: 51px; right: -9px; width: 18px; height: 1px;
  background: var(--border-2);
}
@media (max-width: 900px) { .step:not(:last-child)::after { display: none; } }

/* ---------- Stats ---------- */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat { text-align: left; padding: 8px 0; }
.stat .sval { font-family: var(--font-head); font-weight: 600; font-size: clamp(40px, 5.5vw, 64px); line-height: 1; letter-spacing: -0.03em; background: linear-gradient(120deg, var(--text), var(--accent)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.stat .slbl { color: var(--text-mut); font-size: 15px; margin-top: 14px; }
.stat .ssep { height: 1px; background: var(--border); margin-top: 22px; }

/* ---------- Testimonials ---------- */
.tst-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tst-card { padding: 30px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface); display: flex; flex-direction: column; gap: 20px; transition: transform .35s, border-color .35s; }
.tst-card:hover { transform: translateY(-4px); border-color: var(--border-2); }
.tst-card .quote-mark { font-family: var(--font-head); font-size: 46px; line-height: .4; color: var(--accent); opacity: .55; height: 22px; }
.tst-card p { font-size: 16px; color: var(--text); margin: 0; flex: 1; }
.tst-author { display: flex; align-items: center; gap: 13px; }
.tst-author .av { width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-2)); display: grid; place-items: center; font-family: var(--font-head); font-weight: 600; font-size: 16px; color: #fff; }
.tst-author b { display: block; font-size: 15px; font-weight: 600; }
.tst-author small { color: var(--text-dim); font-size: 13px; }
.tst-stars { display: flex; gap: 3px; color: oklch(0.84 0.13 80); }
.tst-stars svg { width: 15px; height: 15px; }

/* ---------- FAQ ---------- */
.faq-wrap { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(36px, 6vw, 80px); align-items: start; }
.faq-list { display: flex; flex-direction: column; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-q { width: 100%; background: none; border: 0; color: var(--text); font-family: var(--font-body); font-size: 18px; font-weight: 500; text-align: left; padding: 24px 0; display: flex; align-items: center; justify-content: space-between; gap: 20px; cursor: pointer; transition: color .2s; }
.faq-q:hover { color: var(--accent); }
.faq-q .pm { position: relative; width: 20px; height: 20px; flex-shrink: 0; }
.faq-q .pm::before, .faq-q .pm::after { content: ""; position: absolute; background: var(--accent); transition: transform .3s; }
.faq-q .pm::before { top: 9px; left: 0; width: 20px; height: 2px; }
.faq-q .pm::after { left: 9px; top: 0; width: 2px; height: 20px; }
.faq-item.open .pm::after { transform: scaleY(0); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .4s cubic-bezier(.4,0,.2,1); }
.faq-a p { color: var(--text-mut); font-size: 16px; margin: 0 0 24px; padding-right: 30px; text-wrap: pretty; }

/* ---------- CTA ---------- */
.cta { padding: clamp(72px, 11vw, 140px) 0; }
.cta-box {
  position: relative;
  border-radius: clamp(20px, 3vw, 34px);
  padding: clamp(48px, 7vw, 92px) clamp(32px, 6vw, 80px);
  background:
    radial-gradient(120% 140% at 80% 0%, var(--accent-30), transparent 55%),
    linear-gradient(160deg, var(--surface-2), var(--bg-2));
  border: 1px solid var(--border-2);
  overflow: hidden;
  text-align: center;
}
.cta-box::after {
  content: ""; position: absolute; inset: 0;
  background-image: linear-gradient(to right, oklch(1 0 0 / .04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .04) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(circle at 50% 0%, #000, transparent 70%);
  pointer-events: none;
}
.cta-box h2 { font-size: clamp(32px, 5vw, 60px); margin-bottom: 22px; position: relative; }
.cta-box p { color: var(--text-mut); font-size: clamp(17px, 1.8vw, 20px); max-width: 560px; margin: 0 auto 38px; position: relative; }
.cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }

/* ---------- Footer ---------- */
footer { border-top: 1px solid var(--border); padding: 64px 0 40px; }
.foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 50px; }
.foot-brand p { color: var(--text-mut); font-size: 15px; max-width: 300px; margin: 18px 0 22px; }
.foot-col h4 { font-family: var(--font-head); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 18px; }
.foot-col a { display: block; color: var(--text-mut); font-size: 15px; padding: 6px 0; transition: color .2s; }
.foot-col a:hover { color: var(--accent); }
.foot-bottom { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-top: 28px; border-top: 1px solid var(--border); flex-wrap: wrap; }
.foot-bottom small { color: var(--text-dim); font-size: 13.5px; font-family: var(--font-head); }
.foot-social { display: flex; gap: 10px; }
.foot-social a { width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--border); display: grid; place-items: center; color: var(--text-mut); transition: all .25s; }
.foot-social a:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }
.foot-social svg { width: 18px; height: 18px; }

/* ---------- Floating WhatsApp ---------- */
.wa-float {
  position: fixed; right: 24px; bottom: 24px; z-index: 90;
  display: flex; align-items: center; gap: 0;
  height: 60px; padding: 0; width: 60px;
  border-radius: 999px;
  background: linear-gradient(135deg, #25d366, #128c4b);
  color: #fff;
  box-shadow: 0 14px 34px -8px oklch(0.7 0.17 150 / .6);
  overflow: hidden;
  transition: width .35s cubic-bezier(.3,.7,.4,1), transform .25s, box-shadow .25s;
  cursor: pointer;
}
.wa-float .wa-ico { width: 60px; height: 60px; flex-shrink: 0; display: grid; place-items: center; }
.wa-float .wa-ico svg { width: 30px; height: 30px; }
.wa-float .wa-txt { font-family: var(--font-head); font-size: 14px; font-weight: 500; white-space: nowrap; opacity: 0; padding-right: 0; transition: opacity .25s, padding .25s; }
.wa-float:hover { width: 224px; transform: translateY(-2px); }
.wa-float:hover .wa-txt { opacity: 1; padding-right: 22px; }
.wa-float.pulse::before { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 0 oklch(0.7 0.17 150 / .5); animation: wapulse 2.4s ease-out infinite; }
@keyframes wapulse { 0% { box-shadow: 0 0 0 0 oklch(0.7 0.17 150 / .45); } 100% { box-shadow: 0 0 0 22px oklch(0.7 0.17 150 / 0); } }

/* ---------- Reveal animation ---------- */
.reveal { opacity: 0; transform: translateY(var(--reveal-y)); transition: opacity var(--reveal-dur) cubic-bezier(.2,.7,.3,1), transform var(--reveal-dur) cubic-bezier(.2,.7,.3,1); will-change: opacity, transform; }
.reveal.in { opacity: 1; transform: none; }
.reveal.d1 { transition-delay: .08s; } .reveal.d2 { transition-delay: .16s; } .reveal.d3 { transition-delay: .24s; } .reveal.d4 { transition-delay: .32s; } .reveal.d5 { transition-delay: .40s; }

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; opacity: 1; transform: none; }
  .float-chip, .term-cursor { animation: none; }
  html { scroll-behavior: auto; }
}

/* ---------- Responsive ---------- */
@media (max-width: 1000px) {
  .svc-grid, .tst-grid { grid-template-columns: repeat(2, 1fr); }
  .steps, .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .foot-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .nav-links, .nav-cta .btn { display: none; }
  .nav-burger { display: block; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { margin-top: 50px; }
  .faq-wrap { grid-template-columns: 1fr; }
  .float-chip.fc2 { left: 0; }
}
@media (max-width: 600px) {
  body { font-size: 16px; }
  .svc-grid, .tst-grid, .stats-grid { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
  .foot-grid { grid-template-columns: 1fr; gap: 30px; }
  .hero-trust { gap: 16px; }
  .wa-float:hover { width: 60px; }
  .wa-float:hover .wa-txt { opacity: 0; padding: 0; }
}

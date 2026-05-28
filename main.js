/* ============================================================
   NAV – scroll behaviour & mobile toggle
   ============================================================ */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = nav.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ============================================================
   SCROLL REVEAL – IntersectionObserver
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================================
   HERO – initial reveal on load
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});

/* ============================================================
   PARALLAX – subtle hero decoration & background
   ============================================================ */
const heroDeco = document.querySelector('.hero__deco');
const heroPattern = document.querySelector('.hero__pattern');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroDeco) {
    heroDeco.style.transform = `translateY(${y * 0.15}px) rotate(${y * 0.02}deg)`;
  }
  if (heroPattern) {
    heroPattern.style.transform = `translateY(${y * 0.08}px)`;
  }
}, { passive: true });

/* ============================================================
   DISH CARDS – staggered reveal with delay
   ============================================================ */
const dishCards = document.querySelectorAll('.dish-card');
const dishObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      dishObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

dishCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  dishObserver.observe(card);
});

/* ============================================================
   SMOOTH ACTIVE NAV LINK
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = nav.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.removeAttribute('data-active'));
      const match = nav.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (match) match.setAttribute('data-active', 'true');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   CURSOR SPARKLE (subtle gold dots on mouse move)
   ============================================================ */
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(sparkleTimeout);
  sparkleTimeout = setTimeout(() => {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255,205,0,0.8);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%,-50%);
      transition: opacity 0.6s ease, transform 0.6s ease;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%,-50%) scale(3)';
    });
    setTimeout(() => dot.remove(), 700);
  }, 60);
});

/* ============================================================
   TYPED EFFECT – hero eyebrow subtle animation
   ============================================================ */
const eyebrow = document.querySelector('.hero__eyebrow');
if (eyebrow) {
  const text = eyebrow.textContent;
  eyebrow.textContent = '';
  let idx = 0;
  const type = () => {
    if (idx < text.length) {
      eyebrow.textContent += text[idx++];
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 800);
}

/* ============================================================
   BACK TO TOP on logo click
   ============================================================ */
document.querySelector('.nav__logo')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

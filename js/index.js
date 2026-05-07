// index.js — ES6 module entry point for index.html
import { highlightActiveNav } from './theme.js';
import { typeWriter, initParticles, drawProfitChart } from './main.js';

highlightActiveNav();
initParticles('particle-canvas');
typeWriter(
  'hero-typewriter',
  'Software Engineer | ML Researcher | Builder',
  55
);

// ML card accordion — vanilla JS, original
const mlCards = document.querySelectorAll('.ml-card-btn');
mlCards.forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const bodyId = btn.getAttribute('aria-controls');
    const body = document.getElementById(bodyId);

    // Collapse all others
    mlCards.forEach((other) => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        const otherBody = document.getElementById(otherId);
        if (otherBody) otherBody.hidden = true;
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', String(!expanded));
    if (body) body.hidden = expanded;
  });
});

// Draw profit chart when section scrolls into view
const chartSection = document.getElementById('projects');
let chartDrawn = false;
const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !chartDrawn) {
        chartDrawn = true;
        drawProfitChart('profit-chart');
      }
    });
  },
  { threshold: 0.2 }
);

if (chartSection) chartObserver.observe(chartSection);

// Skills bar animator 
export function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.dataset.level;
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.style.width = current + '%';
            if (current >= target) clearInterval(timer);
          }, 16);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((bar) => observer.observe(bar));
}

// Typewriter effect for hero heading
export function typeWriter(elementId, text, speed = 60) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Particle canvas background
export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 2 + 1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,0.45)';
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// PPO vs DQN interactive chart
export function drawProfitChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = (canvas.width = canvas.offsetWidth);
  const H = (canvas.height = 260);

  const data = {
    labels: ['Baseline', 'DQN', 'PPO'],
    values: [4.12, 5.97, 6.89],
    colors: ['#64748b', '#38bdf8', '#00e5ff'],
  };

  const maxVal = 8;
  const padL = 60,
    padB = 40,
    padT = 20,
    padR = 20;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const barW = (chartW / data.labels.length) * 0.5;
  const gap = chartW / data.labels.length;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('$' + ((maxVal * i) / 4).toFixed(1) + 'M', padL - 6, y + 4);
  }

  // Animate bars
  let progress = 0;
  function render() {
    ctx.clearRect(0, 0, W, H);

    // Re-draw grid
    for (let i = 0; i <= 4; i++) {
      const y = padT + chartH - (i / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('$' + ((maxVal * i) / 4).toFixed(1) + 'M', padL - 6, y + 4);
    }

    data.values.forEach((val, i) => {
      const x = padL + gap * i + gap / 2 - barW / 2;
      const fullH = (val / maxVal) * chartH;
      const animH = fullH * Math.min(progress, 1);
      const y = padT + chartH - animH;

      const grad = ctx.createLinearGradient(x, y, x, padT + chartH);
      grad.addColorStop(0, data.colors[i]);
      grad.addColorStop(1, data.colors[i] + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, animH, 4);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      if (progress >= 1) {
        ctx.fillText('$' + val + 'M', x + barW / 2, y - 6);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(data.labels[i], x + barW / 2, H - 10);
    });

    if (progress < 1) {
      progress += 0.025;
      requestAnimationFrame(render);
    }
  }
  render();
}

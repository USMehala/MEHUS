
// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
function animateRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateRing); }
animateRing();
document.querySelectorAll('a, button, .skill-tag, .info-card, .project-card, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'rgba(65,105,225,0.9)'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(65,105,225,0.5)'; });
});

// ─── LOADER ───
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('loader').classList.add('hide'); }, 2000);
});

// ─── CANVAS PARTICLES ───
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    // Blue palette: ice, royal, indigo, darkblue, navy, azure
    const colors = [
      '220,234,247',   // --ice   #DCEAF7
      '65,105,225',    // --royal #4169E1
      '0,74,176',      // --indigo #004AB0
      '0,0,205',       // --darkblue #0000CD
      '0,0,128',       // --navy  #000080
      '240,255,255',   // --azure #F0FFFF
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

// ─── NEBULA BLOBS — blue palette ───
function drawNebula() {
  const blobs = [
    { x: W * 0.1,  y: H * 0.2, r: 300, c1: 'rgba(65,105,225,0.07)',  c2: 'transparent' },  // royal
    { x: W * 0.85, y: H * 0.5, r: 280, c1: 'rgba(0,74,176,0.07)',    c2: 'transparent' },  // indigo
    { x: W * 0.5,  y: H * 0.8, r: 320, c1: 'rgba(220,234,247,0.04)', c2: 'transparent' },  // ice
    { x: W * 0.3,  y: H * 0.6, r: 200, c1: 'rgba(0,0,205,0.05)',     c2: 'transparent' },  // darkblue
  ];
  blobs.forEach(b => {
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    g.addColorStop(0, b.c1); g.addColorStop(1, b.c2);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawNebula();
  // connect nearby particles with blue lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(65,105,225,${0.08 * (1 - d / 100)})`; // royal blue lines
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
function closeMobileNav() { mobileNav.classList.remove('open'); }

// ─── NAV SCROLL STYLE ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.padding = window.scrollY > 40 ? '14px 6vw' : '20px 6vw';
});
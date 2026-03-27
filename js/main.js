// =============================================
//  SZUD Vebsajt - main.js
// =============================================

// --- 1. Aktivni link u navigaciji ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// --- 2. Skill bar animacija (Intersection Observer) ---
const skillCards = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fillBar 1.2s ease forwards';
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));

// --- 3. Fade-in animacija za sekcije ---
const revealEls = document.querySelectorAll('.project-card, .skill-card, .contact-inner');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// --- 4. Tekuća godina u footer-u ---
const footerYear = document.querySelector('.footer span');
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} SZUD Projekat`;
}

// --- 5. Smooth scroll za navigacione linkove ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('SZUD Vebsajt učitan uspešno!');

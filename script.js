const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const yearNode = document.getElementById('year');
const pdfModal = document.getElementById('pdfModal');
const pdfFrame = document.getElementById('pdfFrame');
const pdfClose = document.getElementById('pdfClose');
const pdfBackdrop = document.getElementById('pdfBackdrop');
const pdfOpenNew = document.getElementById('pdfOpenNew');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

[...document.querySelectorAll('.nav a')].forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const openPdfModal = (src) => {
  pdfFrame.src = src;
  pdfOpenNew.href = src;
  pdfModal.classList.add('open');
  pdfModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closePdfModal = () => {
  pdfModal.classList.remove('open');
  pdfModal.setAttribute('aria-hidden', 'true');
  pdfFrame.src = '';
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-pdf]').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.getAttribute('data-pdf');
    openPdfModal(src);
  });
});

pdfClose.addEventListener('click', closePdfModal);
pdfBackdrop.addEventListener('click', closePdfModal);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pdfModal.classList.contains('open')) {
    closePdfModal();
  }
});

const filterButtons = document.querySelectorAll('.filter-button');
const docCards = document.querySelectorAll('.doc-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');

    docCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden-by-filter', !shouldShow);
    });
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach((section) => spy.observe(section));

const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const revealItems = document.querySelectorAll('.reveal');
const forms = document.querySelectorAll('.lead-form-modern');

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));
setHeaderState();

window.addEventListener('scroll', setHeaderState, { passive: true });

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggle.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    if (note) {
      note.textContent = 'تم استلام الطلب. سيتواصل معك فريق دار الأسرة قريبًا.';
    }
    form.reset();
  });
});

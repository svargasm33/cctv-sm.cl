// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ===== Service filters =====
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.service-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ===== Modal de Cámaras de Seguridad =====
function openProductModal(category) {
  const modal = document.getElementById('cameras-modal');
  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('cameras-modal');
  modal?.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Cerrar modal al presionar ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});

// ===== Cotizar producto desde modal =====
function cotizarProducto(producto) {
  const texto = `Hola, me interesa cotizar el siguiente producto:%0A${producto}%0A%0A¿Puedes enviarme más información?`;
  window.open(`https://wa.me/56959888902?text=${encodeURIComponent(texto)}`, '_blank');
}

// ===== Contact form -> WhatsApp =====
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const nombre = data.get('nombre') || '';
  const contacto = data.get('contacto') || '';
  const mensaje = data.get('mensaje') || '';

  const texto =
    `Hola CCTV-SM, mi nombre es ${nombre}.%0A` +
    `Mi contacto: ${contacto}.%0A` +
    `Proyecto: ${mensaje}`;

  window.open(`https://wa.me/56959888902?text=${texto}`, '_blank');
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

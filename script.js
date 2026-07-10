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

// ===== Panel de detalle por categoría =====
const serviceData = {
  camaras: {
    eyebrow: 'Cámaras de Seguridad',
    title: 'Videovigilancia de Alta Definición',
    heroImg: 'images/hero-camera.jpg',
    text: [
      'Protege lo que más importa con nuestros sistemas de videovigilancia equipados con tecnología de vanguardia en  inteligencia artificial de reconocimiento facial, cruce perimetral y visión nocturna.',
      'Trabajamos con equipos certificados y un equipo técnico especializado en cada instalación, entregando soluciones confiables y adaptadas a las necesidades reales de cada proyecto.'
    ],
    gallery: [
      { type: 'image', src: 'images/camaras-1.jpg' },
      { type: 'image', src: 'images/camaras-2.jpg' },
      { type: 'video', src: 'videos/camaras-demo.mp4', poster: 'images/camaras-video-poster.jpg' }
    ]
  },
  alarmas: {
    eyebrow: 'Alarmas',
    title: 'Sistemas de alarma para hogar y empresa',
    heroImg: 'images/alarmas-hero.jpg',
    text: [
      'Instalamos sistemas de alarma con sensores de movimiento, apertura de puertas y ventanas, y sirenas de alta potencia. Ante cualquier intento de intrusión, el sistema notifica de inmediato a tu celular.',
      'Ideal para casas, oficinas y locales comerciales que buscan una capa adicional de protección, con monitoreo simple desde una app.'
    ],
    gallery: [
      { type: 'image', src: 'images/alarmas-1.jpg' },
      { type: 'image', src: 'images/alarmas-2.jpg' },
      { type: 'video', src: 'videos/alarmas-demo.mp4', poster: 'images/alarmas-video-poster.jpg' }
    ]
  },
  cercos: {
    eyebrow: 'Cercos Eléctricos',
    title: 'Protección perimetral certificada',
    heroImg: 'images/cercos-hero.jpg',
    text: [
      'Diseñamos e instalamos cercos eléctricos certificados para casas, condominios, empresas y terrenos, disuadiendo intrusiones antes de que ocurran.',
      'Nuestras instalaciones cumplen con la normativa vigente y se integran con alarmas y cámaras para una protección perimetral completa.'
    ],
    gallery: [
      { type: 'image', src: 'images/cercos-1.jpg' },
      { type: 'image', src: 'images/cercos-2.jpg' },
      { type: 'video', src: 'videos/cercos-demo.mp4', poster: 'images/cercos-video-poster.jpg' }
    ]
  },
  acceso: {
    eyebrow: 'Control de Acceso',
    title: 'Control de acceso con huella, tarjeta y rostro',
    heroImg: 'images/acceso-hero.jpg',
    text: [
      'Implementamos sistemas de control de acceso con huella digital, tarjetas, códigos y reconocimiento facial, ideales para condominios, edificios y empresas.',
      'Gestiona quién entra y sale de tus instalaciones, con registros de acceso y opciones de integración con portones y cerraduras eléctricas.'
    ],
    gallery: [
      { type: 'image', src: 'images/acceso-1.jpg' },
      { type: 'image', src: 'images/acceso-2.jpg' },
      { type: 'video', src: 'videos/acceso-demo.mp4', poster: 'images/acceso-video-poster.jpg' }
    ]
  },
  otros: {
    eyebrow: 'Otros Productos',
    title: 'Videoporteros, citofonía, redes y respaldo eléctrico',
    heroImg: 'images/otros-hero.jpg',
    text: [
      'Complementamos tu sistema de seguridad con videoporteros, citofonía, redes de datos y UPS de respaldo eléctrico, asegurando que tus equipos sigan funcionando ante un corte de luz.',
      'Consulta por soluciones a medida según el tamaño y necesidades de tu proyecto.'
    ],
    gallery: [
      { type: 'image', src: 'images/otros-1.jpg' },
      { type: 'image', src: 'images/otros-2.jpg' },
      { type: 'video', src: 'videos/otros-demo.mp4', poster: 'images/otros-video-poster.jpg' }
    ]
  }
};

const detailPanel = document.getElementById('detail-panel');
const detailCloseBtn = document.getElementById('detail-panel-close');
const detailEyebrow = document.getElementById('detail-eyebrow');
const detailTitle = document.getElementById('detail-title');
const detailHeroImg = document.getElementById('detail-hero-img');
const detailText = document.getElementById('detail-text');
const detailGallery = document.getElementById('detail-gallery');
const detailWhatsapp = document.getElementById('detail-whatsapp');

function renderDetailPanel(cat) {
  const data = serviceData[cat];
  if (!data || !detailPanel) return;

  detailEyebrow.textContent = data.eyebrow;
  detailTitle.textContent = data.title;
  detailHeroImg.src = data.heroImg;
  detailHeroImg.alt = data.title;

  detailText.innerHTML = '';
  data.text.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    detailText.appendChild(p);
  });

  detailGallery.innerHTML = '';
  data.gallery.forEach(item => {
    const wrap = document.createElement('div');
    wrap.className = 'detail-gallery-item' + (item.type === 'video' ? ' is-video' : '');

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.poster = item.poster || '';
      const source = document.createElement('source');
      source.src = item.src;
      source.type = 'video/mp4';
      video.appendChild(source);
      wrap.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = data.title;
      img.loading = 'lazy';
      wrap.appendChild(img);
    }
    detailGallery.appendChild(wrap);
  });

  const text = `Hola, me interesa cotizar el servicio de ${data.eyebrow}`;
  detailWhatsapp.href = `https://wa.me/56959888902?text=${encodeURIComponent(text)}`;
}

function openDetailPanel(cat) {
  renderDetailPanel(cat);
  detailPanel.hidden = false;
  requestAnimationFrame(() => detailPanel.classList.add('is-open'));
  setTimeout(() => {
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function closeDetailPanel() {
  detailPanel.classList.remove('is-open');
  detailPanel.addEventListener('transitionend', function handler() {
    detailPanel.hidden = true;
    detailPanel.removeEventListener('transitionend', handler);
  });
}

document.getElementById('cards-grid')?.addEventListener('click', (e) => {
  const link = e.target.closest('.card-link');
  if (!link) return;
  e.preventDefault();
  const card = link.closest('.service-card');
  const cat = card?.dataset.cat;
  if (!cat) return;

  const alreadyOpenSameCat = detailPanel.classList.contains('is-open') && detailPanel.dataset.currentCat === cat;
  detailPanel.dataset.currentCat = cat;

  if (alreadyOpenSameCat) {
    closeDetailPanel();
  } else {
    openDetailPanel(cat);
  }
});

detailCloseBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  closeDetailPanel();
});

// ===== Lightbox de imágenes de galería =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lightbox.addEventListener('transitionend', function handler() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    lightbox.removeEventListener('transitionend', handler);
  });
}

detailGallery?.addEventListener('click', (e) => {
  const item = e.target.closest('.detail-gallery-item:not(.is-video)');
  if (!item) return;
  const img = item.querySelector('img');
  if (img) openLightbox(img.src, img.alt);
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

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

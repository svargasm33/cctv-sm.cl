document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENÚ MÓVIL (Navegación en celulares)
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            // Alterna una clase para mostrar/ocultar el menú
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Aquí puedes agregar lógica adicional si en tu CSS decides
            // mostrar el menú usando una clase como .active
            if (mainNav.style.display === 'flex') {
                mainNav.style.display = 'none';
            } else {
                mainNav.style.display = 'flex';
                mainNav.style.flexDirection = 'column';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '80px';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.background = '#ffffff';
                mainNav.style.padding = '20px';
                mainNav.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }
        });

        // Ocultar el menú al hacer clic en un enlace (para celulares)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.style.display = 'none';
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /* ==========================================================================
       2. FILTRO DE SERVICIOS
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (filterBtns.length > 0 && serviceCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Quitar la clase 'active' de todos los botones
                filterBtns.forEach(b => b.classList.remove('active'));
                // Agregar la clase 'active' al botón clickeado
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Mostrar u ocultar tarjetas según el filtro
                serviceCards.forEach(card => {
                    const category = card.getAttribute('data-cat');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        // Pequeña animación de aparición
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ==========================================================================
       3. FORMULARIO DE CONTACTO A WHATSAPP
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Capturar los valores de los inputs
            const nombre = this.nombre.value.trim();
            const contacto = this.contacto.value.trim();
            const mensaje = this.mensaje.value.trim();

            // Construir el mensaje formateado para WhatsApp
            const textoWhatsApp = `Hola CCTV-SM! 👋%0A%0ASoy *${nombre}*.%0AMi dato de contacto es: ${contacto}%0A%0A*Te escribo por lo siguiente:*%0A${mensaje}`;
            
            // Número de destino (el mismo que configuramos en los botones del HTML)
            const numeroDestino = '56959888902';
            
            // Crear la URL de la API de WhatsApp
            const url = `https://wa.me/${numeroDestino}?text=${textoWhatsApp}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(url, '_blank');
        });
    }

});

/* ==========================================================================
   4. ESTILOS DINÁMICOS ADICIONALES (Animación de filtros)
   ========================================================================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

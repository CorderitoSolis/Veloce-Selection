document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENÚ MÓVIL (HAMBURGUESA)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alternar ícono de barras a equis (X)
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Cerrar menú al hacer clic en un enlace (Mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // 2. FILTRADO DE CATÁLOGO
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de otros botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Pequeña animación de entrada
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. VALIDACIÓN Y ENVÍO DEL FORMULARIO
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const interest = document.getElementById('car-interest').value;

        if (name && email && interest) {
            // Simulación de envío exitoso
            formMessage.textContent = `¡Gracias, ${name}! Tu solicitud para el modelo seleccionado ha sido enviada con éxito. Nos contactaremos contigo pronto.`;
            formMessage.classList.remove('hidden');
            formMessage.classList.add('success');

            // Limpiar formulario
            contactForm.reset();

            // Ocultar mensaje tras 5 segundos
            setTimeout(() => {
                formMessage.classList.add('hidden');
                formMessage.classList.remove('success');
            }, 5000);
        }
    });
});
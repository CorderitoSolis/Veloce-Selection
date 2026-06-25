document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // --- Lógica Avanzada del Inventario (Filtro, Búsqueda y Ordenamiento) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carGrid = document.getElementById('car-grid');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    
    let currentFilter = 'todos';

    function updateInventory() {
        const query = searchInput.value.toLowerCase().trim();
        const cards = Array.from(document.querySelectorAll('.car-card'));

        // Filtrar y Buscar
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name');
            
            const matchesFilter = (currentFilter === 'todos' || category === currentFilter);
            const matchesSearch = name.includes(query);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Ordenar Elementos Visibles
        const sortValue = sortSelect.value;
        if (sortValue !== 'default') {
            cards.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return sortValue === 'price-asc' ? priceA - priceB : priceB - priceA;
            });
            // Re-inyectar ordenados
            cards.forEach(card => carGrid.appendChild(card));
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-filter');
            updateInventory();
        });
    });

    searchInput.addEventListener('input', updateInventory);
    sortSelect.addEventListener('change', updateInventory);


    // --- Lógica del Módulo de Financiamiento ---
    const carSelect = document.getElementById('finance-car-select');
    const downpaymentInput = document.getElementById('finance-downpayment');
    const monthsInput = document.getElementById('finance-months');
    const interestInput = document.getElementById('finance-interest');

    const downpaymentValLabel = document.getElementById('downpayment-val');
    const monthsValLabel = document.getElementById('months-val');
    const monthlyPaymentResult = document.getElementById('monthly-payment-result');
    
    const summaryTotal = document.getElementById('summary-total');
    const summaryDownpayment = document.getElementById('summary-downpayment');
    const summaryFinanced = document.getElementById('summary-financed');

    function calculateFinance() {
        const totalVehiclePrice = parseFloat(carSelect.value);
        const downpaymentPercentage = parseFloat(downpaymentInput.value);
        const loanTermMonths = parseInt(monthsInput.value);
        const annualInterestRate = parseFloat(interestInput.value) / 100;

        // Dinámica de Labels
        const downpaymentAmount = totalVehiclePrice * (downpaymentPercentage / 100);
        const amountToFinance = totalVehiclePrice - downpaymentAmount;

        downpaymentValLabel.textContent = `${downpaymentPercentage}% ($${downpaymentAmount.toLocaleString()})`;
        monthsValLabel.textContent = `${loanTermMonths} Meses`;

        // Fórmula del sistema de amortización francés para la cuota mensual
        const monthlyInterestRate = annualInterestRate / 12;
        let monthlyPayment = 0;

        if (monthlyInterestRate === 0) {
            monthlyPayment = amountToFinance / loanTermMonths;
        } else {
            monthlyPayment = amountToFinance * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
        }

        // Render de resultados
        monthlyPaymentResult.textContent = `$${monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        summaryTotal.textContent = `$${totalVehiclePrice.toLocaleString()}`;
        summaryDownpayment.textContent = `$${downpaymentAmount.toLocaleString()}`;
        summaryFinanced.textContent = `$${amountToFinance.toLocaleString()}`;
    }

    // Escuchadores de eventos para recálculo interactivo instantáneo
    carSelect.addEventListener('change', calculateFinance);
    downpaymentInput.addEventListener('input', calculateFinance);
    monthsInput.addEventListener('input', calculateFinance);
    interestInput.addEventListener('input', calculateFinance);

    // Inicializar cálculo inicial
    calculateFinance();

    // Atajo: Botón de calculadora de la tarjeta vincula directo al cotizador
    document.querySelectorAll('.btn-calc-trigger').forEach(btn => {
        btn.addEventListener('click', function() {
            const price = this.getAttribute('data-price');
            carSelect.value = price;
            calculateFinance();
            document.getElementById('financiamiento').scrollIntoView({ behavior: 'smooth' });
        });
    });


    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const interest = document.getElementById('car-interest').value;

        if (name && email && interest) {
            formMessage.textContent = `¡Gracias, ${name}! Tu solicitud para el modelo seleccionado ha sido enviada con éxito. Nos contactaremos contigo pronto.`;
            formMessage.classList.remove('hidden');
            formMessage.classList.add('success');

            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.add('hidden');
                formMessage.classList.remove('success');
            }, 5000);
        }
    });

    // --- Control Desplegable de Tarjetas ---
    const botonesCard = document.querySelectorAll('.btn-card');

    botonesCard.forEach(boton => {
        boton.addEventListener('click', function() {
            const tarjeta = this.closest('.car-card');
            const desplegable = tarjeta.querySelector('.info-desplegable');

            if (desplegable) {
                desplegable.classList.toggle('active');

                if (desplegable.classList.contains('active')) {
                    this.textContent = 'Menos Información';
                } else {
                    this.textContent = 'Más Información';
                }
            }
        });
    });
});

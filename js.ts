 // Data for menu items
    const menuData = {
      platillos: [
        { id: 'p1', name: 'Camarones al Ajillo', description: 'Camarones salteados con ajo y aceite de oliva.', price: 120 },
        { id: 'p2', name: 'Filete de Pescado', description: 'Filete fresco a la plancha con limón.', price: 110 },
        { id: 'p3', name: 'Pulpo a la Gallega', description: 'Pulpo cocido con pimentón y aceite de oliva.', price: 130 }
      ],
      cocteles: [
        { id: 'c1', name: 'Cóctel de Camarón', description: 'Camarones frescos, tomate, cebolla y cilantro.', price: 90 },
        { id: 'c2', name: 'Cóctel de Pulpo', description: 'Pulpo con salsa especial y limón.', price: 95 },
        { id: 'c3', name: 'Cóctel Mixto', description: 'Mezcla de mariscos con salsa coctelera.', price: 100 }
      ],
      sopas: [
        { id: 's1', name: 'Sopa de Mariscos', description: 'Caldo con mariscos variados y verduras.', price: 90 },
        { id: 's2', name: 'Caldo de Camarón', description: 'Caldo tradicional de camarón con chile.', price: 85 },
        { id: 's3', name: 'Sopa de Pescado', description: 'Caldo de pescado fresco con verduras.', price: 80 }
      ],
    };

    // Function to create menu items in a section
    function renderMenuItems(sectionId, items) {
      const container = document.getElementById(sectionId + '-list');
      container.innerHTML = '';
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
          <h4>${item.name}</h4>
          <p class="description">${item.description}</p>
          <div class="price-qty">
            <div class="price">$${item.price.toFixed(2)}</div>
            <div>
              <label for="qty-${item.id}">Cantidad:</label>
              <input type="number" id="qty-${item.id}" min="0" value="0" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" />
            </div>
          </div>
        `;
        container.appendChild(div);
      });
    }

    // Initialize all menu items
    ['platillos', 'cocteles', 'sopas'].forEach(section => {
      renderMenuItems(section, menuData[section]);
    });

    // Handle menu navigation clicks
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main > section:not(#order)');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = link.getAttribute('data-section');
        sections.forEach(sec => {
          sec.classList.toggle('active', sec.id === target);
        });
        // Hide order section on navigation
        orderSection.style.display = 'none';
      });
    });

    // Order summary and placing order
    const orderSummary = document.getElementById('order-summary');
    const placeOrderBtn = document.getElementById('place-order');
    const orderSection = document.getElementById('order');

    function updateOrderSummary() {
      let itemsOrdered = [];
      let total = 0;
      document.querySelectorAll('input[type="number"]').forEach(input => {
        const qty = parseInt(input.value);
        if (qty > 0) {
          const id = input.dataset.id;
          const name = input.dataset.name;
          const price = parseFloat(input.dataset.price);
          const itemTotal = price * qty;
          total += itemTotal;
          itemsOrdered.push(`${qty} x ${name} - $${itemTotal.toFixed(2)}`);
        }
      });
      if(itemsOrdered.length === 0){
        orderSummary.textContent = 'No has agregado nada al pedido.';
        placeOrderBtn.disabled = true;
      } else {
        orderSummary.textContent = itemsOrdered.join('\n') + `\n\nTotal: $${total.toFixed(2)}`;
        placeOrderBtn.disabled = false;
      }
    }

    // Listen to quantity changes on inputs
    document.body.addEventListener('input', e => {
      if(e.target.matches('input[type="number"]')) {
        if (e.target.value < 0) e.target.value = 0;
        updateOrderSummary();
      }
    });

    // Place order button click
    placeOrderBtn.addEventListener('click', () => {
      alert('Gracias por tu pedido. ¡Nos pondremos en contacto contigo pronto!');
      // Reset all quantities and order summary
      document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
      updateOrderSummary();
      // Optionally navigate to Inicio or clear active menu
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[0].classList.add('active');
      sections.forEach(sec => sec.classList.toggle('active', sec.id === 'inicio'));
      orderSection.style.display = 'none';
    });

    // Show order tab on demand
    // Add a "Tu Pedido" button in nav to open order summary
    const orderNavItem = document.createElement('a');
    orderNavItem.href = '#';
    orderNavItem.textContent = 'Tu Pedido';
    orderNavItem.style.marginTop = 'auto';
    orderNavItem.style.padding = '15px 20px';
    orderNavItem.style.fontWeight = '700';
    orderNavItem.style.color = '#a7ffeb';
    orderNavItem.style.cursor = 'pointer';
    orderNavItem.style.borderLeft = '6px solid transparent';
    orderNavItem.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      orderNavItem.classList.add('active');
      sections.forEach(sec => sec.classList.remove('active'));
      orderSection.style.display = 'block';
      orderSummary.scrollIntoView({behavior: 'smooth'});
      updateOrderSummary();
    });
    document.querySelector('nav').appendChild(orderNavItem);
    orderSection.style.display = 'none';

    // Carousel functionality for Inicio
    const carouselSlide = document.getElementById('carousel-slide');
    const carouselImages = carouselSlide.querySelectorAll('img');
    const prevBtn = document.querySelector('.carousel-btn.left');
    const nextBtn = document.querySelector('.carousel-btn.right');
    let counter = 0;
    const totalImages = carouselImages.length;

    function showSlide(index) {
      if (index < 0) {
        counter = totalImages -1;
      } else if (index >= totalImages) {
        counter = 0;
      } else {
        counter = index;
      }
      carouselSlide.style.transform = `translateX(${-counter * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
      showSlide(counter -1);
    });
    nextBtn.addEventListener('click', () => {
      showSlide(counter +1);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      showSlide(counter +1);
    }, 5000);

// Botón volver arriba MEJORADO
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
    backTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

// Carrito de compras con cantidades MEJORADO
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCounter = document.getElementById("cartCounter");
let cart = [];

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
        const card = e.target.closest(".card");
        const title = card.querySelector(".card-title").textContent;
        const price = parseFloat(card.querySelector(".text-success").textContent.replace("$",""));

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({title, price, quantity: 1});
        }

        updateCart();

        // Animación +1
        showPlusOne(btn);
        
        // Animación de botón
        btn.classList.add("add-to-cart-animation");
        setTimeout(() => {
            btn.classList.remove("add-to-cart-animation");
        }, 500);
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío.</p>';
        cartCounter.textContent = "0";
        cartTotal.textContent = "0.00";
        return;
    }

    cart.forEach(item => {
        const li = document.createElement("div");
        li.className = "d-flex justify-content-between align-items-center border-bottom pb-3 mb-3";

        // Información del producto
        const productInfo = document.createElement("div");
        productInfo.className = "d-flex align-items-center";
        
        const productDetails = document.createElement("div");
        productDetails.innerHTML = `
            <h6 class="mb-1">${item.title}</h6>
            <p class="mb-0 text-muted small">$${item.price.toFixed(2)} c/u</p>
        `;
        
        productInfo.appendChild(productDetails);

        // Controles de cantidad
        const quantityControls = document.createElement("div");
        quantityControls.className = "d-flex align-items-center";
        
        const decreaseBtn = document.createElement("button");
        decreaseBtn.className = "btn btn-sm btn-outline-secondary";
        decreaseBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
        decreaseBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(cartItem => cartItem.title !== item.title);
            }
            updateCart();
        });
        
        const quantitySpan = document.createElement("span");
        quantitySpan.className = "mx-2";
        quantitySpan.textContent = item.quantity;
        
        const increaseBtn = document.createElement("button");
        increaseBtn.className = "btn btn-sm btn-outline-secondary";
        increaseBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        increaseBtn.addEventListener("click", () => {
            item.quantity += 1;
            updateCart();
        });
        
        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(quantitySpan);
        quantityControls.appendChild(increaseBtn);

        // Precio total por producto
        const priceSpan = document.createElement("span");
        priceSpan.className = "fw-bold";
        priceSpan.textContent = "$" + (item.price * item.quantity).toFixed(2);

        li.appendChild(productInfo);
        li.appendChild(quantityControls);
        li.appendChild(priceSpan);

        cartItems.appendChild(li);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartCounter.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2);
}

// Animación +1 MEJORADA
function showPlusOne(button) {
    const plus = document.createElement("span");
    plus.textContent = "+1";
    plus.style.position = "absolute";
    plus.style.color = "#28a745";
    plus.style.fontWeight = "bold";
    plus.style.fontSize = "16px";
    plus.style.pointerEvents = "none";
    plus.style.zIndex = "1000";

    const rect = button.getBoundingClientRect();
    plus.style.left = rect.left + rect.width / 2 + "px";
    plus.style.top = rect.top - 20 + "px";
    plus.style.transition = "all 0.8s ease-out";
    document.body.appendChild(plus);

    requestAnimationFrame(() => {
        plus.style.top = rect.top - 50 + "px";
        plus.style.opacity = 0;
    });

    setTimeout(() => {
        plus.remove();
    }, 800);
}

// Formularios de login y registro (demo) MEJORADOS
document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    // Simular inicio de sesión exitoso
    const loginBtn = e.target.querySelector('button[type="submit"]');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Iniciando sesión...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        alert("Sesión iniciada (demo)");
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }, 1500);
});

document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    // Simular registro exitoso
    const registerBtn = e.target.querySelector('button[type="submit"]');
    const originalText = registerBtn.textContent;
    registerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creando cuenta...';
    registerBtn.disabled = true;
    
    setTimeout(() => {
        alert("Usuario registrado (demo)");
        bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;
    }, 1500);
});

// Buscador MEJORADO
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("buscador");
const productsRow = document.getElementById("productsRow");
const products = productsRow.querySelectorAll(".col-sm-6, .col-md-4, .col-lg-3");

// Mostrar solo los primeros 4 productos inicialmente
products.forEach((product, index) => {
    if(index < 4) {
        product.style.display = "block";
        product.classList.add("fade-in");
        product.style.animationDelay = `${index * 0.1}s`;
    }
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === "") {
        // Si la búsqueda está vacía, mostrar solo los primeros 4 productos
        products.forEach((product, index) => {
            if(index < 4) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
        document.getElementById("sectionTitle").textContent = "Productos destacados";
        return;
    }
    
    let found = false;
    products.forEach(product => {
        const title = product.querySelector(".card-title").textContent.toLowerCase();
        if (title.includes(query)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });
    
    if (!found) {
        productsRow.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fa-solid fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron productos</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
                <button class="btn btn-primary" id="clearSearch">Mostrar todos los productos</button>
            </div>
        `;
        
        document.getElementById("clearSearch").addEventListener("click", () => {
            searchInput.value = "";
            products.forEach((product, index) => {
                if(index < 4) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
            document.getElementById("sectionTitle").textContent = "Productos destacados";
        });
    } else {
        document.getElementById("sectionTitle").textContent = `Resultados para: "${query}"`;
    }
});

// Modo oscuro MEJORADO
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Modo claro';
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Modo oscuro';
    }
});

if(localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Modo claro';
}

// Toggle categorías MEJORADO
const categoryToggle = document.getElementById("categoryToggle");
const showAllProducts = document.getElementById("showAllProducts");
const showFeatured = document.getElementById("showFeatured");
const sectionTitle = document.getElementById("sectionTitle");

categoryToggle.addEventListener("click", (e) => {
    e.preventDefault();
    sectionTitle.textContent = "Seinen y Shonen"; 
    products.forEach(product => {
        product.style.display = "block";
        product.classList.add("fade-in");
    });
});

showAllProducts.addEventListener("click", (e) => {
    e.preventDefault();
    sectionTitle.textContent = "Todos los productos"; 
    products.forEach(product => {
        product.style.display = "block";
        product.classList.add("fade-in");
    });
});

showFeatured.addEventListener("click", (e) => {
    e.preventDefault();
    sectionTitle.textContent = "Productos destacados"; 
    products.forEach((product, index) => {
        if(index < 4) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

// Ordenar productos MEJORADO
document.querySelectorAll('[data-sort]').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const sortType = e.target.getAttribute('data-sort');
        const productArray = Array.from(products);
        
        productArray.sort((a, b) => {
            const titleA = a.querySelector('.card-title').textContent.toLowerCase();
            const titleB = b.querySelector('.card-title').textContent.toLowerCase();
            const priceA = parseFloat(a.querySelector('.text-success').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.text-success').textContent.replace('$', ''));
            
            switch(sortType) {
                case 'name':
                    return titleA.localeCompare(titleB);
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });
        
        // Reorganizar productos en el DOM
        productArray.forEach(product => {
            productsRow.appendChild(product);
        });
        
        // Actualizar texto del dropdown
        document.getElementById('sortDropdown').textContent = e.target.textContent;
    });
});

// Cambiar vista (grid/lista) MEJORADO
const toggleView = document.getElementById("toggleView");
let isListView = false;

toggleView.addEventListener("click", () => {
    isListView = !isListView;
    
    if (isListView) {
        productsRow.classList.add("products-list-view");
        toggleView.innerHTML = '<i class="fa-solid fa-table-cells"></i>';
        toggleView.setAttribute("aria-label", "Cambiar a vista de cuadrícula");
    } else {
        productsRow.classList.remove("products-list-view");
        toggleView.innerHTML = '<i class="fa-solid fa-grip"></i>';
        toggleView.setAttribute("aria-label", "Cambiar a vista de lista");
    }
});

// Efectos de scroll para elementos
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.product-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar efectos de entrada para las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger para que se activen las animaciones después de un pequeño delay
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Mejorar accesibilidad del teclado
document.addEventListener('keydown', (e) => {
    // Navegación con teclado en modales
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modalInstance = bootstrap.Modal.getInstance(openModal);
            modalInstance.hide();
        }
    }
});

// Mejorar experiencia en móviles
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Efecto de carga inicial
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
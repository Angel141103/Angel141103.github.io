// Botón volver arriba
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
    backTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

// Carrito de compras con cantidades
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
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
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // Nombre + cantidad
        li.textContent = `${item.title} x ${item.quantity}`;

        // Precio total por producto
        const span = document.createElement("span");
        span.textContent = "$" + (item.price * item.quantity).toFixed(2);
        li.appendChild(span);

        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Animación +1
function showPlusOne(button) {
    const plus = document.createElement("span");
    plus.textContent = "+1";
    plus.style.position = "absolute";
    plus.style.color = "#28a745";
    plus.style.fontWeight = "bold";
    plus.style.fontSize = "16px";
    plus.style.pointerEvents = "none";

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

// Formularios de login y registro (demo)
document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Sesión iniciada (demo)");
    bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
});

document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Usuario registrado (demo)");
    bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
});

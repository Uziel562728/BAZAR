// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Taza Cerámica Premium",
        precio: 1250,
        emoji: "☕",
    },
    {
        id: 2,
        nombre: "Cuaderno Espiral A4",
        precio: 850,
        emoji: "📓",
    },
    {
        id: 3,
        nombre: "Lámpara LED Escritorio",
        precio: 3200,
        emoji: "💡",
    },
    {
        id: 4,
        nombre: "Almohadón Decorativo",
        precio: 1800,
        emoji: "🛋️",
    },
    {
        id: 5,
        nombre: "Organizador Escritorio",
        precio: 2100,
        emoji: "📋",
    },
    {
        id: 6,
        nombre: "Planta Suculenta",
        precio: 650,
        emoji: "🌱",
    },
    {
        id: 7,
        nombre: "Marco Foto 15x20",
        precio: 950,
        emoji: "🖼️",
    },
    {
        id: 8,
        nombre: "Vela Aromática",
        precio: 1400,
        emoji: "🕯️",
    },
    {
        id: 9,
        nombre: "Set Imanes Nevera",
        precio: 750,
        emoji: "🔗",
    },
    {
        id: 10,
        nombre: "Espejo Decorativo",
        precio: 2800,
        emoji: "🪞",
    },
    {
        id: 11,
        nombre: "Reloj Pared Moderno",
        precio: 3500,
        emoji: "🕐",
    },
    {
        id: 12,
        nombre: "Cargador Inalámbrico",
        precio: 2200,
        emoji: "🔋",
    },
    {
        id: 13,
        nombre: "Auriculares Bluetooth",
        precio: 4800,
        emoji: "🎧",
    },
    {
        id: 14,
        nombre: "Mouse Pad Gaming",
        precio: 1200,
        emoji: "🖱️",
    },
    {
        id: 15,
        nombre: "Termo Acero Inoxidable",
        precio: 2900,
        emoji: "🫖",
    },
];

// Carrito
let carrito = [];

// Actualizar contador del carrito
function actualizarContador() {
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("cartCount").innerText = count;
}

// Mostrar carrito
function toggleCart() {
    document.getElementById("cartOverlay").style.display = "flex";
    renderCarrito();
}

// Cerrar carrito
function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
}

// Agregar producto al carrito
function addToCartDirect(productId) {
    const producto = productos.find(p => p.id === productId);
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        // Reemplazar el botón por control de cantidad en el DOM
        reemplazarBotonPorControl(productId);
    }

    actualizarContador();
    renderCarrito();
}

function reemplazarBotonPorControl(productId) {
    const productDiv = document.getElementById(product-${productId});
    productDiv.innerHTML = ""; // Limpiar el contenido actual (el botón)

    const contadorDiv = document.createElement("div");
    contadorDiv.className = "contador";

    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = () => cambiarCantidad(productId, -1);

    const cantidadSpan = document.createElement("span");
    cantidadSpan.textContent = "1";
    cantidadSpan.id = cantidad-${productId};

    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = () => cambiarCantidad(productId, 1);

    contadorDiv.appendChild(btnMenos);
    contadorDiv.appendChild(cantidadSpan);
    contadorDiv.appendChild(btnMas);

    productDiv.appendChild(contadorDiv);
}

function cambiarCantidad(productId, delta) {
    const itemIndex = carrito.findIndex(p => p.id === productId);
    if (itemIndex === -1) return;

    carrito[itemIndex].cantidad += delta;

    // Si la cantidad llegó a 0, eliminamos del carrito y volvemos a mostrar el botón
    if (carrito[itemIndex].cantidad <= 0) {
        carrito.splice(itemIndex, 1); // Eliminar del carrito

        const productDiv = document.getElementById(product-${productId});
        productDiv.innerHTML = <button class="add-to-cart" onclick="addToCartDirect(${productId})">Agregar al carrito</button>;
    } else {
        // Si sigue siendo mayor que 0, actualizar el número en pantalla
        const cantidadSpan = document.getElementById(cantidad-${productId});
        cantidadSpan.textContent = carrito[itemIndex].cantidad;
    }

    actualizarContador();
    renderCarrito();
}

// Renderizar contenido del carrito
function renderCarrito() {
    const container = document.getElementById("cartContent");
    const total = document.getElementById("totalAmount");
    container.innerHTML = "";

    let totalPrecio = 0;

    if (carrito.length === 0) {
        container.innerHTML = "<p>Tu carrito está vacío.</p>";
        total.innerText = "$0";
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.emoji} ${item.nombre} x${item.cantidad}</span>
            <span>$${item.precio * item.cantidad}</span>
        `;
        container.appendChild(div);
        totalPrecio += item.precio * item.cantidad;
    });

    total.innerText = `$${totalPrecio}`;
}

// Enviar pedido por WhatsApp
function sendToWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A";
    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}%0A`;
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    mensaje += `%0ATotal: $${total}`;

    const url = `https://wa.me/?text=${mensaje}`;
    window.open(url, "_blank");
}

// Carrusel dinámico
function crearCarrusel() {
    const destacados = productos.slice(0, 5); // Primeros 5 productos
    const track = document.getElementById("carouselTrack");
    const indicators = document.getElementById("carouselIndicators");

    destacados.forEach((producto, index) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.style.minWidth = "250px";
        div.style.marginRight = "1rem";
        div.innerHTML = `
            <div class="product-image">${producto.emoji}</div>
            <div class="product-info">
                <div class="product-name">${producto.nombre}</div>
                <div class="product-price">$${producto.precio}</div>
                <button class="add-to-cart" onclick="addToCartDirect(${producto.id})">Agregar</button>
            </div>
        `;
        track.appendChild(div);

        const indicator = document.createElement("button");
        if (index === 0) indicator.classList.add("active");
        indicator.addEventListener("click", () => moverCarrusel(index));
        indicators.appendChild(indicator);
    });
}

function moverCarrusel(indice) {
    const track = document.getElementById("carouselTrack");
    const offset = indice * 260; // 250px + 10px de margen
    track.style.transform = `translateX(-${offset}px)`;

    const botones = document.querySelectorAll("#carouselIndicators button");
    botones.forEach((btn, i) => {
        btn.classList.toggle("active", i === indice);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    crearCarrusel();
    actualizarContador();
});

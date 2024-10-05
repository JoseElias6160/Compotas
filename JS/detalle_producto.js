document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    cargarDetallesProducto(productoId);
});

async function cargarDetallesProducto(productoId) {
    try {
        const productoRespuesta = await fetch(
            `https://api.mercadolibre.com/items/${productoId}`
        );

        if (productoRespuesta.status === 200) {
            const producto = await productoRespuesta.json();

            // Crear un string para las características
            let caracteristicasHTML = '<h3>Características:</h3><ul>';
            producto.attributes.forEach(attr => {
                caracteristicasHTML += `
                    <li><strong>${attr.name}:</strong> ${attr.value_name}</li>
                `;
            });
            caracteristicasHTML += '</ul>';

            // Crear el HTML de detalles del producto
            const detallesHTML = `
                <a href="Principal.html"><button>⬅️ Back</button></a>
                <h2>${producto.title}</h2>
                <div class="contenedor">
                    <img src="${producto.pictures[0].url}" alt="${producto.title}" style="width:300px;height:300px;">
                </div>
                <p>${producto.short_description ? producto.short_description : "Descripción no disponible"}</p>
                <p>Precio: $${producto.price}</p>
                <p>Condición: ${producto.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
                <p>Disponible: ${producto.available_quantity} unidades</p>
                ${caracteristicasHTML}
                <button id="comprar-btn">🛒 Añadir al carrito</button>
                <button id="ver-carrito-btn">🛍️ Ver carrito</button> 
            `;

            document.getElementById("detalles-producto").innerHTML = detallesHTML;

            document.getElementById("comprar-btn").addEventListener("click", function () {
                añadirAlCarrito(producto);
            });

            document.getElementById("ver-carrito-btn").addEventListener("click", function () {
                window.location.href = 'carrito.html'; // Redirigir a la página del carrito
            });
        } else {
            console.log("Error al cargar los detalles del producto");
        }
    } catch (error) {
        console.log("Error al intentar cargar los detalles del producto:", error);
    }
}


function añadirAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡PRODUCTO AÑADIDO CON EXITO AL CARRITO!")
}


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
                ${caracteristicasHTML} <!-- Incluir las características aquí -->
            `;

            document.getElementById("detalles-producto").innerHTML = detallesHTML;
        } else {
            console.log("Error al cargar los detalles del producto");
        }
    } catch (error) {
        console.log("Error al intentar cargar los detalles del producto:", error);
    }
}

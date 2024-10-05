document.addEventListener("DOMContentLoaded", function () {
    // Función para generar un cupón aleatorio de 5 caracteres
    function generarCupon(length) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let cupon = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            cupon += caracteres[randomIndex];
        }
        return cupon;
    }

    // Obtener carrito del localStorage o inicializar como vacío
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoHTML = '<ul>';

    // Crear un conjunto para contar los artículos diferentes
    const articulosDiferentes = new Set();

    // Recorrer el carrito para mostrar los productos
    carrito.forEach(producto => {
        carritoHTML += `
            <li>
                <strong>${producto.title}</strong> - $${producto.price} x ${producto.cantidad}
            </li>
        `;
        articulosDiferentes.add(producto.id);
    });

    carritoHTML += '</ul>';

    // Calcular el total del carrito
    let total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);
    document.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;

    // Insertar el carrito generado en el DOM
    document.getElementById('lista-productos').innerHTML = carritoHTML;

    // Obtener el div para mostrar el cupón en el carrito
    const cuponDiv = document.getElementById('cupon-generado');

    // Mostrar mensaje de envío gratis si hay más de 5 artículos diferentes
    if (articulosDiferentes.size > 5) {
        cuponDiv.innerHTML += `<p style="color: green;">¡Envío gratis disponible!</p>`;
    } else {
        cuponDiv.innerHTML += `<p style="color: red;">Agrega más artículos diferentes para obtener envío gratis.</p>`;
    }

    // Comprobar si hay un cupón ya utilizado
    const cuponUtilizado = localStorage.getItem('cupon_utilizado');

    // Lógica para generar y mostrar el cupón
    if (!cuponUtilizado) {
        // Generar un cupón aleatorio
        const cuponGenerado = generarCupon(5);
        cuponDiv.innerHTML += `<p>Cupón generado: ${cuponGenerado}</p>`;
        localStorage.setItem('cupon_generado', cuponGenerado); // Guardar el cupón generado en localStorage
    } else {
        // Mostrar el cupón utilizado si existe
        cuponDiv.innerHTML += `<p style="color: blue;">Cupón utilizado: ${cuponUtilizado}</p>`;
    }

    // Funcionalidad del botón "Limpiar carrito"
    document.getElementById("limpiar-carrito-btn").addEventListener("click", function () {
        localStorage.removeItem('carrito');
        localStorage.removeItem('cupon_generado'); // Limpiar cupon generado al limpiar el carrito
        localStorage.removeItem('cupon_utilizado'); // Limpiar cupón utilizado al limpiar el carrito
        alert("Carrito limpiado");
        window.location.reload();
    });

    // Funcionalidad del botón "Regresar atrás"
    document.getElementById("regresar-btn").addEventListener("click", function () {
        window.history.back();
    });

    // Funcionalidad del botón "Agregar"
    document.getElementById("Agregar").addEventListener("click", function () {
        window.location.href = "Principal.html"; // Redirigir a Principal.html
    });

    // Lista de cupones válidos
    const cuponesValidos = {
        "DESC10": 0.10, // 10% de descuento
        "DESC20": 0.20, // 20% de descuento
        [localStorage.getItem('cupon_generado')]: 0.15 // 15% de descuento por el cupón generado aleatoriamente
    };

    // Funcionalidad del botón "Aplicar cupón"
    document.getElementById("aplicar-cupon-btn").addEventListener("click", function () {
        const cuponIngresado = document.getElementById("input-cupon").value.toUpperCase(); // Convertir el cupón a mayúsculas
        const mensajeCupon = document.getElementById("mensaje-cupon");

        // Mostrar el cupón ingresado en la consola
        console.log("Cupón ingresado:", cuponIngresado);

        // Comprobar si el cupón ingresado es válido
        if (cuponesValidos[cuponIngresado]) {
            const descuento = cuponesValidos[cuponIngresado];

            // Guardar el cupón utilizado en localStorage
            localStorage.setItem('cupon_utilizado', cuponIngresado);

            // Calcular el total con descuento basado en la cantidad de productos
            let totalConDescuento;
            const cantidadProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Total de productos en el carrito

            if (cantidadProductos >= 3 && cantidadProductos <= 5) {
                totalConDescuento = total * 0.90; // 10% de descuento
            } else if (cantidadProductos >= 6 && cantidadProductos <= 8) {
                totalConDescuento = total * 0.85; // 15% de descuento
            } else if (cantidadProductos > 8) {
                totalConDescuento = total * 0.80; // 20% de descuento
            } else {
                totalConDescuento = total; // Sin descuento
            }

            mensajeCupon.textContent = `Cupón aplicado. Descuento del ${(descuento * 100).toFixed(0)}%. Nuevo total: $${totalConDescuento.toFixed(2)}`;
            mensajeCupon.style.color = "green";
            document.querySelector('.total').textContent = `Total: $${totalConDescuento.toFixed(2)}`; // Mostrar el nuevo total
        } else {
            mensajeCupon.textContent = "Cupón inválido. Inténtalo de nuevo.";
            mensajeCupon.style.color = "red";
        }
    });
});

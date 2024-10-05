document.addEventListener("DOMContentLoaded", function () {
  const seccionPeliculas = document.getElementById('PRODUCTOS');
  const btnBuscar = document.getElementById("btnBuscar");
  const contenedorProductos = document.getElementById("contenedor");

  function mostarProductos() {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(function (seccion) {
      seccion.style.display = 'none';
    });
    seccionPeliculas.style.display = 'block';
    CargarProductos(); // Llamar a la API para cargar los productos automáticamente
  }

  // Función para cargar productos desde la API de Mercado Libre
  const CargarProductos = async () => {
    try {
      const Busqueda = document.getElementById('busqueda').value.trim() || 'productos'; // Valor de búsqueda predeterminado
      const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${Busqueda}`);
      const datos = await respuesta.json();

      let productos = '';

      datos.results.forEach((producto) => {
        productos += `
                  <div class="producto">
                      <a href="detalle_producto.html?id=${producto.id}">
                          <img src="${producto.thumbnail}" alt="${producto.title}" class="producto-imagen">
                          <h3 class="producto-titulo">${producto.title}</h3>
                          <p class="producto-precio">$${producto.price}</p>
                          <p class="producto-id">ID: ${producto.id}</p>
                      </a>
                  </div>`;
      });

      contenedorProductos.innerHTML = productos;
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // Asignar evento de clic para el botón de búsqueda
  btnBuscar.addEventListener('click', () => {
    CargarProductos(); // Cargar productos cuando se haga clic en el botón de búsqueda
  });

  // Cargar productos automáticamente al cargar la página
  mostarProductos();
});

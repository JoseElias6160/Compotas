document.addEventListener("DOMContentLoaded", function () {
  const seccionProductos = document.getElementById('PRODUCTOS');
  const btnBuscar = document.getElementById("btnBuscar");
  const contenedorProductos = document.getElementById("contenedor");
  const pais = 'MCO'

  function mostarProductos() {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(function (seccion) {
      seccion.style.display = 'none';
    });
    seccionProductos.style.display = 'block';
    CargarProductos(); // Llamar a la API para cargar los productos automáticamente
  }

  // Función para cargar productos desde la API de Mercado Libre
  const CargarProductos = async () => {
    try {
      const Busqueda = document.getElementById('busqueda').value.trim() || 'productos'; // Valor de búsqueda predeterminado
      const respuesta = await fetch(`https://api.mercadolibre.com/sites/${pais}/search?q=${Busqueda}`);
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


currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}
// Cambiar de imagen cada 3 segundos
setInterval(nextSlide, 5000);





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
    CargarProductos();
  }

  // Función para cargar productos desde la API de Mercado Libre
  const CargarProductos = async () => {
    try {
      const Busqueda = document.getElementById('busqueda').value.trim() || 'zapatos'; // Valor de búsqueda predeterminado
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


  btnBuscar.addEventListener('click', () => {
    CargarProductos();
  });


  mostarProductos();
});


currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function SiguienteBanner() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}
setInterval(SiguienteBanner, 5000);



document.getElementById("btnAdmin").addEventListener("click", function () {
  var username = prompt("Ingrese su nombre de usuario:");
  var password = prompt("Ingrese su contraseña:");
  if (username === "admin" && password === "1234") {
    window.location.href = "Administracion.html";
  } else {
    alert("Credenciales incorrectas. Acceso denegado.");
  }
})
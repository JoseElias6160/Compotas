function mostrarSeccion(target) {
  const secciones = document.getElementsByTagName("section");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
  const seccionMostrar = document.getElementById(target);
  if (seccionMostrar) {
    seccionMostrar.style.display = "block";
  }
}

const btnBuscar = document.getElementById("btnBuscar"); // Referencia al botón de búsqueda

// Función para cargar productos desde la API de Mercado Libre
const CargarProductos = async () => {
  try {
    const Busqueda = document.getElementById('busqueda').value.trim(); // Captura el valor de búsqueda

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

    document.getElementById("contenedor").innerHTML = productos;


  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

// Asignar eventos de clic
btnBuscar.addEventListener('click', () => {
  pagina = 1; // Reiniciar la paginación al buscar un nuevo término
  CargarProductos();
});


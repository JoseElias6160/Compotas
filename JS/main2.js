// Función para mostrar la sección correcta
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

let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnBuscar = document.getElementById("btnBuscar"); // Referencia al botón de búsqueda

// Función para cargar productos desde la API de Mercado Libre
const CargarProductos = async () => {
  try {
    const Busqueda = document.getElementById('busqueda').value.trim(); // Captura el valor de búsqueda

    const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${Busqueda}`);
    const datos = await respuesta.json();

    let productos = `
      <table class="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>`;

    datos.results.forEach((producto) => {
      productos += `
        <tr data-id="${producto.id}">
          <td><a href="detalle_producto.html?id=${producto.id}"><img src="${producto.thumbnail}" alt="${producto.title}" style="width:200px;height:250px;"></a>
          
          </td>
          <td class="id-cell">${producto.id}</td>
          <td class="title-cell">${producto.title}</td>
          <td class="price-cell">$${producto.price}</td>
        </tr>`;
    });

    productos += ``;

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

btnSiguiente.addEventListener("click", () => {
  pagina += 1;
  CargarProductos();
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) pagina -= 1;
  CargarProductos();
});

// Cargar productos iniciales si es necesario
CargarProductos();

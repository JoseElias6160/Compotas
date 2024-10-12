const CargarListado = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/get');
        const datos = await respuesta.json();

        let productos = `
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Producto</th>
              <th>Precio Und</th>
              <th>Cantidad en Bodega</th>
              <th>Acciones Productos</th>
            </tr>
          </thead>
          <tbody>`;

        datos.forEach((producto) => {
            productos += `
              <tr data-id="${producto.id}">
                <td class="id-cell">${producto.id}</td>
                <td class="title-cell">${producto.nombre}</td>
                <td class="overview-cell">${producto.precio}</td>
                <td class="puntuacion">${producto.stock}</td>
                <td class="botones">
            
                  <button class="crear" onClick="crearProducto()">Crear</button>
                  <button class="actualizar" onclick="actualizarProducto(${producto.id}, '${producto.nombre}', '${producto.precio}', ${producto.stock})">Actualizar</button>
                  <button class="delete" onclick="eliminarProducto(${producto.id})">Eliminar</button>

                </td>                
              </tr>
            `;
        });
        productos += `
          </tbody>
        </table>`;

        document.getElementById("contenedor_api").innerHTML = productos;
    } catch (error) {
        console.log('Error al cargar el listado:', error);
    }
};

const CargarClientes = async () => {
    try {
        const respuesta2 = await fetch('http://localhost:3000/getClientes');
        const datos2 = await respuesta2.json();

        let cliente = `
        <table class="table">
          <thead>
            <tr>
              <th>Identificacion</th>
              <th>Nombres</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Contraseña</th>
              <th>Acciones Clientes</th>
            </tr>
          </thead>
          <tbody>`;

        datos2.forEach((clientes) => {
            cliente += `
              <tr data-id="${clientes.id}">
                <td class="id-cell">${clientes.id}</td>
                <td class="title-cell">${clientes.nombre}</td>
                <td class="overview-cell">${clientes.direccion}</td>
                <td class="overview-cell">${clientes.telefono}</td>
                <td class="id-cell">${clientes.password}</td>
                <td class="botones">            
                  <button class="crear" onClick="crearCliente()">Crear</button>
                </td>                
              </tr>
            `;
        });
        cliente += `
          </tbody>
        </table>`;

        document.getElementById("contenedor_clientes").innerHTML = cliente;
    } catch (error) {
        console.log('Error al cargar el listado:', error);
    }
}






const crearProducto = async () => {
    try {

        const nombre = prompt('Ingrese el nombre del nuevo producto:');
        const direccion = parseFloat(prompt('Ingrese el direccion del nuevo producto:'));
        const telefono = parseInt(prompt('Ingrese la cantidad en bodega del producto:'));

        const response = await fetch('http://localhost:3000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                direccion: direccion,
                telefono: telefono
            })
        });

        const data = await response.json();
        alert('Producto Creado Exitosamente:', data);
        CargarListado();
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
};

const actualizarProducto = async (id, nombre, direccion, telefono) => {
    try {
        const updatedTitulo = prompt('Ingrese el nuevo Nombre:', nombre);
        const updatePrecio = parseFloat(prompt('Ingrese el nuevo direccion:', direccion));
        const updateStock = parseInt(prompt('Ingrese el nuevo Stock:', telefono));

        const response = await fetch(`http://localhost:3000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: updatedTitulo,
                direccion: updatePrecio,
                telefono: updateStock
            })
        });

        const data = await response.json();
        alert('Producto actualizado:', data);
        CargarListado();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
};

const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE'
        });
        const resultado = await response.json();
        alert("Producto Eliminado Exitosamente", resultado);

        CargarListado();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};

const crearCliente = async () => {
    try {
        const id = parseInt(prompt('Ingrese la identificacion del cliente:'))
        const nombre = prompt('Ingrese el nombre del cliente:');
        const direccion = prompt('Ingrese la direccion del cliente:');
        const telefono = parseInt(prompt('Ingrese el numero de telefono:'));
        const password = prompt('Ingrese su Contraseña de Cliente');

        const response = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                direccion: direccion,
                telefono: telefono,
                password: password
            })
        });

        const data = await response.json();
        alert('Cliente Creado Exitosamente:', data);
        CargarClientes();
    } catch (error) {
        console.error('Error al crear Cliente:', error);
    }
};

CargarListado();
CargarClientes();
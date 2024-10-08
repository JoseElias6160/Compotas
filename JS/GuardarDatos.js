
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());


async function agregarProducto(nombre, precio, stock) {
  const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=zapatos`);
  const datos = await respuesta.json();
  for (const Data of datos.results) {
    // Extraer solo los números del ID usando expresión regular
    const idNumerico = Data.id.replace(/\D/g, ''); // Remover todas las letras, dejando solo números

    const nuevoProducto = await prisma.producto.create({
      data: {
        id: parseInt(idNumerico),
        nombre: Data.title,
        precio: Data.price,
        stock: 0,
      },
    });
  }
}
agregarProducto();


// Agregar un cliente
async function agregarCliente(nombre, direccion, telefono) {
  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        id: 1192746160,
        nombre: "JOSE_ELIAS",
        direccion: "MZANA 13",
        telefono: "1234",
        password: "12345"
      },
    });
    console.log("Cliente agregado:", nuevoCliente);
  } catch (error) {
    console.error("Error al agregar el cliente:", error);
  }
}
agregarCliente();

// ------------------------- CRUD para Productos -------------------------

// Create (POST) - Agregar un producto
app.post('/productos', async (req, res) => {
  const { nombre, precio, stock } = req.body;
  try {
    const nuevoProducto = await prisma.producto.create({
      data: { nombre, precio, stock },
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

// Read (GET) - Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Read (GET) - Obtener un producto por ID
app.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Update (PUT) - Actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: { nombre, precio, stock },
    });
    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Delete (DELETE) - Eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});





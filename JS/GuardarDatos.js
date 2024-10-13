
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { id } = require('inversify');

const prisma = new PrismaClient();
const app = express();


app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());


async function agregarProducto(nombre, precio, stock) {
  const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=zapatos`);
  const datos = await respuesta.json();
  for (const Data of datos.results) {
    const idNumerico = Data.id.replace(/\D/g, '');

    const nuevoProducto = await prisma.producto.create({
      data: {
        id: parseInt(idNumerico),
        nombre: Data.title,
        precio: Data.price,
        stock: Data.available_quantity,
      },
    });
  }
}
agregarProducto();

// ------------------------- CRUD para Productos -------------------------

app.post('/post', async (req, res) => {
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

app.get('/get', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

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

app.put('/update/:id', async (req, res) => {
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

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});



// ------------------------- CRUD para Clientes -------------------------

app.get('/getClientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});


app.post('/clientes', async (req, res) => {
  const { id, nombre, direccion, telefono, password } = req.body;

  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        id: id,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        password: password,
      },
    });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});





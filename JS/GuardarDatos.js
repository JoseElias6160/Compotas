const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { RANDOM } = require('mysql/lib/PoolSelector');

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


async function agregarCliente(nombre, direccion, telefono) {
  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      },
    });
    console.log("Cliente agregado:", nuevoCliente);
  } catch (error) {
    console.error("Error al agregar el cliente:", error);
  }
}
agregarCliente();


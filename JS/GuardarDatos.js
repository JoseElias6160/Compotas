const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// Función para calcular el total de la venta
function calcularTotalVenta(productosVendidos) {
  let totalVenta = 0;

  const detallesVenta = productosVendidos.map(producto => {
    const subtotal = producto.precio * producto.cantidad;
    totalVenta += subtotal;

    return {
      cantidad: producto.cantidad,
      subtotal: subtotal,
      idProducto: producto.id
    };
  });

  return { totalVenta, detallesVenta };
}

// Función para guardar la venta en la base de datos
async function guardarVenta(clienteId, totalVenta, detallesVenta) {
  try {
    const venta = await prisma.venta.create({
      data: {
        fecha: new Date(),
        total: totalVenta,
        cliente: {
          connect: { id: clienteId },
        },
        detalleVentas: {
          create: detallesVenta,
        },
      },
    });
    return venta;
  } catch (error) {
    console.error("Error al guardar la venta:", error);
    throw error;
  }
}

// Función para actualizar el stock de los productos vendidos
async function actualizarInventario(productosVendidos) {
  try {
    for (const producto of productosVendidos) {
      await prisma.producto.update({
        where: { id: producto.id },
        data: {
          stock: { decrement: producto.cantidad },
        },
      });
    }
  } catch (error) {
    console.error("Error al actualizar el inventario:", error);
    throw error;
  }
}

// Ruta para procesar la venta
app.post('/ventas', async (req, res) => {
  const { clienteId, productosVendidos } = req.body;

  try {
    // Calcular el total de la venta y los detalles
    const { totalVenta, detallesVenta } = calcularTotalVenta(productosVendidos);

    // Guardar la venta y los detalles en la base de datos
    const venta = await guardarVenta(clienteId, totalVenta, detallesVenta);

    // Actualizar el inventario
    await actualizarInventario(productosVendidos);

    res.status(201).json({ message: 'Venta procesada exitosamente', venta });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la venta', details: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

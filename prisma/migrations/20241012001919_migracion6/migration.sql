/*
  Warnings:

  - You are about to alter the column `telefono` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `detalleventa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `DetalleVenta_idProducto_fkey`;

-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `DetalleVenta_idVenta_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `Venta_idCliente_fkey`;

-- AlterTable
ALTER TABLE `cliente` MODIFY `telefono` INTEGER NOT NULL;

-- DropTable
DROP TABLE `detalleventa`;

-- CreateTable
CREATE TABLE `inventario` (
    `Stock_Actual` INTEGER NOT NULL,
    `Stock_Min` INTEGER NOT NULL,
    `Stock_Max` INTEGER NOT NULL,

    PRIMARY KEY (`Stock_Actual`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

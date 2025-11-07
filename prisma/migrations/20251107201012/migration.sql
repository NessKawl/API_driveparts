/*
  Warnings:

  - You are about to alter the column `pro_valor` on the `pro_produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - Added the required column `ven_periodo` to the `ven_venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pro_produto` MODIFY `pro_valor` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ven_venda` ADD COLUMN `ven_periodo` ENUM('MANHA', 'TARDE') NOT NULL,
    MODIFY `ven_data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

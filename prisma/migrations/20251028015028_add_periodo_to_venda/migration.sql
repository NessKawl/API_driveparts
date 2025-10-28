/*
  Warnings:

  - Added the required column `ven_periodo` to the `ven_venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ven_venda` ADD COLUMN `ven_periodo` ENUM('MANHA', 'TARDE') NOT NULL;

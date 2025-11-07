/*
  Warnings:

  - The values [STATUS] on the enum `ven_venda_ven_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[usu_tel]` on the table `usu_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ven_venda` MODIFY `ven_status` ENUM('CONCLUIDA', 'RESERVA', 'CANCELADA', 'EXPIRADA') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usu_usuario_usu_tel_key` ON `usu_usuario`(`usu_tel`);

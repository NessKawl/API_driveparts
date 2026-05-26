/*
  Warnings:

  - Added the required column `usu_tipo` to the `usu_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `est_estoque` MODIFY `mov_tipo` ENUM('COMPRA', 'VENDA', 'DEFEITO', 'PERDA', 'VENCIMENTO', 'USO_E_CONSUMO', 'DEVOLUCAO', 'OUTROS') NOT NULL;

-- AlterTable
ALTER TABLE `usu_usuario` ADD COLUMN `usu_tipo` ENUM('ADMIN', 'USUARIO') NOT NULL;

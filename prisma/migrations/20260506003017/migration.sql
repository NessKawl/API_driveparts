/*
  Warnings:

  - A unique constraint covering the columns `[pro_aux_uuid]` on the table `pro_produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usu_aux_uuid]` on the table `usu_usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ven_aux_uuid]` on the table `ven_venda` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pro_produto_pro_aux_uuid_key` ON `pro_produto`(`pro_aux_uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `usu_usuario_usu_aux_uuid_key` ON `usu_usuario`(`usu_aux_uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `ven_venda_ven_aux_uuid_key` ON `ven_venda`(`ven_aux_uuid`);

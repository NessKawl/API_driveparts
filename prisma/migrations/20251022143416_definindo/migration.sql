/*
  Warnings:

  - A unique constraint covering the columns `[usu_tel]` on the table `usu_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `usu_usuario_usu_tel_key` ON `usu_usuario`(`usu_tel`);

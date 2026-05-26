-- AlterTable
ALTER TABLE `usu_usuario` MODIFY `usu_tipo` ENUM('ADMIN', 'USUARIO') NOT NULL DEFAULT 'USUARIO';

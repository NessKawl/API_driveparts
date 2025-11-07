/*
  Warnings:

  - You are about to drop the column `est_quantidade` on the `est_estoque` table. All the data in the column will be lost.
  - You are about to drop the column `ite_quantidade` on the `ite_itemvenda` table. All the data in the column will be lost.
  - You are about to drop the column `pro_tipo` on the `pro_produto` table. All the data in the column will be lost.
  - You are about to alter the column `pro_nome` on the `pro_produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(45)`.
  - You are about to alter the column `pro_valor` on the `pro_produto` table. The data in that column could be lost. The data in that column will be cast from `Float` to `VarChar(45)`.
  - You are about to alter the column `pro_marca` on the `pro_produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(45)`.
  - You are about to alter the column `pro_cod` on the `pro_produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(45)`.
  - You are about to drop the column `createdAt` on the `usu_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usu_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `usu_tipo` on the `usu_usuario` table. All the data in the column will be lost.
  - You are about to alter the column `usu_nome` on the `usu_usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(45)`.
  - You are about to alter the column `usu_senha` on the `usu_usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(45)`.
  - You are about to drop the column `ven_periodo` on the `ven_venda` table. All the data in the column will be lost.
  - The values [VENDA,CANCELADO] on the enum `ven_venda_ven_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `con_configuracoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto_configuracoes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `cai_entrada` on table `cai_caixa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cai_saida` on table `cai_caixa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `est_qtd` to the `est_estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ite_qtd` to the `ite_itemVenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cai_caixa` DROP FOREIGN KEY `fk_cai_caixa_ven_venda`;

-- DropForeignKey
ALTER TABLE `est_estoque` DROP FOREIGN KEY `fk_est_estoque_pro_produto`;

-- DropForeignKey
ALTER TABLE `ite_itemvenda` DROP FOREIGN KEY `fk_ite_itemvenda_pro_produto`;

-- DropForeignKey
ALTER TABLE `produto_configuracoes` DROP FOREIGN KEY `fk_produto_configuracoes_con_configuracoes`;

-- DropForeignKey
ALTER TABLE `produto_configuracoes` DROP FOREIGN KEY `fk_produto_configuracoes_pro_produto`;

-- DropForeignKey
ALTER TABLE `ven_venda` DROP FOREIGN KEY `fk_ven_venda_ite_itemvenda`;

-- DropForeignKey
ALTER TABLE `ven_venda` DROP FOREIGN KEY `fk_ven_venda_usu_usuario`;

-- DropIndex
DROP INDEX `fk_cai_caixa_ven_venda` ON `cai_caixa`;

-- DropIndex
DROP INDEX `fk_est_estoque_pro_produto` ON `est_estoque`;

-- DropIndex
DROP INDEX `fk_ite_itemVenda_pro_produto` ON `ite_itemvenda`;

-- DropIndex
DROP INDEX `usu_tel` ON `usu_usuario`;

-- DropIndex
DROP INDEX `fk_ven_venda_ite_itemVenda` ON `ven_venda`;

-- DropIndex
DROP INDEX `fk_ven_venda_usu_usuario` ON `ven_venda`;

-- AlterTable
ALTER TABLE `cai_caixa` MODIFY `cai_entrada` DOUBLE NOT NULL,
    MODIFY `cai_saida` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `est_estoque` DROP COLUMN `est_quantidade`,
    ADD COLUMN `est_qtd` INTEGER NOT NULL,
    MODIFY `est_data` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ite_itemvenda` DROP COLUMN `ite_quantidade`,
    ADD COLUMN `ite_qtd` INTEGER NOT NULL,
    MODIFY `ite_valor` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `pro_produto` DROP COLUMN `pro_tipo`,
    MODIFY `pro_nome` VARCHAR(45) NOT NULL,
    MODIFY `pro_desc` VARCHAR(45) NOT NULL,
    MODIFY `pro_valor` VARCHAR(45) NOT NULL,
    MODIFY `pro_marca` VARCHAR(45) NOT NULL,
    MODIFY `pro_cod` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `usu_usuario` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `usu_tipo`,
    MODIFY `usu_nome` VARCHAR(45) NOT NULL,
    MODIFY `usu_tel` VARCHAR(45) NOT NULL,
    MODIFY `usu_senha` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `ven_venda` DROP COLUMN `ven_periodo`,
    MODIFY `ven_data` DATETIME(3) NOT NULL,
    MODIFY `ven_valor` DOUBLE NOT NULL,
    MODIFY `ven_status` ENUM('CONCLUIDA', 'RESERVA', 'STATUS') NOT NULL;

-- DropTable
DROP TABLE `con_configuracoes`;

-- DropTable
DROP TABLE `produto_configuracoes`;

-- CreateTable
CREATE TABLE `cat_categoria` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `esp_especificacao` (
    `esp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `esp_nome` VARCHAR(45) NOT NULL,
    `cat_id` INTEGER NOT NULL,

    PRIMARY KEY (`esp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `met_metrica` (
    `met_id` INTEGER NOT NULL AUTO_INCREMENT,
    `met_nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`met_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pro_esp` (
    `pro_id` INTEGER NOT NULL,
    `esp_id` INTEGER NOT NULL,
    `pro_esp_valor` VARCHAR(45) NOT NULL,
    `met_id` INTEGER NOT NULL,

    PRIMARY KEY (`pro_id`, `esp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `est_estoque` ADD CONSTRAINT `est_estoque_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemVenda` ADD CONSTRAINT `ite_itemVenda_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `ven_venda_ite_id_fkey` FOREIGN KEY (`ite_id`) REFERENCES `ite_itemVenda`(`ite_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `ven_venda_usu_id_fkey` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario`(`usu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cai_caixa` ADD CONSTRAINT `cai_caixa_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `esp_especificacao` ADD CONSTRAINT `esp_especificacao_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `cat_categoria`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_esp_id_fkey` FOREIGN KEY (`esp_id`) REFERENCES `esp_especificacao`(`esp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_met_id_fkey` FOREIGN KEY (`met_id`) REFERENCES `met_metrica`(`met_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

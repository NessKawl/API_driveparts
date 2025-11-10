/*
  Warnings:

  - The primary key for the `est_estoque` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `est_data` on the `est_estoque` table. All the data in the column will be lost.
  - You are about to drop the column `est_id` on the `est_estoque` table. All the data in the column will be lost.
  - You are about to drop the column `est_qtd` on the `est_estoque` table. All the data in the column will be lost.
  - You are about to drop the column `pro_desc` on the `pro_produto` table. All the data in the column will be lost.
  - You are about to drop the column `ite_id` on the `ven_venda` table. All the data in the column will be lost.
  - You are about to drop the column `ven_data` on the `ven_venda` table. All the data in the column will be lost.
  - You are about to drop the `cai_caixa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mov_data` to the `est_estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mov_id` to the `est_estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mov_qtd` to the `est_estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mov_tipo` to the `est_estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ven_id` to the `ite_itemVenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cai_caixa` DROP FOREIGN KEY `cai_caixa_ven_id_fkey`;

-- DropForeignKey
ALTER TABLE `ven_venda` DROP FOREIGN KEY `ven_venda_ite_id_fkey`;

-- DropIndex
DROP INDEX `ven_venda_ite_id_fkey` ON `ven_venda`;

-- AlterTable
ALTER TABLE `est_estoque` DROP PRIMARY KEY,
    DROP COLUMN `est_data`,
    DROP COLUMN `est_id`,
    DROP COLUMN `est_qtd`,
    ADD COLUMN `mov_data` DATETIME(3) NOT NULL,
    ADD COLUMN `mov_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `mov_qtd` INTEGER NOT NULL,
    ADD COLUMN `mov_tipo` ENUM('COMPRA', 'VENDA') NOT NULL,
    ADD COLUMN `ven_id` INTEGER NULL,
    ADD PRIMARY KEY (`mov_id`);

-- AlterTable
ALTER TABLE `ite_itemvenda` ADD COLUMN `ven_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pro_produto` DROP COLUMN `pro_desc`,
    ADD COLUMN `pro_data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `pro_data_exclusao` DATETIME(3) NULL,
    ADD COLUMN `pro_data_modificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usu_usuario` MODIFY `usu_senha` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ven_venda` DROP COLUMN `ite_id`,
    DROP COLUMN `ven_data`,
    ADD COLUMN `ven_data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ven_data_modificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `cai_caixa`;

-- AddForeignKey
ALTER TABLE `est_estoque` ADD CONSTRAINT `est_estoque_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemVenda` ADD CONSTRAINT `ite_itemVenda_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

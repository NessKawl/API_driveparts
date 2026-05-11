-- CreateTable
CREATE TABLE `pro_produto` (
    `pro_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_aux_uuid` VARCHAR(36) NOT NULL,
    `pro_nome` VARCHAR(45) NOT NULL,
    `pro_valor` INTEGER NOT NULL,
    `pro_cod` VARCHAR(45) NOT NULL,
    `pro_marca` VARCHAR(45) NOT NULL,
    `pro_status` BOOLEAN NOT NULL DEFAULT true,
    `pro_data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pro_data_modificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pro_data_exclusao` DATETIME(3) NULL,
    `pro_caminho_img` VARCHAR(255) NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `est_estoque` (
    `mov_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mov_data` DATETIME(3) NOT NULL,
    `mov_qtd` INTEGER NOT NULL,
    `mov_tipo` ENUM('COMPRA', 'VENDA') NOT NULL,
    `pro_id` INTEGER NOT NULL,
    `ven_id` INTEGER NULL,

    PRIMARY KEY (`mov_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ite_itemVenda` (
    `ite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ite_qtd` INTEGER NOT NULL,
    `ite_valor` DOUBLE NOT NULL,
    `pro_id` INTEGER NOT NULL,
    `ven_id` INTEGER NOT NULL,

    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usu_usuario` (
    `usu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usu_aux_uuid` VARCHAR(36) NOT NULL,
    `usu_nome` VARCHAR(45) NOT NULL,
    `usu_tel` VARCHAR(45) NOT NULL,
    `usu_senha` VARCHAR(255) NOT NULL,
    `usu_status` BOOLEAN NOT NULL,
    `usu_data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usu_data_modificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usu_data_exclusao` DATETIME(3) NULL,

    UNIQUE INDEX `usu_usuario_usu_tel_key`(`usu_tel`),
    PRIMARY KEY (`usu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ven_venda` (
    `ven_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ven_aux_uuid` VARCHAR(36) NOT NULL,
    `ven_data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ven_data_modificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ven_valor` DOUBLE NOT NULL,
    `ven_status` ENUM('CONCLUIDA', 'RESERVA', 'CANCELADA', 'EXPIRADA') NOT NULL,
    `ven_periodo` ENUM('MANHA', 'TARDE') NOT NULL,
    `ven_pagamento` VARCHAR(45) NOT NULL,
    `usu_id` INTEGER NOT NULL,

    PRIMARY KEY (`ven_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `est_estoque` ADD CONSTRAINT `est_estoque_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemVenda` ADD CONSTRAINT `ite_itemVenda_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemVenda` ADD CONSTRAINT `ite_itemVenda_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `ven_venda_usu_id_fkey` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario`(`usu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `esp_especificacao` ADD CONSTRAINT `esp_especificacao_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `cat_categoria`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_esp_id_fkey` FOREIGN KEY (`esp_id`) REFERENCES `esp_especificacao`(`esp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pro_esp` ADD CONSTRAINT `pro_esp_met_id_fkey` FOREIGN KEY (`met_id`) REFERENCES `met_metrica`(`met_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

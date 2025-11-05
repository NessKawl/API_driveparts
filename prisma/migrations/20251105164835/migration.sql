-- CreateTable
CREATE TABLE `cai_caixa` (
    `cai_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cai_entrada` DOUBLE NULL,
    `cai_saida` DOUBLE NULL,
    `ven_id` INTEGER NOT NULL,

    INDEX `fk_cai_caixa_ven_venda`(`ven_id`),
    PRIMARY KEY (`cai_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `con_configuracoes` (
    `con_id` INTEGER NOT NULL AUTO_INCREMENT,
    `con_nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`con_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `est_estoque` (
    `est_id` INTEGER NOT NULL AUTO_INCREMENT,
    `est_data` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pro_id` INTEGER NOT NULL,
    `est_quantidade` INTEGER NOT NULL,

    INDEX `fk_est_estoque_pro_produto`(`pro_id`),
    PRIMARY KEY (`est_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ite_itemvenda` (
    `ite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ite_valor` FLOAT NOT NULL,
    `pro_id` INTEGER NOT NULL,
    `ite_quantidade` INTEGER NOT NULL,

    INDEX `fk_ite_itemVenda_pro_produto`(`pro_id`),
    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pro_produto` (
    `pro_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_nome` VARCHAR(255) NOT NULL,
    `pro_desc` TEXT NOT NULL,
    `pro_valor` FLOAT NOT NULL,
    `pro_tipo` ENUM('SUSPENSAO', 'FREIO', 'MOTOR', 'TRANSMISSAO', 'ELETRICA', 'LATARIA', 'ACESSORIOS') NOT NULL,
    `pro_marca` VARCHAR(100) NOT NULL,
    `pro_cod` VARCHAR(100) NOT NULL,
    `pro_status` BOOLEAN NOT NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_configuracoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `con_id` INTEGER NOT NULL,
    `pro_id` INTEGER NOT NULL,
    `con_valor` VARCHAR(255) NOT NULL,

    INDEX `idx_conf`(`con_id`),
    INDEX `idx_prod`(`pro_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usu_usuario` (
    `usu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usu_nome` VARCHAR(100) NOT NULL,
    `usu_tel` VARCHAR(20) NOT NULL,
    `usu_senha` VARCHAR(255) NOT NULL,
    `usu_status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usu_tipo` ENUM('GERENTE', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',

    UNIQUE INDEX `usu_tel`(`usu_tel`),
    PRIMARY KEY (`usu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ven_venda` (
    `ven_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ven_data` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ven_valor` FLOAT NOT NULL,
    `ven_pagamento` VARCHAR(45) NOT NULL,
    `ite_id` INTEGER NOT NULL,
    `usu_id` INTEGER NOT NULL,
    `ven_periodo` ENUM('MANHA', 'TARDE') NOT NULL,
    `ven_status` ENUM('VENDA', 'RESERVA', 'CANCELADO') NOT NULL,

    INDEX `fk_ven_venda_usu_usuario`(`usu_id`),
    INDEX `fk_ven_venda_ite_itemVenda`(`ite_id`),
    PRIMARY KEY (`ven_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cai_caixa` ADD CONSTRAINT `fk_cai_caixa_ven_venda` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `est_estoque` ADD CONSTRAINT `fk_est_estoque_pro_produto` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemvenda` ADD CONSTRAINT `fk_ite_itemvenda_pro_produto` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produto_configuracoes` ADD CONSTRAINT `fk_produto_configuracoes_con_configuracoes` FOREIGN KEY (`con_id`) REFERENCES `con_configuracoes`(`con_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto_configuracoes` ADD CONSTRAINT `fk_produto_configuracoes_pro_produto` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `fk_ven_venda_ite_itemvenda` FOREIGN KEY (`ite_id`) REFERENCES `ite_itemvenda`(`ite_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `fk_ven_venda_usu_usuario` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario`(`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

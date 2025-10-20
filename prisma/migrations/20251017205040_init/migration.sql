-- CreateTable
CREATE TABLE `cai_caixa` (
    `cai_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cai_entrada` DOUBLE NOT NULL,
    `cai_saida` DOUBLE NOT NULL,
    `ven_id` INTEGER NOT NULL,

    PRIMARY KEY (`cai_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ven_venda` (
    `ven_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ven_data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ven_valor` DOUBLE NOT NULL,
    `vend_status` ENUM('VENDA', 'RESERVA', 'CANCELADO') NOT NULL,
    `ven_pagamento` VARCHAR(191) NOT NULL,
    `ite_id` INTEGER NOT NULL,
    `usu_id` INTEGER NOT NULL,

    PRIMARY KEY (`ven_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ite_itemVenda` (
    `ite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ite_qtd` INTEGER NOT NULL,
    `ite_valor` DOUBLE NOT NULL,
    `pro_id` INTEGER NOT NULL,

    PRIMARY KEY (`ite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usu_usuario` (
    `usu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usu_nome` VARCHAR(191) NOT NULL,
    `usu_tel` VARCHAR(191) NOT NULL,
    `usu_senha` VARCHAR(191) NOT NULL,
    `usu_status` BOOLEAN NOT NULL,

    PRIMARY KEY (`usu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `est_estoque` (
    `est_id` INTEGER NOT NULL AUTO_INCREMENT,
    `est_qtd` INTEGER NOT NULL,
    `est_data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pro_id` INTEGER NOT NULL,

    PRIMARY KEY (`est_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pro_produto` (
    `pro_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_nome` VARCHAR(191) NOT NULL,
    `pro_desc` VARCHAR(191) NOT NULL,
    `pro_valor` DOUBLE NOT NULL,
    `pro_tipo` ENUM('SUSPENSAO', 'FREIO', 'MOTOR', 'TRANSMISSAO', 'ELETRICA', 'LATARIA', 'ACESSORIOS') NOT NULL,
    `pro_marca` VARCHAR(191) NOT NULL,
    `pro_cod` VARCHAR(191) NOT NULL,
    `pro_status` BOOLEAN NOT NULL,
    `pro_diametro` DOUBLE NULL,
    `pro_espessura` DOUBLE NULL,
    `pro_largura` DOUBLE NULL,
    `pro_altura` DOUBLE NULL,
    `pro_aro` INTEGER NULL,
    `pro_dentes` INTEGER NULL,
    `pro_compatibilidade` VARCHAR(191) NULL,
    `pro_viscosidade` VARCHAR(191) NULL,
    `pro_material` VARCHAR(191) NULL,
    `pro_pressao` DOUBLE NULL,
    `pro_volume` DOUBLE NULL,
    `pro_comprimento` VARCHAR(191) NULL,
    `pro_lado` VARCHAR(191) NULL,
    `pro_rosca` VARCHAR(191) NULL,
    `pro_voltagem` INTEGER NULL,
    `pro_amperagem` INTEGER NULL,
    `pro_capacidade` DOUBLE NULL,
    `pro_temperatura` VARCHAR(191) NULL,
    `pro_nivelSonoro` INTEGER NULL,
    `pro_validade` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cai_caixa` ADD CONSTRAINT `cai_caixa_ven_id_fkey` FOREIGN KEY (`ven_id`) REFERENCES `ven_venda`(`ven_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `ven_venda_ite_id_fkey` FOREIGN KEY (`ite_id`) REFERENCES `ite_itemVenda`(`ite_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ven_venda` ADD CONSTRAINT `ven_venda_usu_id_fkey` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario`(`usu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ite_itemVenda` ADD CONSTRAINT `ite_itemVenda_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `est_estoque` ADD CONSTRAINT `est_estoque_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `pro_produto`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `tem_temp_code` (
    `tem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tem_code` VARCHAR(191) NOT NULL,
    `tem_expiresAt` DATETIME(3) NOT NULL,
    `tem_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tem_used` BOOLEAN NOT NULL DEFAULT false,
    `usu_id` INTEGER NOT NULL,

    INDEX `tem_temp_code_usu_id_idx`(`usu_id`),
    PRIMARY KEY (`tem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tem_temp_code` ADD CONSTRAINT `tem_temp_code_usu_id_fkey` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario`(`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

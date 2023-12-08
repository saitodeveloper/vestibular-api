CREATE TABLE `devices` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    `serial` VARCHAR(90) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `device_serial_unique` (`serial` ASC) VISIBLE,
    INDEX `device_user_id_fk_idx` USING BTREE (`user_id`) VISIBLE,
    CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

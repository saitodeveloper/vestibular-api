CREATE TABLE `oauths` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(160) NOT NULL,
    `user_id` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `oauth_user_id_fk_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `oauth_user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

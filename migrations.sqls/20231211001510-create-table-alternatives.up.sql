CREATE TABLE `alternatives` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statment` TEXT NOT NULL,
    `correct` TINYINT NOT NULL,
    `id_question` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `question_fk_idx` (`id_question` ASC) VISIBLE,
    CONSTRAINT `question_fk`
    FOREIGN KEY (`id_question`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE `alternatives` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statment` TEXT NOT NULL,
    `correct` TINYINT NOT NULL,
    `question_id` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `question_fk_idx` (`question_id` ASC) VISIBLE,
    CONSTRAINT `question_fk`
    FOREIGN KEY (`question_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

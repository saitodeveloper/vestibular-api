CREATE TABLE `questions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statement` TEXT NOT NULL,
    `institution` VARCHAR(45) NOT NULL,
    `year` INT NOT NULL,
    `exam_name` VARCHAR(45) NOT NULL,
    `enum` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `exam_key_unique` (`institution` ASC, `year` ASC, `exam_name` ASC, `enum` ASC) VISIBLE
);
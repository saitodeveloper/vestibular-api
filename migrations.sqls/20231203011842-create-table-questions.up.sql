CREATE TABLE `questions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statement` TEXT NOT NULL,
    `institution` VARCHAR(45) NOT NULL,
    `year` INT NOT NULL,
    `exam_name` VARCHAR(45) NOT NULL,
    `sequencial` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `exam_key_unique` (`institution` ASC, `year` ASC, `exam_name` ASC, `sequencial` ASC) VISIBLE
);
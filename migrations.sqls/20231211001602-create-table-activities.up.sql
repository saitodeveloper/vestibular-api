CREATE TABLE `activities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `correct` TINYINT NOT NULL,
    `user_id` INT NULL,
    `device_id` INT NULL,
    `device_serial` VARCHAR(90) NOT NULL,
    `question_id` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `fk_activity_device_idx` (`device_id` ASC) VISIBLE,
    INDEX `fk_activity_user_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_activity_question_idx` (`question_id` ASC) VISIBLE,
    INDEX `fk_activity_device_serial_idx` (`device_serial` ASC) VISIBLE,
    CONSTRAINT `fk_activity_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `fk_activity_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `fk_activity_device`
    FOREIGN KEY (`device_id`)
    REFERENCES `devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

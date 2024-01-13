CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `role` VARCHAR(45) NOT NULL DEFAULT 'user',
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `devices` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    `serial` VARCHAR(90) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `device_serial_user_id_unique` (`serial` ASC, `user_id` ASC) VISIBLE,
    INDEX `device_user_id_fk_idx` USING BTREE (`user_id`) VISIBLE,
    CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE `identities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    `value` VARCHAR(45) NOT NULL,
    `user_id` INT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `identity_value_unique` (`value` ASC) VISIBLE,
    INDEX `identity_user_id_fk_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `identity_user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

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

CREATE TABLE `alternatives` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statement` TEXT NOT NULL,
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

CREATE TABLE `subjects` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `questions_subjects` (
  `id` INT NOT NULL,
  `id_subject` INT NOT NULL,
  `id_question` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_question_to_subjects_idx` (`id_subject` ASC) VISIBLE,
  INDEX `fk_subject_to_questions_idx` (`id_question` ASC) VISIBLE,
  UNIQUE INDEX `unique_question_subject` (`id_subject` ASC, `id_question` ASC) VISIBLE,
  CONSTRAINT `fk_question_to_subjects`
    FOREIGN KEY (`id_subject`)
    REFERENCES `subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subject_to_questions`
    FOREIGN KEY (`id_question`)
    REFERENCES `questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

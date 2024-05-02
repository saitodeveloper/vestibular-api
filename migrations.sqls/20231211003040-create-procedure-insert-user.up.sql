CREATE PROCEDURE `insert_user` (
    IN `_first_name` VARCHAR(45),
    IN `_last_name` VARCHAR(45),
    IN `_role` VARCHAR(45),
    IN `_identity_type` VARCHAR(45),
    IN `_identity_value` VARCHAR(45),
    IN `_oauth_hash` VARCHAR(160),
    IN `_device_type` VARCHAR(256),
    IN `_device_serial` VARCHAR(256)
)
BEGIN
    DECLARE `_inserted_user_id` INT;
    DECLARE `_inserted_indentity_id` INT;
    DECLARE `_inserted_oauths_id` INT;
    DECLARE `_inserted_device_id` INT;
    DECLARE `_device_user_id` INT;
    
    -- Error handler for exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @text, MYSQL_ERRNO = @errno;
    END;

    START TRANSACTION;

    INSERT INTO 
        `users` (`first_name`, `last_name`, `role`) 
    VALUE 
        (`_first_name`, `_last_name`, `_role`);
    
    SELECT LAST_INSERT_ID() INTO `_inserted_user_id`;
    
    INSERT INTO
        `identities` (`type`, `value`, `user_id`)
    VALUE
        (`_identity_type`, `_identity_value`, `_inserted_user_id`);
    
    SELECT LAST_INSERT_ID() INTO `_inserted_indentity_id`;
    
    INSERT INTO
        `oauths` (`hash`, `user_id`)
    VALUE
        (`_oauth_hash`, `_inserted_user_id`);
    
    SELECT LAST_INSERT_ID() INTO `_inserted_oauths_id`;

    INSERT INTO
        `devices` (`type`, `serial`, `user_id`)
    VALUE
        (`_device_type`, `_device_serial`, `_inserted_user_id`);

    SELECT LAST_INSERT_ID() INTO `_inserted_device_id`;

    UPDATE 
        `activities`
    SET 
        `user_id` = `_inserted_user_id`, `device_id` = `_inserted_device_id`
    WHERE 
        `device_serial` = `_device_serial` AND `user_id` IS NULL AND `device_id` IS NULL;

    COMMIT;

    SELECT 
        `id`, 
        `first_name` AS firstName, 
        `last_name` AS lastName,
        `role`
    FROM `users` 
    WHERE `id` = `_inserted_user_id`;

    SELECT 
        `id`,
        `type`,
        `serial`
    FROM `devices` 
    WHERE `id` = `_inserted_device_id`;

    SELECT 
        `id`,
        `type`,
        `value`
    FROM `identities` 
    WHERE `id` = `_inserted_indentity_id`;
END
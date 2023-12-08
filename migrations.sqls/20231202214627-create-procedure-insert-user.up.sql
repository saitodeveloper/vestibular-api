CREATE PROCEDURE `insert_user` (
	IN `_first_name` VARCHAR(45),
    IN `_last_name` VARCHAR(45),
    IN `_role` VARCHAR(45),
    IN `_identity_type` VARCHAR(45),
	IN `_identity_value` VARCHAR(45),
    IN `_oauth_hash` VARCHAR(160),
    IN `_device_type` VARCHAR(45),
    IN `_device_serial` VARCHAR(90)
)
BEGIN
	DECLARE `_inserted_user_id` INT;
	DECLARE `_inserted_indentity_id` INT;
	DECLARE `_inserted_oauths_id` INT;
	DECLARE `_inserted_device_id` INT;
    DECLARE `_device_user_id` INT;
    
    DECLARE exit handler for sqlexception
	BEGIN
        ROLLBACK;
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

    SELECT 
		`id`, `user_id` 
	INTO 
		`_inserted_device_id`, `_device_user_id`
	FROM 
		`devices` 
	WHERE
		`serial` = `_device_serial`;

	IF `_inserted_device_id` IS NULL THEN
    	INSERT INTO
			`devices` (`type`, `serial`, `user_id`)
		VALUE
			(`_device_type`, `_device_serial`, `_inserted_user_id`);
		
		SELECT LAST_INSERT_ID() INTO `_inserted_device_id`;
    ELSE
		UPDATE 
            `devices` 
        SET 
            `user_id` = `_inserted_user_id` 
        WHERE 
            `id` = `_inserted_device_id`;
    END IF;

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
        `serial`,
        `_inserted_device_id` = `user_id` AS `userIdBelongs`
    FROM `devices` 
    WHERE `id` = `_inserted_device_id`;

    SELECT 
        `id`,
        `type`,
        `value`
    FROM `identities` 
    WHERE `id` = `_inserted_indentity_id`;
END
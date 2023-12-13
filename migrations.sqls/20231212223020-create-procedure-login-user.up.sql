CREATE PROCEDURE `login_user` (
    IN `_identity_value` VARCHAR(45),
    IN `_plain_password` TEXT,
    IN `_device_type` VARCHAR(45),
	IN `_device_serial` VARCHAR(90)
)
BEGIN
	DECLARE `_test_user_id` INT;
    DECLARE `_found_device_id` INT;
    DECLARE `_latest_hash_salt` VARCHAR(160);
    DECLARE `_salt` VARCHAR(20);
    DECLARE `_test_hash` VARCHAR(160);
    DECLARE `_hash` VARCHAR(160);
    
	SELECT 
		u.`id` INTO `_test_user_id`
	FROM 
		`users` u
	INNER JOIN
		`identities` i ON i.`user_id` = u.`id`
	WHERE
		i.`value` = `_identity_value`;
        
	SELECT
		`hash` INTO `_latest_hash_salt`
	FROM 
		`oauths`
	WHERE
		`user_id` = `_test_user_id`
	ORDER BY
		`created_at` ASC
	LIMIT 1;

	SELECT REPLACE(SUBSTRING(SUBSTRING_INDEX(`_latest_hash_salt`, '.', 1),
       LENGTH(SUBSTRING_INDEX(`_latest_hash_salt`, '.', 0)) + 1),
       '.', '') INTO `_hash`;

    SELECT REPLACE(SUBSTRING(SUBSTRING_INDEX(`_latest_hash_salt`, '.', 2),
       LENGTH(SUBSTRING_INDEX(`_latest_hash_salt`, '.', 1)) + 1),
       '.', '') INTO `_salt`;

       
	SELECT SHA2(CONCAT(`_plain_password`, '.', `_salt`), 512) INTO `_test_hash`;
    
    SELECT 
		`id`
	INTO
		`_found_device_id`
    FROM 
		`devices` 
    WHERE 
		`serial` = `_device_serial` AND `user_id` = `_test_user_id`;
        
	IF `_found_device_id` IS NULL THEN
		INSERT INTO
			`devices` (`type`, `serial`, `user_id`)
		VALUE
			(`_device_type`, `_device_serial`, `_test_user_id`);
    END IF;

    IF `_test_hash` = `_hash` THEN
		UPDATE 
			`activities`
		SET 
			`user_id` = `_test_user_id`, `device_id` = `_device_serial`
		WHERE 
			`device_serial` = `_device_serial` AND `user_id` IS NULL AND `device_id` IS NULL;
    END IF;
    
    SELECT 
		`_test_hash` = `_hash` AS `authorized`, 
        `_test_user_id` AS `userId`,
        `_device_serial` AS `deviceSerial`,
		`_found_device_id` IS NULL AS `newDeviceAdded`;
END
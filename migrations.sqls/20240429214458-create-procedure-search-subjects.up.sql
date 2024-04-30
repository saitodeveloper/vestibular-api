CREATE PROCEDURE `search_subjects` (
	IN `_name` VARCHAR(45),
    IN `_limit` INT,
    IN `_offset` INT
)
BEGIN
	DECLARE `_no_filters` TINYINT;

    SELECT 
        `_name` IS NULL
    INTO
        `_no_filters`;
        
	SELECT 
		COUNT(*) AS `total`
	FROM 
		`subjects`
	WHERE
		`_no_filters` OR
		(`_name` IS NOT NULL AND `name` LIKE CONCAT('%', `_name`, '%'));
        
	SELECT 
		`id`,
		`name`,
        `parent`,
        `updated_at` AS `updatedAt`,
        `created_at` AS `createdAt` 
	FROM 
		`subjects`
	WHERE
		`_no_filters` OR
		(`_name` IS NOT NULL AND `name` LIKE CONCAT('%', `_name`, '%'))
	LIMIT `_limit` OFFSET `_offset`;
END
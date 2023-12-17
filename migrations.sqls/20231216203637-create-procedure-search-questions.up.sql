CREATE PROCEDURE `search_question_inclusive` (
    IN `_id` INT,
    IN `_institution` VARCHAR(45),
    IN `_year` INT,
    IN `_exam_name` VARCHAR(45),
    IN `_enum` INT,
    IN `_id_list` JSON,
    IN `_limit` INT,
    IN `_offset` INT
)
BEGIN
    DECLARE `_no_filters` TINYINT;

    SELECT 
        `_id` IS NULL AND
        `_institution` IS NULL AND
        `_year` IS NULL AND
        `_exam_name` IS NULL AND
        `_enum` IS NULL
    INTO
        `_no_filters`;

    -- Get total records acording to conditions
    SELECT 
        COUNT(*) AS `total`
    FROM 
        `questions`
    WHERE
        `_no_filters` OR
        (`_id` IS NOT NULL AND `id` = `_id`) OR
        (
            `_id_list` IS NOT NULL AND `id` IN 
            (
                SELECT
                   js.*
                FROM
                    JSON_TABLE(
                        `_id_list`,
                        '$[*]' COLUMNS(id INT PATH "$")
                    ) js
            )
        ) OR
        (`_institution` IS NOT NULL AND `institution` = `_institution`) OR
        (`_year` IS NOT NULL AND `year` = `_year`) OR
        (`_exam_name` IS NOT NULL AND `exam_name` = `_exam_name`) OR
        (`_enum` IS NOT NULL AND `enum` = `_enum`);
    
    -- Get search results
    SELECT 
        * 
    FROM (
        SELECT
            q.*
        FROM 
            `questions` q
        WHERE
            `_no_filters` OR
            (`_id` IS NOT NULL AND `id` = `_id`) OR
            (`_institution` IS NOT NULL AND `institution` = `_institution`) OR
            (`_year` IS NOT NULL AND `year` = `_year`) OR
            (`_exam_name` IS NOT NULL AND `exam_name` = `_exam_name`) OR
            (`_enum` IS NOT NULL AND `enum` = `_enum`)
        LIMIT `_limit` OFFSET `_offset`
    ) qtemp 
    INNER JOIN
        `alternatives` a ON a.`question_id` = qtemp.`id`;
END

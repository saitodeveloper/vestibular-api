CREATE PROCEDURE `insert_question` (
    IN `_statement` TEXT,
    IN `_institution`VARCHAR(45),
    IN `_year` INT,
    IN `_exam_name` VARCHAR(200),
    IN `_enum` INT,
    IN `_alternatives_json` JSON,
    IN `_subjects_id_list_json` JSON 
)
BEGIN
    DECLARE `_inserted_question` INT;

    START TRANSACTION;

    INSERT INTO 
        `questions` (`statement`, `institution`, `year`, `exam_name`, `enum`) 
    VALUE 
        (`_statement`, `_institution`, `_year`, `_exam_name`, `_enum`);

    SELECT LAST_INSERT_ID() INTO `_inserted_question`;
    
    INSERT INTO
        `alternatives` (`statement`, `correct`, `question_id`)
    SELECT
        js.`statement`, js.`correct`, `_inserted_question` AS `question_id`
    FROM
        JSON_TABLE(
            `_alternatives_json`,
            '$[*]' COLUMNS(statement TEXT PATH '$.statement', correct BOOLEAN PATH '$.correct')
        ) js;

    INSERT INTO 
        `questions_subjects` (`subject_id`, `question_id` ) 
    SELECT
        js.`subject_id`, `_inserted_question` AS `question_id`
    FROM
        JSON_TABLE(
            `_subjects_id_list_json`,
            '$[*]' COLUMNS(`subject_id` INT PATH "$")
        ) js;
    COMMIT;

    SELECT 
        `id`, `statement`, `institution`, `year`, `exam_name`, `enum`
    FROM
        `questions`
    WHERE
        `id` = `_inserted_question`;

    SELECT 
        `id`, `statement`, `correct`
    FROM
        `alternatives`
    WHERE
        `question_id` = `_inserted_question`;

    SELECT
        s.`id`, s.`name`
    FROM
        `subjects` s
    INNER JOIN
        `questions_subjects` qs ON qs.`subject_id` = s.`id`
    WHERE
        qs.`question_id` = `_inserted_question`;
END

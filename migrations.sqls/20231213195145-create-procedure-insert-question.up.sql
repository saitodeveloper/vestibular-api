CREATE PROCEDURE `insert_question` (
    IN `_statement` TEXT,
    IN `_institution`VARCHAR(45),
    IN `_year` INT,
    IN `_exam_name` VARCHAR(45),
    IN `_enum` INT,
    IN `_alternatives_json` JSON
)
BEGIN
    DECLARE `_inserted_question` INT;
    
    DECLARE exit handler for sqlexception    
    BEGIN
        ROLLBACK;
    END;

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
    
    COMMIT;
END
CREATE PROCEDURE `insert_activity` (
    IN `_correct` TINYINT,
    IN `_user_id` INT,
    IN `_device_id` INT,
    IN `_device_serial` VARCHAR(90),
    IN `_question_id` INT
)
BEGIN
    DECLARE `_is_answer_correct` BOOLEAN;

    SELECT 
        `correct` = `_correct`
    INTO
        `_is_answer_correct`
    FROM
        `alternatives`
    WHERE 
        `question_id` = `_question_id` AND `correct` = 1
    LIMIT 1;

    INSERT INTO
        `activities` (`correct`, `user_id`, `device_id`, `device_serial`, `question_id`)
    VALUE
        (`_is_answer_correct`, `_user_id`, `_device_id`, `_device_serial`, `_question_id`);
    
    SELECT `_is_answer_correct` AS `isAnswerCorrect`;
END




    

    


    
    

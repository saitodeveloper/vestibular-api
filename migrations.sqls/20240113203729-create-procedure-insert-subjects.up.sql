CREATE PROCEDURE `insert_subjects`
(
	IN `_subject_json_list` JSON
)
BEGIN
	INSERT INTO 
        `subjects` (`parent`, `name`) 
    SELECT
        js.`parent`, js.`name`
    FROM
        JSON_TABLE(
            `_subject_json_list`,
            '$[*]' COLUMNS(`name` TEXT PATH "$.name", `parent` TEXT PATH "$.parent")
        ) js;
END;

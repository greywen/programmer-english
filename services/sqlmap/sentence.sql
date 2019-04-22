#select
getUserSentence:
SELECT
	s.id,
	s.english,
	s.chinese,
	s.keyWords,
	c.id collectionId
FROM
	data_sentence s
	LEFT JOIN user_collection c ON c.userId = @userId AND s.id = c.sentenceId
WHERE s.id = @sentenceId;
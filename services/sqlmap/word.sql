#select
getWordList:
SELECT *, (SELECT GROUP_CONCAT(Sentence)
    FROM (SELECT WordId, (SELECT GROUP_CONCAT(English,',',Chinese)
            FROM data_sentence
            WHERE Id = SentenceId) Sentence
        FROM word_sentence) ws) Sentence
FROM data_word w
WHERE w.Id = @id;
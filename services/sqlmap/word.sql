#select getWordList:
SELECT *, (SELECT GROUP_CONCAT(Sentence)
    FROM (SELECT WordId, (SELECT GROUP_CONCAT(English,',',Chinese)
            FROM data_sentence
            WHERE Id = SentenceId) Sentence
        FROM word_sentence) ws) Sentence
FROM data_word w
WHERE w.Id = @id;

#select getWord:
select dw.id, dw.english, dw.chinese, dw.phoneticUS, dw.phoneticEN, dw.collocation, dw.createTime, uc.id collectionId
from data_word dw
    left join user_collection uc on uc.wordId = dw.id and uc.userId = 1
where 1 = 1
#if (@next) { and dw.id > @wordId }
#if (!@next) { and dw.id = @wordId }
limit 1;
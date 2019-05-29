#select getWord:
select dw.id, dw.english, dw.chinese, dw.phoneticUS, dw.phoneticEN, dw.collocation, dw.createTime, uc.id collectionId
from data_word dw
    left join user_collection uc on uc.wordId = dw.id and uc.userId = 1
where 1 = 1
#if (@next) { and dw.id > @wordId }
#if (!@next) { and dw.id = @wordId }
limit 1;

#select getWordList:
select dw.id,dw.english,dw.chinese,dw.createTime 
from user_collection uc left join data_word dw on dw.id = uc.wordId 
where uc.userId = @userId 
limit @page,@pageSize;

#select getWordDetail:
select dw.id, dw.english, dw.chinese, dw.phoneticUS, dw.phoneticEN, dw.collocation, dw.createTime, uc.id collectionId
from data_word dw
    left join user_collection uc on uc.wordId = dw.id and uc.userId = @userId
where dw.id = @wordId;


#select getUserWordList:
select id,english,chinese,comments,createTime 
from user_word
where createUserId = @userId 
order by id desc
limit @page,@pageSize;
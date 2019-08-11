#update updateUserAttachmentRefIdByIds:
update user_attachment set refid = @refId where id in (@ids);
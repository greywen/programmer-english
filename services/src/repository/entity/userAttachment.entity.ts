import { BaseEntity } from "./base.entity";

export interface UserAttachmentEntity extends BaseEntity {
    attachmentType: number,
    fileName?: string,
    contentType?: string,
    filePath?: string,
    refId?: string,
    userId: number,
    createTime?: string
}
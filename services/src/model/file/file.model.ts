import { AttachmentType } from "../../common/enums";

export interface UserAttachmentCreateModel {
    attachmentType: AttachmentType,
    fileName?: string,
    contentType?: string,
    filePath?: string,
    refId?: string,
    uesrId: number
}
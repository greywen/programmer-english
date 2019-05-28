import { UserAttachmentCreateModel } from "../model/file";
import { userAttachmentRepository } from "../repository";

export class FileService {
    async createFileAsync(createModel: UserAttachmentCreateModel): Promise<number> {
        return await userAttachmentRepository.insertAsync(createModel);
    }
}

export default new FileService();
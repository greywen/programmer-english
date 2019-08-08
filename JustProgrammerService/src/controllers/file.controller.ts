import { prefix, router, setUserInformation } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import fileService from "../services/file.service";
import { AttachmentType } from "../common/enums";

@prefix("/file")
class FileController {
    @router({
        method: "post",
        path: "/upload",
        unless: false
    })
    async fileUpload(ctx: CustomKoaContextModel) {
        const file = ctx.request.files["file"];
        await fileService.createFileAsync({ userId: ctx.user.id, fileName: file.name, filePath: `${file.path}\\${file.name}`, contentType: file.type, attachmentType: AttachmentType.UserQuestion });
        ctx.body = file.name
    }
}
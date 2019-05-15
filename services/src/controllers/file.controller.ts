import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import * as fs from "fs";
import * as path from "path";
import config from "../common/config";
import fileService from "../services/file.service";
import { AttachmentType } from "../common/enums";

@prefix("/file")
class FileController {
    @router({
        method: "post",
        path: "/upload",
        unless: false
    })
    @authorize
    async fileUpload(ctx: CustomKoaContextModel) {
        const file = ctx.request.files["file"];
        let fileId = await fileService.createFileAsync({ uesrId: ctx.user.id, fileName: file.name, contentType: file.type, attachmentType: AttachmentType.UserQuestion });
        ctx.body = {
            statusCode: 200,
            data: {
                fileId: fileId,
                fileName: file.name
            }
        }
    }
}
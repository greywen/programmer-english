import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";

@prefix("/file")
class FileController {
    @router({
        method: "post",
        path: "/upload",
        unless: true
    })
    @authorize
    async fileUpload(ctx: CustomKoaContextModel) {
        console.log(ctx);
        const file = ctx.request.files["file"];
        logger.info(file.name);
        let reader = fs.createReadStream(file.path),
            fileName = `${file.name.split(".")[0]}_${new Date().getTime()}.${file.name.split(".")[1]}`,
            targetPath = path.join(__dirname, "./files") + `/${fileName}`;
        const upStream = fs.createWriteStream(targetPath);
        reader.pipe(upStream);
        ctx.body = {
            code: 200,
            data: targetPath
        }
    }
}
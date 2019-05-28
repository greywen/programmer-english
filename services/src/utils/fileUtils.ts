import * as fs from "fs";

export async function folderExistsSync(path: string) {
    return await fs.existsSync(path);
}

export async function mkdirFolderSync(path: string) {
    return await fs.mkdirSync(path);
}
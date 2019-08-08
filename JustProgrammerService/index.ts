import app from "./src/app";
import * as https from "https";
import * as fs from "fs";

import config from "./src/common/config"

const options = {
    pfx: fs.readFileSync(config.server.sslpfx),
    passphrase: config.server.passphrase
}

const server = https.createServer(options, app.callback()).listen(config.server.port, () => {
    let address = <any>server.address()
    console.log(`Server is running at ${address.address}${address.port}`)
});

module.exports = server;
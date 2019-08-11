import { verifyTokenAsync } from "../utils/jwtHelper";

module.exports = () => {
    return async function BindUserToCtx(ctx, next) {
        let token = ctx.header["authorization"];
        ctx.user = await verifyTokenAsync(token);
        await next();
    }
}
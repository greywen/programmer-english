import * as moment from "moment";

import { LoginModel, LoginResultModel } from "../model/user/login.model";
import { getWechatJSCodeSession } from "../utils/wechatHelper";
import { userRepository, userLoginLogRepository } from "../repository";
import { UserModel } from "../model/user";
import { generateTokenAsync } from "../utils/jwtHelper";
import { now } from "../utils/dateUtils";
import config from "../common/config";

export class UserService {
    async login(loginModel: LoginModel): Promise<LoginResultModel> {
        // get wechat user sessionkey/openid
        let jsCodeSession = await getWechatJSCodeSession(loginModel.code);
        if (jsCodeSession.openid) {
            let user = await userRepository.getFirstOrDefaultAsync({ wxOpenId: jsCodeSession.openid });
            if (user === null) {
                if (loginModel.wechatUserInfo) {
                    user = loginModel.wechatUserInfo;
                    user.wxOpenId = jsCodeSession.openid;
                    user.id = await this.createUserAsync(user);
                    return { sessionKey: jsCodeSession.session_key, token: await generateTokenAsync(user), expireTime: moment().add(config.jwt.expired, "day").toString() };
                }
                return null;
            } else {
                await this.createUserLoginLog(user.id);
                return { sessionKey: jsCodeSession.session_key, token: await generateTokenAsync(user), expireTime: moment().add(config.jwt.expired, "day").toString() };
            }
        } else {
            return null;
        }
    }

    async createUserAsync(userModel: UserModel): Promise<number> {
        userModel.createTime = now();
        return await userRepository.insertAsync(userModel);
    }

    async createUserLoginLog(userId: number): Promise<void> {
        await userLoginLogRepository.insertAsync({ userId: userId, loginTime: now() })
    }
}

export default new UserService();
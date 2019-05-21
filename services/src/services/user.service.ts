import * as moment from "moment";

import { LoginModel, LoginResultModel } from "../model/user/login.model";
import { getWechatJSCodeSession } from "../utils/wechatHelper";
import { userRepository, userLoginLogRepository, userFeedbackRepository } from "../repository";
import { UserModel, UserFeedbackModel } from "../model/user";
import { generateTokenAsync } from "../utils/jwtHelper";
import config from "../common/config";
import { FeedbackType } from "../common/enums";
import { FeedbackTypeArray } from "../common/constant";
import { BadRequestException } from "../common/exception";

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
                    await this.createUserLoginLog(user.id);
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
        return await userRepository.insertAsync(userModel);
    }

    async createUserLoginLog(userId: number): Promise<void> {
        await userLoginLogRepository.insertAsync({ userId: userId })
    }

    async createFeedbackAsync(feedback: UserFeedbackModel) {
        let canCreateFeedback = await this.checkUserCreateFeedbackUpperLimitByTodayAsync(feedback.userId);
        if (!canCreateFeedback) {
            return BadRequestException("Create feedback failed.");
        }
        feedback.type = FeedbackTypeArray.indexOf(feedback.type) > -1 ? feedback.type : FeedbackType.Feedback;
        return await userFeedbackRepository.insertAsync(feedback);
    }

    async checkUserCreateFeedbackUpperLimitByTodayAsync(userId: number): Promise<boolean> {
        let feedbackList = await userFeedbackRepository.getUserFeedbackByTodayAsync(userId);
        let upperLimit = 10;
        return feedbackList.length < upperLimit;
    }
}

export default new UserService();
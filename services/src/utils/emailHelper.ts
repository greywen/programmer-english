import * as nodemailer from 'nodemailer';

import config from '../common/config';
import logger from './logger';
import { MailOptions } from '../model/common.model';

export async function sendEmail(options: MailOptions) {
    options.from = `👻<${config.email.smtp.auth.user}>`;
    options.to = config.email.managerEmail;

    let transporter = nodemailer.createTransport(config.email.smtp);
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err: Error, info: any) => {
            if (err) {
                reject(0);
                logger.error(err.message);
            }
            transporter.close();
            resolve(info.messageId);
        });
    })
}

export async function template() {
    
}
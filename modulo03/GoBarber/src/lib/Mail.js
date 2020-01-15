import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConfig;

        this.nodemailer = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });
    }

    sendMail(message) {
        this.nodemailer.sendMail({
            ...mailConfig.default,
            ...message,
        });
    }
}

export default new Mail();

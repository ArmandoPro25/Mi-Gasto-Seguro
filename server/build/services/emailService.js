"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'migastoseguro@gmail.com',
        pass: 'f p e n x x k y g f v a o c j s'
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendVerificationEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'migastoseguro@gmail.com',
        to,
        subject: 'Verify your email',
        text: `Your verification code is ${code}`
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;

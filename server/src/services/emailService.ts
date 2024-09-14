import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'migastoseguro@gmail.com',
        pass: 'f p e n x x k y g f v a o c j s' 
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendVerificationEmail = async (to: string, code: string) => {
    const mailOptions = {
        from: 'migastoseguro@gmail.com',
        to,
        subject: 'Verify your email',
        text: `Your verification code is ${code}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export const sendRecoveryEmail = async (email: string, recoveryCode: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'migastoseguro@gmail.com',
            pass: 'f p e n x x k y g f v a o c j s',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'migastoseguro@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Usa este código para recuperar tu contraseña: ${recoveryCode}`,
    };

    await transporter.sendMail(mailOptions);
};
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
        subject: 'Verifiquemos tu cuenta',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #007BFF;">Verifiquemos tu cuenta</h2>
                <p>Gracias por registrarte en <strong>Mi Gasto Seguro</strong>.</p>
                <p>Tu código de verificación es:</p>
                <h3 style="color: #28a745;">${code}</h3>
                <p>Por favor, ingresa este código en la página de verificación para activar tu cuenta.</p>
                <p>Saludos,<br/>El equipo de Mi Gasto Seguro</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendRecoveryEmail = async (email: string, recoveryCode: string) => {
    const mailOptions = {
        from: 'migastoseguro@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #dc3545;">Recuperación de contraseña</h2>
                <p>Solicitaste recuperar tu contraseña en <strong>Mi Gasto Seguro</strong>.</p>
                <p>Tu código de recuperación es:</p>
                <h3 style="color: #28a745;">${recoveryCode}</h3>
                <p>Ingresa este código en la página de recuperación para establecer una nueva contraseña.</p>
                <p>Si no solicitaste esto, por favor ignora este correo.</p>
                <p>Saludos,<br/>El equipo de Mi Gasto Seguro</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Recovery email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

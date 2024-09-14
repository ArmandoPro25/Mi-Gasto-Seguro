import { Request, Response } from 'express';
import pool from '../database';

class RecoveryController {
    public async verifyRecoveryCode(req: Request, res: Response): Promise<void> {
        try {
            const { email, code } = req.body;
            const user = await pool.query('SELECT * FROM User WHERE Email_User = ? AND VerificationCode = ?', [email, code]);

            if (user.length > 0) {
                res.json({ success: true, message: 'Código de recuperación válido' });
            } else {
                res.status(400).json({ success: false, message: 'Código de recuperación inválido' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error al verificar el código de recuperación' });
        }
    }
}

const recoveryController = new RecoveryController();
export default recoveryController;

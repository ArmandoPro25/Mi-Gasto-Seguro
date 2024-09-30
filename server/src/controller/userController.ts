import { Request, Response } from 'express';
import pool from '../database';
import { sendRecoveryEmail, sendVerificationEmail } from '../services/emailService';
import crypto from 'crypto';

class UserController {
    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user = await pool.query('SELECT * FROM User WHERE Name_User = ? AND Password_User = ?', [username, password]);
            if (user.length > 0) {
                const { Id_User, Type_User} = user[0];
                res.json({ success: true, message: 'User authenticated',  Id_User, Type_User});
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (err) {
            res.status(500).json({ error: 'An error occurred during authentication' });
        }
    }



    public async create(req: Request, res: Response): Promise<void> {
      try {
          const { Name_User, Email_User, Password_User, Type_User } = req.body;
          const VerificationCode = crypto.randomBytes(3).toString('hex');  
          await pool.query('INSERT INTO User SET ?', [{ Name_User, Email_User, Password_User, Type_User, VerificationCode }]);
          await sendVerificationEmail(Email_User, VerificationCode);
          res.json({ message: 'User created and verification email sent' });
      } catch (err) {
          console.error(err);
          if (!res.headersSent) {
              res.status(500).json({ error: 'An error occurred while creating the user' });
          }
      }
  }
  


    public async verifyEmail(req: Request, res: Response): Promise<void> {
      try {
        const { email, code } = req.body;
        const user = await pool.query('SELECT * FROM User WHERE Email_User = ? AND VerificationCode = ?', [email, code]);
          if (user.length > 0) {
            await pool.query('UPDATE User SET Verified = 1 WHERE Email_User = ?', [email]);
            const { Id_User, Type_User } = user[0];
            res.json({ success: true, message: 'Email verified', Id_User, Type_User });
          } else {
            res.status(400).json({ success: false, message: 'Invalid verification code' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during email verification' });
      }
    }



    public async getOne(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        try {
          const usuario = await pool.query('SELECT * FROM User WHERE Id_User = ?', [idUser]);
          if (usuario.length > 0) {
            res.json(usuario[0]);
          } else {
            res.status(404).json({ text: 'El usuario no existe' });
          }
        } catch (err) {
          res.status(500).json({ error: 'Error al obtener el usuario' });
        }
      }



    public async typeUser(req: Request, res: Response): Promise<void> {
      const { idUser } = req.params;
        try {
          const result = await pool.query('UPDATE User SET Type_User = 2 WHERE Id_User = ?', [idUser]);
          if (result.affectedRows > 0) {
            res.json({ success: true, message: 'User type updated successfully' });
          } else {
            res.status(404).json({ success: false, message: 'User not found' });
          }
        } catch (err) {
          res.status(500).json({ success: false, message: 'Error updating user type' });
        }
      }
    


    public async checkEmailExists(req: Request, res: Response): Promise<void> {
      const { email } = req.query;
      try {
            const result = await pool.query('SELECT * FROM User WHERE Email_User = ?', [email]);
            if (result.length > 0) {
                res.json({ success: true, message: 'Correo encontrado' });
            } else {
                res.json({ success: false, message: 'Correo no encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error al verificar el correo' });
        }
    }



    public async sendRecoveryEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        try {
            const recoveryCode = crypto.randomBytes(3).toString('hex');
            await pool.query('UPDATE User SET VerificationCode = ? WHERE Email_User = ?', [recoveryCode, email]);
            await sendRecoveryEmail(email, recoveryCode);
            res.json({ success: true, message: 'Correo de recuperación enviado' });
        } catch (err) {
            res.status(500).json({ error: 'Error al enviar el correo de recuperación' });
        }
    }
    
     

    public async verifyRecoveryCode(req: Request, res: Response): Promise<void> {
      try {
        const { email, code } = req.body;
        const result = await pool.query('SELECT * FROM User WHERE Email_User = ? AND VerificationCode = ?', [email, code]);
          if (result.affectedRows > 0) {
              res.json({ success: true, message: 'Contraseña actualizada correctamente' });
          } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
          }
          } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la contraseña' });
          }
        }



      public async updatePassword(req: Request, res: Response): Promise<void> {
        const { email, newPass } = req.body;
          try {
        const result = await pool.query('UPDATE User SET Password_User = ? WHERE Email_User = ?', [newPass, email]); 
        if (result.affectedRows > 0) {
          res.json({ success: true, message: 'Contraseña actualizada correctamente' });
        } else {
          res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
      } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
      }
    }
    


    public async getUserName(req: Request, res: Response): Promise<void> {
      const { idUser } = req.params;
      try {
          const result = await pool.query('SELECT Name_User FROM User WHERE Id_User = ?', [idUser]);
          if (result.length > 0) {
              res.json({ success: true, name: result[0].Name_User });
          } else {
              res.status(404).json({ success: false, message: 'Usuario no encontrado' });
          }
      } catch (err) {
          res.status(500).json({ error: 'Error al obtener el nombre del usuario' });
      }
    }
  


    public async getTypeUser(req: Request, res: Response): Promise<void> {
      const { idUser } = req.params;
      try {
        const result = await pool.query('SELECT Type_User FROM User WHERE Id_User = ?', [idUser]);
          if (result.length > 0) {
        res.json({ success: true, typeUser: result[0].Type_User });
      } else {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      } catch (err) {
      res.status(500).json({ error: 'Error al obtener el tipo de usuario' });
      }
    }
  
}

export const userController = new UserController();
export default userController;
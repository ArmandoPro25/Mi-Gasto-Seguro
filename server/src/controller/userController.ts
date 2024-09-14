import { Request, Response } from 'express';
import pool from '../database';
import { sendVerificationEmail } from '../services/emailService';
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

            // Generar un código de verificación aleatorio
            const VerificationCode = crypto.randomBytes(3).toString('hex'); // Ejemplo de código de 6 caracteres

            // Guardar el usuario en la base de datos (considera agregar el campo `verificationCode`)
            await pool.query('INSERT INTO User SET ?', [{ Name_User, Email_User, Password_User, Type_User, VerificationCode }]);

            // Enviar correo de verificación
            await sendVerificationEmail(Email_User, VerificationCode);

            res.json({ message: 'User created and verification email sent' });
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    }

    public async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, code } = req.body;
    
            // Verificar el código en la base de datos
            const user = await pool.query('SELECT * FROM User WHERE Email_User = ? AND VerificationCode = ?', [email, code]);
    
            if (user.length > 0) {
                // Código correcto
                await pool.query('UPDATE User SET Verified = 1 WHERE Email_User = ?', [email]);
                
                const { Id_User, Type_User } = user[0]; // Obtiene los datos del usuario
    
                // Devuelve Id_User y Type_User en la respuesta
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
      

    }



export const userController = new UserController();
export default userController;
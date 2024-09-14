import { Request, Response } from 'express';
import pool from '../database';

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
            console.log(req.body);
            await pool.query('INSERT INTO User set ?', [req.body]);
            res.json({ message: 'User Saved' });
        } catch (err) {
            res.status(500).json({ error: 'The user was created' });
        }
    }
}


export const userController = new UserController();
export default userController;
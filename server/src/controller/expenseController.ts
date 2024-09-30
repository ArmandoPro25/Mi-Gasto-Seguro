import { Request, Response } from 'express';
import pool from '../database';
import { sendRecoveryEmail, sendVerificationEmail } from '../services/emailService';
import crypto from 'crypto';

class ExpenseController {

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { Description_Expense, Amount_Expense, Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses,
                Id_Category_Personal, Notes, Ticket } = req.body;
            await pool.query('INSERT INTO PersonalExpensess SET ?', [{ Description_Expense, Amount_Expense, 
                Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses, Id_Category_Personal, Notes, Ticket}]);
                res.json({ message: 'Expense created'});
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'An error occurred while creating the expense' });
            }
        }
    }


}

export const expenseController = new ExpenseController();
export default ExpenseController;
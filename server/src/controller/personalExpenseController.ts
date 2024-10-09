import { Request, Response } from 'express';
import pool from '../database';
import multer from 'multer';


class PersonalExpenseController {

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { Id_User, Description_Expense, Amount_Expense, Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses,
                Id_Category_Personal, Notes, Ticket } = req.body;
            await pool.query('INSERT INTO PersonalExpenses SET ?', [{ Id_User, Description_Expense, Amount_Expense, 
                Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses, Id_Category_Personal, Notes, Ticket}]);
                res.json({ message: 'Expense created'});
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'An error occurred while creating the expense' });
            }
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        try {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const expenses = await pool.query(
                'SELECT * FROM PersonalExpenses WHERE Id_User = ? AND MONTH(Date_Expense) = ? AND YEAR(Date_Expense) = ?',
                [idUser, month, year]
            );
    
            res.json({ expenses });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener los gastos' });
        }
    }
     

    public async getExpenseById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const [expense] = await pool.query('SELECT * FROM PersonalExpenses WHERE Id_PersonalExpenses = ?', [id]);   
            if (!expense) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            } 
            res.json(expense);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el gasto' });
        }
    }
        

    

}

export const personalExpenseController = new PersonalExpenseController();
export default PersonalExpenseController;
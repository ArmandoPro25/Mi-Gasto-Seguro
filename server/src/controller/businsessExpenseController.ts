import { Request, Response } from 'express';
import pool from '../database';
import multer from 'multer';


class BusinessExpenseController {

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { Id_User, Description_Expense, Amount_Expense, Date_Expense, Place_Expense, Payment_Method,
                Id_Category_Business, Project, Frequency_Expenses, Taxes, Ticket } = req.body;
            await pool.query('INSERT INTO BusinessExpenses SET ?', [{ Id_User, Description_Expense, Amount_Expense, 
                Date_Expense, Place_Expense, Id_Category_Business, Project, Frequency_Expenses, Taxes, Ticket}]);
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
        const { month, year } = req.query;
        
        try {
          const expenses = await pool.query(
            'SELECT * FROM BusinessExpenses WHERE Id_User = ? AND MONTH(Date_Expense) = ? AND YEAR(Date_Expense) = ?',
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
            const [expense] = await pool.query(`
                SELECT pe.*, cp.CategoryBusiness 
                FROM BusinessExpenses be
                JOIN CategoryBusiness cp ON be.Id_Category_Business = cp.Id_Category_Business
                WHERE be.Id_BusinessExpenses = ?
            `, [id]);   
            
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

export const businessExpenseController = new BusinessExpenseController();
export default BusinessExpenseController;
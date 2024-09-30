import { Router } from "express";
import { expenseController } from "../controller/expenseController";

class ExpenseRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create', expenseController.create);
    }
}

const expenseRoutes = new ExpenseRoutes();
export default expenseRoutes.router;
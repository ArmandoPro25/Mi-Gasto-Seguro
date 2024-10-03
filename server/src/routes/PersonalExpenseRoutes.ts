import { Router } from "express";
import { personalExpenseController } from "../controller/personalExpenseController";

class PersonalExpenseRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create', personalExpenseController.create);
        this.router.get('/list/:idUser', personalExpenseController.list);
        this.router.get('/getOne/:idUser/:idExpense', personalExpenseController.getOne);
    }
}

const personalExpenseRoutes = new PersonalExpenseRoutes();
export default personalExpenseRoutes.router;
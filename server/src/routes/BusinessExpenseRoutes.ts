import { Router } from "express";
import { businessExpenseController } from "../controller/businsessExpenseController";

class BusinessExpenseRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create',businessExpenseController.create);
        this.router.get('/list/:idUser', businessExpenseController.list);
        this.router.get('/getExpenseById/:id', businessExpenseController.getExpenseById);
    }
}

const businessExpenseRoutes = new BusinessExpenseRoutes();
export default businessExpenseRoutes.router;
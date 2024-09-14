import { Router } from "express";
import userController from "../controller/userController";

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/authenticate',userController.authenticate);
        this.router.post('/',userController.create);

    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
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
        this.router.post('/verify-email', userController.verifyEmail);
        this.router.put('/:idUser', userController.typeUser);
        this.router.get('/check-email', userController.checkEmailExists);
        this.router.post('/send-recovery-email', userController.sendRecoveryEmail);
        this.router.get('/verify-recovery-code', userController.verifyRecoveryCode);
        this.router.put('/update-password', userController.updatePassword);

    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
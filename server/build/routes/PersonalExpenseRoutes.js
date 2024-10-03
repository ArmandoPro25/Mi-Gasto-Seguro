"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personalExpenseController_1 = require("../controller/personalExpenseController");
class PersonalExpenseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', personalExpenseController_1.personalExpenseController.create);
        this.router.get('/list/:idUser', personalExpenseController_1.personalExpenseController.list);
        this.router.get('/getOne/:idUser/:idExpense', personalExpenseController_1.personalExpenseController.getOne);
    }
}
const personalExpenseRoutes = new PersonalExpenseRoutes();
exports.default = personalExpenseRoutes.router;

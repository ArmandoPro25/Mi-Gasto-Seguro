"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const businsessExpenseController_1 = require("../controller/businsessExpenseController");
class BusinessExpenseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', businsessExpenseController_1.businessExpenseController.create);
        this.router.get('/list/:idUser', businsessExpenseController_1.businessExpenseController.list);
        this.router.get('/getExpenseById/:id', businsessExpenseController_1.businessExpenseController.getExpenseById);
    }
}
const businessExpenseRoutes = new BusinessExpenseRoutes();
exports.default = businessExpenseRoutes.router;

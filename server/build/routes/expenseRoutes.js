"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controller/expenseController");
class ExpenseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', expenseController_1.expenseController.create);
    }
}
const expenseRoutes = new ExpenseRoutes();
exports.default = expenseRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/authenticate', userController_1.default.authenticate);
        this.router.post('/', userController_1.default.create);
        this.router.post('/verify-email', userController_1.default.verifyEmail);
        this.router.get('/:idUser', userController_1.default.getOne);
        this.router.put('/:idUser', userController_1.default.typeUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;

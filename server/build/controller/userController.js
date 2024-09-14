"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield database_1.default.query('SELECT * FROM User WHERE Name_User = ? AND Password_User = ?', [username, password]);
                if (user.length > 0) {
                    const { Id_User, Type_User } = user[0];
                    res.json({ success: true, message: 'User authenticated', Id_User, Type_User });
                }
                else {
                    res.status(401).json({ success: false, message: 'Invalid credentials' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'An error occurred during authentication' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield database_1.default.query('INSERT INTO User set ?', [req.body]);
                res.json({ message: 'User Saved' });
            }
            catch (err) {
                res.status(500).json({ error: 'The user was created' });
            }
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;

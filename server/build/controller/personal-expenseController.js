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
exports.expenseController = void 0;
const database_1 = __importDefault(require("../database"));
class ExpenseController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Description_Expense, Amount_Expense, Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses, Id_Category_Personal, Notes, Ticket } = req.body;
                yield database_1.default.query('INSERT INTO PersonalExpensess SET ?', [{ Description_Expense, Amount_Expense,
                        Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses, Id_Category_Personal, Notes, Ticket }]);
                res.json({ message: 'Expense created' });
            }
            catch (err) {
                console.error(err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'An error occurred while creating the expense' });
                }
            }
        });
    }
}
exports.expenseController = new ExpenseController();
exports.default = ExpenseController;

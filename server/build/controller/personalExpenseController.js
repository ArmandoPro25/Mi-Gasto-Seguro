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
exports.personalExpenseController = void 0;
const database_1 = __importDefault(require("../database"));
class PersonalExpenseController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id_User, Description_Expense, Amount_Expense, Date_Expense, Place_Expense, Payment_Method, Frequency_Expenses, Id_Category_Personal, Notes, Ticket } = req.body;
                yield database_1.default.query('INSERT INTO PersonalExpenses SET ?', [{ Id_User, Description_Expense, Amount_Expense,
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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const currentDate = new Date();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                const expenses = yield database_1.default.query('SELECT * FROM PersonalExpenses WHERE Id_User = ? AND MONTH(Date_Expense) = ? AND YEAR(Date_Expense) = ?', [idUser, month, year]);
                res.json({ expenses });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener los gastos' });
            }
        });
    }
    getExpenseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [expense] = yield database_1.default.query(`
                SELECT pe.*, cp.CategoryPersonal 
                FROM PersonalExpenses pe
                JOIN CategoryPersonal cp ON pe.Id_Category_Personal = cp.Id_Category_Personal
                WHERE pe.Id_PersonalExpenses = ?
            `, [id]);
                if (!expense) {
                    return res.status(404).json({ message: 'Gasto no encontrado' });
                }
                res.json(expense);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener el gasto' });
            }
        });
    }
}
exports.personalExpenseController = new PersonalExpenseController();
exports.default = PersonalExpenseController;

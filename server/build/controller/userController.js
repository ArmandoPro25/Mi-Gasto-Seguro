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
const emailService_1 = require("../services/emailService");
const crypto_1 = __importDefault(require("crypto"));
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
                const { Name_User, Email_User, Password_User, Type_User } = req.body;
                // Generar un código de verificación aleatorio
                const VerificationCode = crypto_1.default.randomBytes(3).toString('hex'); // Ejemplo de código de 6 caracteres
                // Guardar el usuario en la base de datos (considera agregar el campo `verificationCode`)
                yield database_1.default.query('INSERT INTO User SET ?', [{ Name_User, Email_User, Password_User, Type_User, VerificationCode }]);
                // Enviar correo de verificación
                yield (0, emailService_1.sendVerificationEmail)(Email_User, VerificationCode);
                res.json({ message: 'User created and verification email sent' });
            }
            catch (err) {
                res.status(500).json({ error: 'An error occurred while creating the user' });
            }
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, code } = req.body;
                // Verificar el código en la base de datos
                const user = yield database_1.default.query('SELECT * FROM User WHERE Email_User = ? AND VerificationCode = ?', [email, code]);
                if (user.length > 0) {
                    // Código correcto
                    yield database_1.default.query('UPDATE User SET Verified = 1 WHERE Email_User = ?', [email]);
                    const { Id_User, Type_User } = user[0]; // Obtiene los datos del usuario
                    // Devuelve Id_User y Type_User en la respuesta
                    res.json({ success: true, message: 'Email verified', Id_User, Type_User });
                }
                else {
                    res.status(400).json({ success: false, message: 'Invalid verification code' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'An error occurred during email verification' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const usuario = yield database_1.default.query('SELECT * FROM User WHERE Id_User = ?', [idUser]);
                if (usuario.length > 0) {
                    res.json(usuario[0]);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener el usuario' });
            }
        });
    }
    typeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const result = yield database_1.default.query('UPDATE User SET Type_User = 2 WHERE Id_User = ?', [idUser]);
                if (result.affectedRows > 0) {
                    res.json({ success: true, message: 'User type updated successfully' });
                }
                else {
                    res.status(404).json({ success: false, message: 'User not found' });
                }
            }
            catch (err) {
                res.status(500).json({ success: false, message: 'Error updating user type' });
            }
        });
    }
    emailExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.query;
            try {
                const result = yield database_1.default.query('SELECT * FROM User WHERE Email_User = ?', [email]);
                if (result.length > 0) {
                    res.json({ success: true, message: 'Email already exists' });
                }
                else {
                    res.status(404).json({ success: false, message: 'Email does not exist' });
                }
            }
            catch (err) {
                console.error(err); // Log error for debugging
                res.status(500).json({ success: false, message: 'Error searching email' });
            }
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;

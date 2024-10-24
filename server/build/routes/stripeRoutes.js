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
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51QDKqHLAh0cR3je8QOD0HpbR09g2aORGAgvD71wmpMpiR8R2F9TWlbH9PGT9kMW8akHl5ALgkHGtaYBOU4To5Ja400ot7xWbHQ', { apiVersion: '2024-09-30.acacia' });
const router = (0, express_1.Router)();
router.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: {
                            name: 'Acceso a Mi Gasto Seguro',
                        },
                        unit_amount: 25000, // 250 MXN en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:4200/success`,
            cancel_url: `http://localhost:4200/cancel`,
        });
        res.json({ id: session.id });
    }
    catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Internal Server Error');
    }
}));
exports.default = router;

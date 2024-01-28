// interfaces/controllers/paymentController.js
const Joi = require('joi');
const PaymentService = require('../../application/paymentService');
const { processPaymentSchema } = require('../validators/paymentValidator');

class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    async processPayment(req, res) {
        try {
            const { error } = processPaymentSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details.map(el => el.message).join('\n') });
            }

            const paymentResult = await this.paymentService.processPayment(req.body);
            res.status(200).json({ message: paymentResult });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getPayments(req, res) {
        try {
            const payments = await this.paymentService.getPayments();
            res.status(200).json({ payments });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = PaymentController;

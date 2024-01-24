const express = require('express');
const PaymentEntity = require('../../domain/entities/paymentEntity');
const PaymentService = require('../services/paymentService');
const PaymentRepository = require('../repositories/paymentRepository');
const mercadopago = require('../../config/mercadoPagoConfig');
const Joi = require('joi');
const validate = require('express-validation');

const paymentRouter = express.Router();

const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository, mercadopago);

const paymentValidationSchema = {
    body: Joi.object({
        amount: Joi.number().required(),
        description: Joi.string().required(),
        cardToken: Joi.string().required(),
    }),
};

paymentRouter.post('/processPayment',  validate(paymentValidationSchema), async (req, res) => {
    const {
        transaction_amount,
        description,
        payment_method_id,
        payer
    } = req.body;

    const payment = new PaymentEntity(
        transaction_amount,
        description,
        payment_method_id,
        payer);

    try {
        const result = await paymentService.processPayment(payment);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erro ao processar o pagamento'});
    }
});

module.exports = paymentRouter;

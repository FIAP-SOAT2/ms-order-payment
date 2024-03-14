const express = require('express');
const router = express.Router();

const PaymentController = require('../../interfaces/controllers/paymentController');
const ValidatePaymentProcessData = require('../../interfaces/validators/paymentProcess/paymentProcessValidator');
const ValidateFindPaymentData = require('../../interfaces/validators/findProcess/findPaymentValidator');

const validatePaymentProcessData = new ValidatePaymentProcessData();
const validateFindPaymentData = new ValidateFindPaymentData();
const paymentController = new PaymentController();

router.post('/processPayment',
    validatePaymentProcessData.validatePaymentData.bind(ValidatePaymentProcessData),
    paymentController.processPayment.bind(paymentController));

router.get('/processPayment',
    validateFindPaymentData.validatePaymentData.bind(ValidateFindPaymentData),
    paymentController.getPayments.bind(paymentController));

module.exports = router;

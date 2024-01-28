const express = require('express');
const PaymentController = require('../../interfaces/controllers/paymentController');

const paymentController = new PaymentController();
const router = express.Router();

router.post('/processPayment', paymentController.processPayment.bind(paymentController));
router.get('/', paymentController.getPayments.bind(paymentController));

module.exports = router;

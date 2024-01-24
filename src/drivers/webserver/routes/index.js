const express = require('express');
const router = express.Router();

const payments = require('./payments');

router.post('/payment/processPayment', payments.create)
router.get('/payment', payments.get)

module.exports = router;

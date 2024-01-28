// interfaces/validators/paymentValidator.js
const Joi = require('joi');

const processPaymentSchema = Joi.object({
    transaction_amount: Joi.number().required(),
    description: Joi.string().required(),
    payment_method_id: Joi.string().required(),
    payer: Joi.object().required(),
});

module.exports = {
    processPaymentSchema,
};

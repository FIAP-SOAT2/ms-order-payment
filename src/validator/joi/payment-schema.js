let Joi = require('joi');

module.exports = Joi.object().keys({
    transaction_amount: Joi.string().required().error(() => 'must have name as string'),
    description: Joi.string().required().error(() => 'must have name as string'),
    payment_method_id: Joi.string().required().error(() => 'must have name as string'),
    payer: Joi.object().required().error(() => 'must have name as object')
});

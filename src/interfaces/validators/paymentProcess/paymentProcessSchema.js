const Joi = require("joi");
const GeneralErrors = require("../../../infra/http/generalErrors");

const paymentProcessSchema = Joi.object({
    transaction_amount: Joi.number().required().messages({
        'number.base': GeneralErrors.INVALID_TRANSACTION_AMOUNT.description,
        'any.required': GeneralErrors.MISSING_TRANSACTION_AMOUNT.description
    }),
    description: Joi.string().required().messages({
        'string.base': GeneralErrors.INVALID_DESCRIPTION.description,
        'any.required': GeneralErrors.MISSING_DESCRIPTION.description
    }),
    payment_method_id: Joi.string().required().messages({
        'string.base': GeneralErrors.INVALID_PAYMENT_METHOD_ID.description,
        'any.required': GeneralErrors.PAYMENT_MISSING_METHOD_ID.description
    }),
    payer: Joi.object().required().messages({
        'object.base': GeneralErrors.INVALID_PAYER.description,
        'any.required': GeneralErrors.MISSING_PAYER.description
    })
}).options({abortEarly: false, allowUnknown: true});

module.exports = paymentProcessSchema;

const Joi = require("joi");
const GeneralErrors = require("../../../infra/http/generalErrors");

const findPaymentSchema = Joi.object({
    criteria: Joi.string().valid('desc', 'asc').messages({
        'string.base': GeneralErrors.INVALID_CRITERIA.description,
        'any.only': GeneralErrors.INVALID_CRITERIA.description,
    }),
    sort: Joi.string().valid('date_approved', 'date_created', 'date_last_updated', 'id', 'money_release_date').messages({
        'string.base': GeneralErrors.INVALID_SORT.description,
        'any.only': GeneralErrors.INVALID_SORT.description,
    }),
    external_reference: Joi.string().messages({
        'string.base': GeneralErrors.INVALID_EXTERNAL_REFERENCE.description,
    })
}).options({ abortEarly: false, allowUnknown: true });

module.exports = findPaymentSchema;

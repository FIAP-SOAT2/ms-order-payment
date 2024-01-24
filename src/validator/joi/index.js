let Joi = require('joi');
let paymentSchema = require('./payment-schema');

let JoiValidator = (payload, schema) => {
    let {error} = Joi.validate(payload, schema, {abortEarly: false})
    if (error) {
        let message = error.details.map(el => el.message).join('\n')
        return {
            error: message
        }
    }
    return true
}

let validator = {
    paymentValidator: (payload) => JoiValidator(payload, paymentSchema)
}

module.exports = validator

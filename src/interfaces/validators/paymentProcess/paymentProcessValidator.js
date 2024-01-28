const GeneralErrors = require('../../../infra/http/generalErrors');
const processPaymentSchema = require('./paymentProcessSchema');

class PaymentProcessValidator {

    async validatePaymentData(req, res, next) {
        const {error} = await processPaymentSchema.validate(req.body, {abortEarly: false});
        if (error) {
            res.status(GeneralErrors.BAD_REQUEST.code).json({errors: error.details.map(el => el.message)});
            return;
        }
        next();
    };
}

module.exports = PaymentProcessValidator;

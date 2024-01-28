const GeneralErrors = require('../../../infra/http/generalErrors');
const findPaymentData = require('./findPaymentSchema');

class FindPaymentValidator {

    async validatePaymentData(req, res, next) {
        const {error} = await findPaymentData.validate(req.query, {abortEarly: false});
        if (error) {
            res.status(GeneralErrors.BAD_REQUEST.code).json({errors: error.details.map(el => el.message)});
            return;
        }
        next();
    };
}

module.exports = FindPaymentValidator;

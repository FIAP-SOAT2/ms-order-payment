const GeneralErrors = require('../../infra/http/generalErrors');
const PaymentService = require('../../application/paymentService');

class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    async processPayment(req, res) {
        try {
            const paymentResult = await this.paymentService.processPayment(req.body);
            res.status(200).json({message: paymentResult});
        } catch (error) {
            if (error.statusCode >= GeneralErrors.BAD_REQUEST.code && error.statusCode <= GeneralErrors.NOT_FOUND.code) {
                res.status(error.statusCode).json({error: error.message});
            } else {
                res.status(GeneralErrors.INTERNAL_SERVER_ERROR.code).json({error: error.message || 'Internal server error'});
            }
        }
    }

    async getPayments(req, res) {
        try {
            const {criteria, sort, external_reference} = req.query;
            const payments = await this.paymentService.getPayments(criteria, sort, external_reference);
            res.status(200).json({payments});
        } catch (error) {
            if (error.statusCode >= GeneralErrors.BAD_REQUEST.code && error.statusCode <= GeneralErrors.NOT_FOUND.code) {
                res.status(error.statusCode).json({error: error.message});
            } else {
                res.status(GeneralErrors.INTERNAL_SERVER_ERROR.code).json({error: 'Internal server error'});
            }
        }
    }
}

module.exports = PaymentController;

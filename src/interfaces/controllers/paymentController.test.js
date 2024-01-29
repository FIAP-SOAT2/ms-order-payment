const GeneralErrors = require('../../infra/http/generalErrors');
const PaymentService = require('../../application/paymentService');
const PaymentController = require('./paymentController');

jest.mock('../../application/paymentService');

describe('PaymentController', () => {
    let paymentController;
    let req;
    let res;

    beforeEach(() => {
        paymentController = new PaymentController();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('processPayment', () => {
        test('should handle successful payment process', async () => {
            const paymentResult = {};

            req = {
                body: {
                    transaction_amount: 12.34,
                    description: 'Valid description',
                    payment_method_id: 'valid_payment_method',
                    payer: {email: 'test@test.com'}
                }
            };

            PaymentService.prototype.processPayment.mockResolvedValueOnce(paymentResult);

            await paymentController.processPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: paymentResult});
        });

        test('should handle payment process error with status code between 400 and 404', async () => {
            req = {
                body: {
                    transaction_amount: "12.34",
                    description: null,
                    payment_method_id: 'valid_payment_method',
                    payer: {email: 'invalid_email'}
                }
            };

            const error = {
                statusCode: 400,
                message: 'Bad Request',
            };

            PaymentService.prototype.processPayment.mockRejectedValueOnce(error);

            await paymentController.processPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(error.statusCode);
            expect(res.json).toHaveBeenCalledWith({error: error.message});
        });

        test('should handle payment process error with status code greater than or equal to 500', async () => {

            req = {
                body: {
                    transaction_amount: 12.34,
                    description: "description",
                    payment_method_id: 'payment_method_id non-existent',
                    payer: {email: 'valid@test.com'}
                }
            };

            const error = {
                statusCode: 500,
                message: 'Internal Server Error',
            };
            PaymentService.prototype.processPayment.mockRejectedValueOnce(error);

            await paymentController.processPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(GeneralErrors.INTERNAL_SERVER_ERROR.code);
            expect(res.json).toHaveBeenCalledWith({error: error.message});
        });
    });

    describe('getPayments', () => {
        test('should handle successful getPayments', async () => {
            const payments = {results: []};
            PaymentService.prototype.getPayments.mockResolvedValueOnce(payments);
            req = {
                query: {criteria: 'desc', sort: 'date_created', external_reference: 'test'}
            };

            await paymentController.getPayments(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({payments});
        });

        test('should handle getPayments error with status code between 400 and 499', async () => {
            const error = {
                statusCode: 400,
                message: 'Bad Request',
            };
            PaymentService.prototype.getPayments.mockRejectedValueOnce(error);
            req = {
                query: {criteria: 'desc', sort: 'date_created', external_reference: 'test'}
            };

            await paymentController.getPayments(req, res);

            expect(res.status).toHaveBeenCalledWith(error.statusCode);
            expect(res.json).toHaveBeenCalledWith({error: error.message});
        });

        test('should handle getPayments error with status code greater than or equal to 500', async () => {
            const error = {
                statusCode: 500,
                message: 'Internal Server Error',
            };
            PaymentService.prototype.getPayments.mockRejectedValueOnce(error);
            req = {
                query: {criteria: 'desc', sort: 'date_created', external_reference: 'test'}
            };

            await paymentController.getPayments(req, res);

            expect(res.status).toHaveBeenCalledWith(GeneralErrors.INTERNAL_SERVER_ERROR.code);
            expect(res.json).toHaveBeenCalledWith({error: 'Internal server error'});
        });
    });
});

const PaymentUseCase = require('../domain/paymentUseCase');
const PaymentService = require('./paymentService');

jest.mock('../domain/paymentUseCase');

describe('PaymentService', () => {
    let paymentService;

    beforeEach(() => {
        paymentService = new PaymentService();
    });

    describe('processPayment', () => {
        test('should handle successful payment processing', async () => {
            const paymentResult = {};
            PaymentUseCase.prototype.processPayment.mockResolvedValueOnce(paymentResult);

            const data = {
                transaction_amount: 12.34,
                description: 'Valid description',
                payment_method_id: 'valid_payment_method',
                payer: {email: 'test@test.com'}
            };

            const result = await paymentService.processPayment(data);

            expect(result).toEqual(paymentResult);
        });

        test('should handle payment processing error', async () => {
            const error = new Error('Error in PaymentUseCase');
            PaymentUseCase.prototype.processPayment.mockRejectedValueOnce(error);

            const data = {
                transaction_amount: "12.34",
                description: null,
                payment_method_id: 'valid_payment_method',
                payer: {email: 'invalid_email'}
            };

            await expect(paymentService.processPayment(data)).rejects.toThrow(error);
        });
    });

    describe('getPayments', () => {
        test('should handle successful payments retrieval', async () => {
            const payments = {
               results: []
            };
            PaymentUseCase.prototype.getPayments.mockResolvedValueOnce(payments);

            const criteria = 'desc';
            const sort = 'date_created';
            const external_reference = 'test';

            const result = await paymentService.getPayments(criteria, sort, external_reference);

            expect(result).toEqual(payments);
        });

        test('should handle payments retrieval error', async () => {
            const error = new Error('Error in PaymentUseCase');
            PaymentUseCase.prototype.getPayments.mockRejectedValueOnce(error);

            const criteria = 'invalid';
            const sort = 'invalid';
            const external_reference = 'invalid';

            await expect(paymentService.getPayments(criteria, sort, external_reference)).rejects.toThrow(error);
        });
    });
});

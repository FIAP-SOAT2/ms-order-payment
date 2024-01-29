const PaymentRepository = require('./paymentRepository');
const PaymentUseCase = require('./paymentUseCase');
const GeneralErrors = require('../infra/http/generalErrors');

jest.mock('./paymentRepository');

describe('PaymentUseCase', () => {
    let paymentUseCase;

    beforeEach(() => {
        paymentUseCase = new PaymentUseCase();
    });

    describe('processPayment', () => {
        test('should handle successful payment processing', async () => {
            PaymentRepository.prototype.createPayment.mockResolvedValueOnce({});

            const data = {
                transaction_amount: 12.34,
                description: 'Valid description',
                payment_method_id: 'valid_payment_method',
                payer: { email: 'test@test.com' }
            };

            const result = await paymentUseCase.processPayment(data);

            expect(result).toEqual({});
            expect(PaymentRepository.prototype.createPayment).toHaveBeenCalledWith(data);
        });

        test('should handle payment processing error', async () => {
            PaymentRepository.prototype.createPayment.mockRejectedValueOnce(GeneralErrors.INTERNAL_SERVER_ERROR);

            const data = {
                transaction_amount: 12.34,
                description: 'Valid description',
                payment_method_id: 'valid_payment_method',
                payer: { email: 'invalid_email' }
            };

            await expect(paymentUseCase.processPayment(data)).rejects.toEqual(GeneralErrors.INTERNAL_SERVER_ERROR);
        });
    });

    describe('getPayments', () => {
        test('should handle successful payments retrieval', async () => {
            PaymentRepository.prototype.getPayments.mockResolvedValueOnce({ results: [] });

            const criteria = 'desc';
            const sort = 'date_created';
            const external_reference = 'test';

            const result = await paymentUseCase.getPayments(criteria, sort, external_reference);

            expect(result).toEqual({ results: [] });
            expect(PaymentRepository.prototype.getPayments).toHaveBeenCalledWith(criteria, sort, external_reference);
        });

        test('should handle payments retrieval error', async () => {
            PaymentRepository.prototype.getPayments.mockRejectedValueOnce(GeneralErrors.INTERNAL_SERVER_ERROR);

            const criteria = 'invalid';
            const sort = 'invalid';
            const external_reference = 'invalid';

            await expect(paymentUseCase.getPayments(criteria, sort, external_reference)).rejects.toEqual(GeneralErrors.INTERNAL_SERVER_ERROR);
        });
    });
});

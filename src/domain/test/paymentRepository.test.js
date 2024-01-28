const mercadoPagoApi = require('../../infra/apis/mercadoPagoApi');
const PaymentRepository = require('../paymentRepository');

jest.mock('../../infra/apis/mercadoPagoApi');

describe('PaymentRepository', () => {
    let paymentRepository;

    beforeEach(() => {
        paymentRepository = new PaymentRepository();
    });

    describe('createPayment', () => {
        test('should call mercadoPagoApi.processPayment with correct data', async () => {
            const data = {
                transaction_amount: 12.34,
                description: 'Valid description',
                payment_method_id: 'valid_payment_method',
                payer: {email: 'test@test.com'}
            };

            await paymentRepository.createPayment(data);

            expect(mercadoPagoApi.processPayment).toHaveBeenCalledWith(data);
        });

        test('should throw error if mercadoPagoApi.processPayment throws error', async () => {
            const data = {
                transaction_amount: "12.34",
                description: null,
                payment_method_id: 'valid_payment_method',
                payer: {email: 'invalid_email'}
            };
            const errorMessage = 'Error from mercadoPagoApi.processPayment';
            mercadoPagoApi.processPayment.mockRejectedValueOnce(new Error(errorMessage));

            await expect(paymentRepository.createPayment(data)).rejects.toThrow(errorMessage);
        });
    });

    describe('getPayments', () => {
        test('should call mercadoPagoApi.getPayments with correct criteria, sort, and external_reference', async () => {
            const criteria = 'desc';
            const sort = 'date_created';
            const external_reference = 'test';

            await paymentRepository.getPayments(criteria, sort, external_reference);

            expect(mercadoPagoApi.getPayments).toHaveBeenCalledWith(criteria, sort, external_reference);
        });

        test('should throw error if mercadoPagoApi.getPayments throws error', async () => {
            const criteria = 'invalid criteria';
            const sort = 'date_created';
            const external_reference = 'test';

            const errorMessage = 'Error from mercadoPagoApi.getPayments';
            mercadoPagoApi.getPayments.mockRejectedValueOnce(new Error(errorMessage));

            await expect(paymentRepository.getPayments(criteria, sort, external_reference)).rejects.toThrow(errorMessage);
        });
    });
});

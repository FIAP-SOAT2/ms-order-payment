const {MercadoPagoConfig, Payment} = require('mercadopago');
const mercadoPagoApi = require('./mercadoPagoApi');

jest.mock('mercadopago');

describe('MercadoPagoApi', () => {

    describe('processPayment', () => {
        test('should call payment.create with correct data', async () => {
            const paymentInfo = {
                transaction_amount: 12.34,
                description: 'Valid description',
                payment_method_id: 'valid_payment_method',
                payer: {email: 'test@test.com'}
            };

            await mercadoPagoApi.processPayment(paymentInfo);

            expect(mercadoPagoApi.payment.create).toHaveBeenCalledWith({
                body: {
                    transaction_amount: +paymentInfo.transaction_amount,
                    description: paymentInfo.description,
                    payment_method_id: paymentInfo.payment_method_id,
                    payer: {
                        email: paymentInfo.payer.email
                    },
                }
            });
        });

        test('should throw error if payment.create throws error', async () => {
            const paymentInfo = {
                transaction_amount: "12.34",
                description: null,
                payment_method_id: 'valid_payment_method',
                payer: {email: 'invalid_email'}
            };

            const errorMessage = 'Error from payment.create';
            mercadoPagoApi.payment.create.mockRejectedValueOnce(new Error(errorMessage));

            await expect(mercadoPagoApi.processPayment(paymentInfo)).rejects.toThrow(errorMessage);
        });
    });

    describe('getPayments', () => {
        test('should call payment.search with correct criteria, sort, and external_reference', async () => {
            const criteria = 'desc';
            const sort = 'date_created';
            const external_reference = 'test';

            await mercadoPagoApi.getPayments(criteria, sort, external_reference);

            expect(mercadoPagoApi.payment.search).toHaveBeenCalledWith({
                options: {
                    criteria: criteria,
                    sort: sort,
                    external_reference: external_reference
                }
            });
        });

        test('should throw error if payment.search throws error', async () => {
            const criteria = 'invalid';
            const sort = 'invalid';
            const external_reference = 'invalid';

            const errorMessage = 'Error from payment.search';
            mercadoPagoApi.payment.search.mockRejectedValueOnce(new Error(errorMessage));

            await expect(mercadoPagoApi.getPayments(criteria, sort, external_reference)).rejects.toThrow(errorMessage);
        });
    });
})
;

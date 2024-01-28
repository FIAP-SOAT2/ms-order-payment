// application/__tests__/paymentService.test.js
const PaymentService = require('./paymentService');
const PaymentUseCase = require('../domain/paymentUseCase');

// Mocking the PaymentUseCase class
jest.mock('../domain/paymentUseCase');

describe('PaymentService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods of PaymentUseCase
        PaymentUseCase.mockClear();
    });

    describe('constructor', () => {
        test('should create an instance of PaymentService', () => {
            const paymentService = new PaymentService();
            expect(paymentService).toBeInstanceOf(PaymentService);
        });

        test('should create an instance of PaymentUseCase', () => {
            const paymentService = new PaymentService();
            expect(PaymentUseCase).toHaveBeenCalledTimes(1);
        });
    });

    describe('processPayment', () => {
        test('should call processPayment on PaymentUseCase with provided data', async () => {
            const paymentService = new PaymentService();
            const testData = {
                transaction_amount: 1,
                description: 'description',
                payment_method_id: 'payment_method_id',
                payer: {
                    email: 'email',
                }
            };

            await paymentService.processPayment(testData);

            expect(paymentService.paymentUseCase.processPayment).toHaveBeenCalledTimes(1);
            expect(paymentService.paymentUseCase.processPayment).toHaveBeenCalledWith(testData);
        });
    });

    describe('getPayments', () => {
        test('should call getPayments on PaymentUseCase', async () => {
            const paymentService = new PaymentService();

            await paymentService.getPayments();

            expect(paymentService.paymentUseCase.getPayments).toHaveBeenCalledTimes(1);
        });
    });
});

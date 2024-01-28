// application/paymentService.js
const PaymentUseCase = require('../domain/paymentUseCase');

class PaymentService {
    constructor() {
        this.paymentUseCase = new PaymentUseCase();
    }

    async processPayment(data) {
        try {
            return await this.paymentUseCase.processPayment(data);
        } catch (error) {
            console.log('Error in PaymentService:', error);
            throw error; // Rethrow Mercado Pago API errors
        }
    }

    async getPayments(criteria, sort, external_reference) {
        try {
            return await this.paymentUseCase.getPayments(criteria, sort, external_reference);
        } catch (error) {
            console.log('Error in PaymentService:', error);
            throw error; // Rethrow Mercado Pago API errors
        }
    }
}

module.exports = PaymentService;

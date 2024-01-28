const PaymentRepository = require('./paymentRepository');

class PaymentUseCase {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async processPayment(data) {
        try {
            return this.paymentRepository.createPayment(data);
        } catch (error) {
            throw error; // Rethrow Mercado Pago API errors
        }
    }

    async getPayments(criteria, sort, external_reference) {
        try {
            return this.paymentRepository.getPayments(criteria, sort, external_reference);
        } catch (error) {
            throw error; // Rethrow Mercado Pago API errors
        }
    }
}

module.exports = PaymentUseCase;

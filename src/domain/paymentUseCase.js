// domain/paymentUseCase.js
const PaymentRepository = require('./paymentRepository');

class PaymentUseCase {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async processPayment(data) {
        return this.paymentRepository.createPayment(data);
    }

    async getPayments() {
        return this.paymentRepository.getPayments();
    }
}

module.exports = PaymentUseCase;

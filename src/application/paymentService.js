// application/paymentService.js
const PaymentUseCase = require('../domain/paymentUseCase');

class PaymentService {
    constructor() {
        this.paymentUseCase = new PaymentUseCase();
    }

    async processPayment(data) {
        return this.paymentUseCase.processPayment(data);
    }

    async getPayments() {
        return this.paymentUseCase.getPayments();
    }
}

module.exports = PaymentService;

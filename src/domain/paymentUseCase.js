const PaymentRepository = require('./paymentRepository');

class PaymentUseCase {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async processPayment(data) {
        return this.paymentRepository.createPayment(data);
    }

    async getPayments(criteria, sort, external_reference) {
        return this.paymentRepository.getPayments(criteria, sort, external_reference);
    }
}

module.exports = PaymentUseCase;

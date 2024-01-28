const mercadoPagoApi = require('../infra/apis/mercadoPagoApi');

class PaymentRepository {
    async createPayment(data) {
        try {
            return await mercadoPagoApi.processPayment(data);
        } catch (error) {
            console.log('Error in PaymentRepository:', error);
            throw error; // Rethrow Mercado Pago API errors
        }
    }

    async getPayments(criteria, sort, external_reference) {
        try {
            return await mercadoPagoApi.getPayments(criteria, sort, external_reference);
        } catch (error) {
            console.log('Error in PaymentRepository:', error);
            throw error; // Rethrow Mercado Pago API errors
        }
    }
}

module.exports = PaymentRepository;

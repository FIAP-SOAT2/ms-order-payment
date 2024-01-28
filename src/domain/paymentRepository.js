// domain/paymentRepository.js
const mercadoPagoApi = require('../infra/apis/mercadoPagoApi');

class PaymentRepository {
    async createPayment(data) {
        try {
            await mercadoPagoApi.processPayment(data);
            console.log('Chamada à API do Mercado Pago para criar pagamento:', data);
            return true; //adpatar o code
        } catch (error) {
            console.log(error);
        }

    }

    async getPayments() {
        let payments;
        try {
            payments = await mercadoPagoApi.getPayment();
        } catch (error) {
            console.log(error);
        }
        // Implementação real para obter pagamentos usando a API do Mercado Pago
        console.log('Chamada à API do Mercado Pago para obter pagamentos');
        return payments;
    }
}

module.exports = PaymentRepository;

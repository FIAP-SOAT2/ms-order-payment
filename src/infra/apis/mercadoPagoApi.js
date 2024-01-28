const {MercadoPagoConfig, Payment} = require('mercadopago');

class MercadoPagoApi {

    constructor() {
        if (!this.client) {
            this.client = new MercadoPagoConfig({
                accessToken: process.env.ACCESS_TOKEN
            });
        }

        if (!this.payment) {
            this.payment = new Payment(this.client);
        }
    }

    async processPayment(paymentInfo) {
        try {
            const paymentResult = await this.payment.create({
                body: {
                    transaction_amount: +paymentInfo.transaction_amount,
                    description: paymentInfo.description,
                    payment_method_id: paymentInfo.payment_method_id,
                    payer: {
                        email: paymentInfo.payer.email
                    },
                }
            });
            return paymentResult;
        } catch (error) {
            console.error('Error in Mercado Pago API:', error);
            throw error; // Rethrow Mercado Pago API errors 400, 403, 404
        }
    }

    async getPayments(criteria = 'desc', sort = 'date_created', external_reference = null) {
        try {

            const paymentResult = await this.payment.search({
                options: {
                    criteria: criteria,
                    sort: sort,
                    external_reference: external_reference
                }
            });

            return paymentResult;

        } catch (error) {
            console.error('Error in Mercado Pago API:', error);
            throw error; // Rethrow Mercado Pago API errors 400, 403, 404
        }
    }
}

module.exports = new MercadoPagoApi();

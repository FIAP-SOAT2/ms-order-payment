const {MercadoPagoConfig, Payment} = require('mercadopago');
const {publish} = require('../../infra/aws/sns-publisher');

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
            const {payment, paymentValue, paymentDescription} = paymentInfo;
            const paymentResult = await this.payment.create({
                body: {
                    transaction_amount: paymentValue,
                    description: paymentDescription,
                    payment_method_id: 'pix',
                    payer: {
                        email: 'identifier@mail.com'
                    },
                }
            });
            publish(JSON.stringify(paymentResult));
            return paymentResult;
        } catch (error) {
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
            throw error; // Rethrow Mercado Pago API errors 400, 403, 404
        }
    }
}

module.exports = new MercadoPagoApi();

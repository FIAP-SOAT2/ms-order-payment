// infra/mercadoPagoApi.js
const {MercadoPagoConfig, Payment} = require('mercadopago');

class MercadoPagoApi {

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: process.env.ACCESS_TOKEN
        });

        this.payment = new Payment(this.client);
    }

    async processPayment(paymentInfo) {
        try {
            const paymentResult = await this.payment.create({
                body: {
                    transaction_amount: +paymentInfo.transaction_amount,
                    description: paymentInfo.description,
                    payment_method_id: paymentInfo.payment_method_id,
                    payer: {
                        email: paymentInfo.email,
                    }
                }
            });

            return paymentResult;
        } catch (error) {
            console.error(error);
        }
    }

    async getPayment() {
        try {
            const paymentResult = await this.payment.search({
                options: {
                    criteria: 'desc',
                    sort: 'date_created',
                    external_reference: 'ID_REF'
                }
            });

            return paymentResult;

        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = new MercadoPagoApi();

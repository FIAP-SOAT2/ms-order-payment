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
            if(paymentInfo.payment !== 'pix'){
                await validatePayment(paymentInfo);
            }
            const {orderId,userMail,payment, paymentValue, paymentDescription} = paymentInfo;
            const paymentResult = await this.payment.create({
                body: {
                    transaction_amount: paymentValue,
                    description: paymentDescription,
                    payment_method_id: payment,
                    external_reference: orderId,
                    payer: {
                        email: userMail
                    },
                }
            });
            const paymentStatus = {
                id: paymentResult.id,
                status: true,
                orderId: paymentResult.external_reference,
            }
            publish(JSON.stringify(paymentStatus));
            return paymentResult;
        } catch (error) {
            throw error;
        }
    }

    async validatePayment(paymentInfo) {
        const paymentStatus = {
            id: 9999999,
            status: false,
            orderId: paymentResult.external_reference,
        }
        publish(JSON.stringify(paymentStatus));
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
            throw error;
        }
    }
}

module.exports = new MercadoPagoApi();

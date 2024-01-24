const {MercadoPagoConfig, Payment} = require('mercadopago');
require('dotenv').config()


const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN
});

const payment = new Payment(client);

module.exports = payment;

const MercadoPagoApi = require('../../../data-access/payment/apis/mercadoPagoApi');

let payments = module.exports = {};

payments.create = (req, res, next) => {
    // Crie uma instância da classe MercadoPagoApi
    // Chame o método processPayment na instância criada
    MercadoPagoApi.processPayment(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(next);
};


payments.get = (req, res, next) => {
    // Crie uma instância da classe MercadoPagoApi

    // Chame o método processPayment na instância criada
    MercadoPagoApi.getPayment(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(next);
};

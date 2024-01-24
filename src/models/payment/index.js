let buildMakePayment = require('./payment')
let paymentSchema = require('./payment-schema')
let paymentValidator = require('../validator/')(paymentSchema)

let makePayment = buildMakePayment(paymentValidator)

module.exports = makePayment

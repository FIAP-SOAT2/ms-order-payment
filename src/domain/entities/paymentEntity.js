class Payment {
    constructor(transaction_amount, description, payment_method_id, payer) {
        this.transaction_amount = transaction_amount,
        this.description = description,
        this.payment_method_id = payment_method_id,
        this.payer = payer
    }
}

module.exports = Payment;

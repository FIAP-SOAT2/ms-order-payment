let buildMakePayment = function (paymentValidator) {
    return ({
                transaction_amount,
                description,
                payment_method_id,
                payer
            } = {}) => {

        let {error} = paymentValidator({
            transaction_amount,
            description,
            payment_method_id,
            payer
        })

        if (error) throw new Error(error)

        return {
            getTransactionAmount: () => transaction_amount,
            getDescription: () => description,
            getPaymentMethodId: () => payment_method_id,
            getPayer: () => payer
        }
    }
}

module.exports = buildMakePayment

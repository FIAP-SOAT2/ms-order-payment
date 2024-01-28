const HttpStatus = require('http-status-codes');

const GeneralErrors = {
    BAD_REQUEST: {
        code: HttpStatus.BAD_REQUEST,
        description: 'invalid payload'
    },
    NOT_FOUND: {
        code: HttpStatus.NOT_FOUND,
        description: 'not found'
    },
    INVALID_TRANSACTION_AMOUNT: {
        code: HttpStatus.BAD_REQUEST,
        description: 'transaction_amount must be a number'
    },
    INVALID_DESCRIPTION: {
        code: HttpStatus.BAD_REQUEST,
        description: 'description must be a string'
    },
    INVALID_PAYMENT_METHOD_ID: {
        code: HttpStatus.BAD_REQUEST,
        description: 'payment_method_id must be a string'
    },
    INVALID_PAYER: {
        code: HttpStatus.BAD_REQUEST,
        description: 'payer must be an object'
    },
    INVALID_CRITERIA: {
        code: HttpStatus.BAD_REQUEST,
        description: 'criteria must be a string'
    },
    INVALID_SORT: {
        code: HttpStatus.BAD_REQUEST,
        description: 'sort must be a string'
    },
    INVALID_EXTERNAL_REFERENCE: {
        code: HttpStatus.BAD_REQUEST,
        description: 'external_reference must be a string'
    },
    MISSING_TRANSACTION_AMOUNT: {
        code: HttpStatus.BAD_REQUEST,
        description: 'transsaction_amout is required'
    },
    MISSING_DESCRIPTION: {
        code: HttpStatus.BAD_REQUEST,
        description: 'description is required'
    },
    PAYMENT_MISSING_METHOD_ID: {
        code: HttpStatus.BAD_REQUEST,
        description: 'payment_method_id is required'
    },
    MISSING_PAYER: {
        code: HttpStatus.BAD_REQUEST,
        description: 'payer is required'
    },
    INTERNAL_SERVER_ERROR: {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'internal server code'
    }
};

module.exports = GeneralErrors;

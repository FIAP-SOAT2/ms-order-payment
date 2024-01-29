const processPaymentSchema = require('./paymentProcessSchema');
const GeneralErrors = require('../../../infra/http/generalErrors');

describe('processPaymentSchema', () => {
    test('should validate correctly for valid data', () => {
        const validData = {
            transaction_amount: 12.34,
            description: 'Valid description',
            payment_method_id: 'valid_payment_method',
            payer: { email: 'test@test.com' }
        };

        const validationResult = processPaymentSchema.validate(validData);
        expect(validationResult.error).toBeFalsy();
    });

    test('should return validation errors for invalid data', () => {
        const invalidData = {
            transaction_amount: 'invalid',
            description: 123,
            payment_method_id: null,
            payer: 'not_an_object',
        };

        const validationResult = processPaymentSchema.validate(invalidData, { abortEarly: false });
        expect(validationResult.error).toBeTruthy();

        const expectedErrors = [
            GeneralErrors.INVALID_TRANSACTION_AMOUNT.description,
            GeneralErrors.INVALID_DESCRIPTION.description,
            GeneralErrors.INVALID_PAYMENT_METHOD_ID.description,
            GeneralErrors.INVALID_PAYER.description,
        ];

        const actualErrors = validationResult.error.details.map(el => el.message);

        expect(actualErrors).toEqual(expect.arrayContaining(expectedErrors));
        expect(actualErrors.length).toEqual(expectedErrors.length);
    });

    test('should return specific validation errors for missing required fields', () => {
        const missingData = {
            // Omit one required field intentionally
            transaction_amount: 12.34,
            description: 'Valid description',
            payment_method_id: 'valid_payment_method',
        };

        const validationResult = processPaymentSchema.validate(missingData, { abortEarly: false });
        expect(validationResult.error).toBeTruthy();
        const expectedErrors = [
            GeneralErrors.MISSING_PAYER.description,
        ];
        expect(validationResult.error.details.map(el => el.message)).toEqual(expect.arrayContaining(expectedErrors));
    });
});

const findPaymentSchema = require("./findPaymentSchema");
const GeneralErrors = require("../../../infra/http/generalErrors");

describe('findPaymentSchema', () => {
    test('should pass valid input', () => {
        const validInput = {
            criteria: 'desc',
            sort: 'date_created',
            external_reference: 'test'
        };

        const result = findPaymentSchema.validate(validInput);
        expect(result.error).toBeUndefined();
    });

    test('should fail on invalid criteria', () => {
        const invalidInput = {
            criteria: 'invalid',
            sort: 'date_created',
            external_reference: 'test'
        };

        const result = findPaymentSchema.validate(invalidInput);
        expect(result.error.details[0].message).toBe(GeneralErrors.INVALID_CRITERIA.description);
    });

    test('should fail on invalid sort', () => {
        const invalidInput = {
            criteria: 'desc',
            sort: 'invalid',
            external_reference: 'test'
        };

        const result = findPaymentSchema.validate(invalidInput);
        expect(result.error.details[0].message).toBe(GeneralErrors.INVALID_SORT.description);
    });

    test('should fail on invalid external_reference', () => {
        const invalidInput = {
            criteria: 'desc',
            sort: 'date_created',
            external_reference: 123
        };

        const result = findPaymentSchema.validate(invalidInput);
        expect(result.error.details[0].message).toBe(GeneralErrors.INVALID_EXTERNAL_REFERENCE.description);
    });
});

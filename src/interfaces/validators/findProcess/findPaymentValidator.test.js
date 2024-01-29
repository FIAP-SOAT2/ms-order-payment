const GeneralErrors = require('../../../infra/http/generalErrors');
const FindPaymentValidator = require('./findPaymentValidator');

describe('FindPaymentValidator', () => {
    let findPaymentValidator;
    let req;
    let res;
    let next;

    beforeEach(() => {
        findPaymentValidator = new FindPaymentValidator();
        req = { query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('should pass validation with valid input', async () => {
        req.query = {
            criteria: 'desc',
            sort: 'date_created',
            external_reference: 'test'
        };

        await findPaymentValidator.validatePaymentData(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    test('should fail validation on invalid input', async () => {
        req.query = {
            criteria: 'invalid',
            sort: 'date_created',
            external_reference: 'test'
        };

        await findPaymentValidator.validatePaymentData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(GeneralErrors.BAD_REQUEST.code);
        expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
        expect(next).not.toHaveBeenCalled();
    });
});

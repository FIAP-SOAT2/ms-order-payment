const GeneralErrors = require('../../../infra/http/generalErrors');
const PaymentProcessValidator = require('./paymentProcessValidator');

describe('PaymentProcessValidator', () => {
    let paymentProcessValidator;
    let req;
    let res;
    let next;

    beforeEach(() => {
        paymentProcessValidator = new PaymentProcessValidator();
        req = {body: {}};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('should pass validation with valid input', async () => {
        req.body = {
            "transaction_amount": 1,
            "description": "teste",
            "payment_method_id": "teste",
            "payer": {
                "email": "teste@teste.com"
            }
        };

        await paymentProcessValidator.validatePaymentData(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    test('should fail validation on invalid input', async () => {
        req.body = {
            "transaction_amount": "1",
            "description": 0,
            "payment_method_id": null,
            "payer": {
                "email": "invalid"
            }
        };

        await paymentProcessValidator.validatePaymentData(req, res, next);

        expect(res.status).toHaveBeenCalledWith(GeneralErrors.BAD_REQUEST.code);
        expect(res.json).toHaveBeenCalledWith({errors: expect.any(Array)});
        expect(next).not.toHaveBeenCalled();
    });
});

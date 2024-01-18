import express from "express";
import PaymentTypes from "../services/paymentService/paymentTypes";
import PaymentService from "../services/paymentService/paymentService";
import CardProcessor from "../services/paymentService/cardProcessor";
import BadRequestError from "../errors/BadRequestError";
import PaypalProcessor from "../services/paymentService/paypalProcessor";
import IPaymentProcessor from "../services/paymentService/IPaymentProcessor";
import { IsEmail, IsNotEmpty, ValidateIf, ValidationError, validateOrReject } from "class-validator";

interface IPaymentParams {
    email?: string;
    password?: string;
    cardNumber?: number;
}
interface IBody extends IPaymentParams {
    paymentType: PaymentTypes;
    cost: number;
    deliveryCost: number;
    includeDelivery: boolean;
};

export default class PaymentController {
    static getPaymentTypes(req: express.Request, res: express.Response) {
        const paymentTypes = Object.values(PaymentTypes);

        res.send({
            paymentTypes
        });
    }

    static async makePayment(req: express.Request, res: express.Response): Promise<void> {
        const body: IBody = req.body;

        const paymentInput = await validateMakePaymentInputs(body);
        const paymentService = new PaymentService(paymentInput.cost, paymentInput.deliveryCost, paymentInput.includeDelivery);

        const paymentProcessor: IPaymentProcessor = getProcessor(body.paymentType, body);
        paymentService.setProcessor(paymentProcessor);

        paymentService.processOrder();
        res.status(200).send();

    }
}

class PaymentInput {

    @IsNotEmpty()
    paymentType!: PaymentTypes;
    @IsNotEmpty()
    cost!: number;
    @IsNotEmpty()
    deliveryCost!: number;
    @IsNotEmpty()
    includeDelivery!: boolean;
    @ValidateIf(o => o.paymentType === PaymentTypes.Paypal)
    @IsEmail()
    email!: string;
    @ValidateIf(o => o.paymentType === PaymentTypes.Paypal)
    @IsNotEmpty()
    password!: string;
    @ValidateIf(o => o.paymentType === PaymentTypes.Card)
    @IsNotEmpty()
    cardNumber!: number;



}

async function validateMakePaymentInputs(body: Record<string, any>): Promise<PaymentInput> {
    const paymentInput = new PaymentInput();
    paymentInput.paymentType = body.paymentType;
    paymentInput.cost = body.cost;
    paymentInput.deliveryCost = body.deliveryCost;
    paymentInput.includeDelivery = body.includeDelivery;
    paymentInput.email = body.email;
    paymentInput.password = body.password;
    paymentInput.cardNumber = body.cardNumber;
    try {
        await validateOrReject(paymentInput);

    } catch (err) {

        throw new BadRequestError(Object.values((err as ValidationError[])[0].constraints!)[0]);
    }

    return paymentInput;


}
function getProcessor(paymentType: PaymentTypes, params: IPaymentParams): IPaymentProcessor {

    switch (paymentType) {
        case PaymentTypes.Card: {
            return new CardProcessor(params.cardNumber);
        }
        case PaymentTypes.Paypal: {
            return new PaypalProcessor(params.email, params.password);
        }
        default: throw new BadRequestError("Invalid Payment Type");
    }
}


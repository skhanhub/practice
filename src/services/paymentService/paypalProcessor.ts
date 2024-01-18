import createLogger from "../logger/createLogger";
import IPaymentProcessor from "./IPaymentProcessor";

const logger = createLogger();

export default class PaypalProcessor implements IPaymentProcessor {

    private email?: string;
    private password?: string;

    constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }

    collectPaymentDetails(): void {
        logger.info(`Collecting details for account with email ${this.email}`);
    }

    validatePaymentDetails(): boolean {
        logger.info("Validating payment details car of the account");
        return true;
    }

    pay(cost: number): void {
        logger.info(`Making payment of ${cost} using paypal with email ${this.email}`);
    }

}
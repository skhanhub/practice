import createLogger from "../logger/createLogger";
import IPaymentProcessor from "./IPaymentProcessor";

const logger = createLogger();

export default class CardProcessor implements IPaymentProcessor {

    private cardNumber?: number;

    constructor(cardNumber?: number) {
        this.cardNumber = cardNumber;
    }

    collectPaymentDetails(): void {
        logger.info(`Collecting details for card number ${this.cardNumber}`);
    }

    validatePaymentDetails(): boolean {
        logger.info("Validating payment details car of the card");
        return true;
    }

    pay(cost: number): void {
        logger.info(`Making payment of ${cost} using card ${this.cardNumber}`);
    }

}
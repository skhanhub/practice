import IPaymentProcessor from "./IPaymentProcessor";

interface IPaymentSercice {
    processOrder(): boolean;
    setProcessor(processor: IPaymentProcessor): void;
}

export default class PaymentService implements IPaymentSercice {
    private cost: number;
    private deliveryCost: number;
    private includeDelivery: boolean;
    private paymentProcessor!: IPaymentProcessor;

    constructor(cost: number, deliveryCost: number, includeDelivery: boolean) {
        this.cost = cost;
        this.deliveryCost = deliveryCost;
        this.includeDelivery = includeDelivery;
    }

    setProcessor(processor: IPaymentProcessor): void {
        this.paymentProcessor = processor;
    }

    processOrder(): boolean {
        this.paymentProcessor.collectPaymentDetails();
        if (!this.paymentProcessor.validatePaymentDetails())
            return false;

        const totalCost = this.getTotal();
        this.paymentProcessor.pay(totalCost);
        return true;
    }

    private getTotal() {
        return this.includeDelivery ? this.cost + this.deliveryCost : this.cost;
    }

}
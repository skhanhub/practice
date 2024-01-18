export default interface IPaymentProcessor {
    collectPaymentDetails(): void;
    validatePaymentDetails(): boolean;
    pay(cost: number): void;
}
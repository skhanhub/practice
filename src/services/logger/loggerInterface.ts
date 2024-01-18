export default interface ILoger {
    info(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    error(error: unknown): void;
}
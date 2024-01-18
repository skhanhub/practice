import ILoger from "./loggerInterface";

export default class devLogger implements ILoger {
    info(message: string): void {
        console.log(message);
    }
    warn(message: string): void {
        console.warn(message);
    }
    debug(message: string): void {
        console.debug(message);
    }
    error(error: unknown): void {
        console.error(error);
    }

}
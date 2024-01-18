
interface IAPIError {
    statusCode: number;
}

export default class APIError extends Error implements IAPIError {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
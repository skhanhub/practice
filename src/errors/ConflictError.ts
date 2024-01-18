import { StatusCodes } from "http-status-codes";
import APIError from "./APIError";

export default class ConflictError extends APIError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT);
    }
}
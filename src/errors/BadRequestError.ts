import { StatusCodes } from "http-status-codes";
import APIError from "./APIError";

export default class BadRequestError extends APIError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}
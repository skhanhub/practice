import express from "express";
import APIError from "../errors/APIError";
import createLogger from "../services/logger/createLogger";

export default async (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

    const logger = createLogger();
    logger.error(err);

    if (err instanceof APIError) {
        return res.status(err.statusCode).send({ msg: err.message });
    }
    res.status(500).json({ msg: 'Something went wrong, please try again' });

};

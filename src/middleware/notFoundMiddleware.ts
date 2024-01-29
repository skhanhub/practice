import express from "express";
import { StatusCodes } from "http-status-codes";
export default (req: express.Request, res: express.Response) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist');

import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ICreateWorkerFindPrimeNumber } from "../worker/findPrimeNumber/createWorkerFindPrimeNumber";

export default class PrimeController {
    createWorker: ICreateWorkerFindPrimeNumber
    threadCount: number

    constructor(createWorker: ICreateWorkerFindPrimeNumber, threadCount: number) {
        this.createWorker = createWorker
        this.threadCount = threadCount
    }

    setThreadCount(threadCount: number) {
        this.threadCount = threadCount
    }

    async get(req: Request, res: Response) {
        try {

            const query = req.query as unknown as { min: string, max: string }
            const min = parseInt(query.min)
            const max = parseInt(query.max)

            const range = Math.floor((max - min) / this.threadCount);
            let start = min;
            const workers = []
            for (let i = 0; i < this.threadCount; i++) {
                workers.push(this.createWorker.create({ start, range }));
                start = start + range + 1;
            }

            const thread_results = await Promise.all(workers);
            res.json({
                "primes": thread_results.flat()
            })
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST))
        }

    }
}
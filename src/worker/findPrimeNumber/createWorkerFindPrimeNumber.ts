import { Worker } from 'worker_threads'
import path from 'path';

export interface ICreateWorkerFindPrimeNumber {
    create(workerData: Record<string, number>): Promise<number[]>
}
export default class CreateWorkerFindPrimeNumber implements ICreateWorkerFindPrimeNumber {
    constructor() {

    }
    create(workerData: Record<string, number>): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(path.join(__dirname, './findPrimeNumber.worker'), { workerData })

            worker.on("message", (data) => {
                resolve(data);
            });
            worker.on("error", (msg) => {
                reject(`An error ocurred: ${msg}`);
            });
            worker.on('exit', () => {

                console.log("thread ended");

            });
        })
    }
}

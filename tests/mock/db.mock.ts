import { IDB } from "../../src/db/db";

interface IMockDB {

}

export default class DB implements IDB {

    db: IMockDB;

    constructor() {
        this.db = {};
    }

    async initDB(): Promise<void> {

        await Promise.resolve(true);
    }

}
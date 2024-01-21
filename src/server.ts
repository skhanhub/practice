import express from "express";
import morganLogger from "morgan";
import "express-async-errors";
import routes from "./routes/root";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import notFoundMiddleware from "./middleware/notFoundMiddleware";
import createLogger from "./services/logger/createLogger";
import DB, { IDB } from "./db/db";


const initServer = async (db: IDB) => {
    const app = express();

    app.use(morganLogger("combined"));

    app.use(express.json());

    app.use(express.urlencoded({
        extended: false
    }));

    app.use(routes);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    const logger = createLogger();

    await db.initDB();
    logger.info("connected to db");

    return app;
};


export const startServer = async (port: string) => {
    const logger = createLogger();
    try {

        const db = new DB();

        const app = await initServer(db);

        await app.listen(port);


        logger.info(`listening on port ${port}`);

    } catch (err) {
        logger.error(err);
    }
};

// Export the server for unit testing
export default initServer



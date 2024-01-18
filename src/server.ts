import express from "express";
import morganLogger from "morgan";
import "express-async-errors";
import routes from "./routes/root";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import notFoundMiddleware from "./middleware/notFoundMiddleware";
import createLogger from "./services/logger/createLogger";
import DB from "./db/db";


const initServer = async () => {
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
    const db = DB.getInstance();
    await db.authenticate();
    logger.info("connected to db");

    return app;
};


export const startServer = async (port: string) => {
    const logger = createLogger();
    try {

        const app = await initServer();

        await app.listen(port);


        logger.info(`listening on port ${port}`);

    } catch (err) {
        logger.error(err);
    }
};

// Export the server for unit testing
export default initServer



import express from "express";
import morganLogger from "morgan";
import "express-async-errors";
import getRouter, { Controllers } from "./routes/getRoutes";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import notFoundMiddleware from "./middleware/notFoundMiddleware";
import createLogger from "./services/logger/createLogger";
import DB, { IDB } from "./db/db";
import ProductRepository from "./services/repositories/productRepository";
import ProductModel from "./db/models/product.model";
import ProductsOptionRepository from "./services/repositories/productOptionRepository";
import ProductOptionModel from "./db/models/productOption.model";
import ProductController from "./controllers/productController";
import ProductOptionController from "./controllers/productOptionController";
import PaymentController from "./controllers/paymentController";
import PrimeController from "./controllers/primeController";
import CreateWorkerFindPrimeNumber from "./worker/findPrimeNumber/createWorkerFindPrimeNumber";
import getAPIClient from "./services/apiClient/getAPIClient";
import TodoController from "./controllers/todoController";


const initServer = async (db: IDB, controllers: Controllers): Promise<express.Express> => {

    const logger = createLogger();

    await db.initDB();
    logger.info("connected to db");

    const app = express();

    app.use(morganLogger("combined"));

    app.use(express.json());

    app.use(express.urlencoded({
        extended: false
    }));

    const router = getRouter(controllers)
    app.use(router);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
};


export const startServer = async (port: string) => {
    const logger = createLogger();
    try {
        const db = new DB();

        const productRepository = new ProductRepository(ProductModel)
        const productOptionRepository = new ProductsOptionRepository(ProductOptionModel)

        const createWorker = new CreateWorkerFindPrimeNumber()
        const apiClient = getAPIClient("https://jsonplaceholder.typicode.com")

        const paymentController = new PaymentController()
        const productController = new ProductController(productRepository)
        const productOptionController = new ProductOptionController(productOptionRepository)
        const primeController = new PrimeController(createWorker, 3)
        const todoController = new TodoController(apiClient)

        const app = await initServer(db, {
            paymentController,
            productController,
            productOptionController,
            primeController,
            todoController
        });

        await app.listen(port);

        logger.info(`listening on port ${port}`);

    } catch (err) {
        logger.error(err);
    }
};

// Export the server for unit testing
export default initServer



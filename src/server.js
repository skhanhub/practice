import express from "express";
import logger from "morgan";
import "express-async-errors"
import routes from "../routes/root.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";


const initServer = async () => {
    const app = express()

    app.use(logger("combined"))

    app.use(express.json())

    app.use(express.urlencoded({
        extended: false
    }))

    app.use(routes)

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app
}


export const startServer = async (port) => {
    const app = await initServer()

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}

// Export the server for unit testing
export default initServer



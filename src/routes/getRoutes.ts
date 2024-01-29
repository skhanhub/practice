import express from "express";
import ProductController from "../controllers/productController";
import ProductOptionController from "../controllers/productOptionController";
import getProductRouter from "./product/productRoutes";
import PaymentController from "../controllers/paymentController";
import getPaymentRouter from "./payment/paymentRoutes";
import getPrimeRouter from "./prime/primeRoutes";
import PrimeController from "../controllers/primeController";
import TodoController from "../controllers/todoController";
import getTodoRouter from "./todo/todoRoutes";

export type Controllers = {
    productController: ProductController,
    productOptionController: ProductOptionController,
    paymentController: PaymentController,
    primeController: PrimeController,
    todoController: TodoController
}


const getRouter = (controllers: Controllers) => {
    const router = express.Router();


    router.use("/v1/payment", getPaymentRouter(controllers.paymentController));
    router.use("/v1/product", getProductRouter(controllers.productController, controllers.productOptionController));
    router.use("/v1/prime", getPrimeRouter(controllers.primeController));
    router.use("/v1/todo", getTodoRouter(controllers.todoController));
    // router.route("/").get(baseController);

    return router
}
export default getRouter;






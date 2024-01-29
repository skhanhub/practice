import express, { Router } from "express";
import PaymentController from "../../controllers/paymentController";


const getPaymentRouter = (paymentController: PaymentController): Router => {
    const router = express.Router();

    router.route("/").post((req, res) => paymentController.makePayment(req, res));
    router.route("/").get((req, res) => paymentController.getPaymentTypes(req, res));

    return router
}



export default getPaymentRouter;
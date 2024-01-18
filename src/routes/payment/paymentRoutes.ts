import express from "express";
import PaymentController from "../../controllers/paymentController";


const router = express.Router();

router.route("/").post(PaymentController.makePayment);
router.route("/").get(PaymentController.getPaymentTypes);

export default router;
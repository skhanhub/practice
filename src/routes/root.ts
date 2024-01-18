import express from "express";
import paymentRoutes from "./payment/paymentRoutes";
import productRoutes from "./product/productRoutes";


const router = express.Router();


router.use("/payment", paymentRoutes);
router.use("/product", productRoutes);
// router.route("/").get(baseController);

export default router;
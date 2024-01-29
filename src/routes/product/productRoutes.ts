import express, { Router } from "express";
import ProductOptionController from "../../controllers/productOptionController";
import ProductController from "../../controllers/productController";

const getProductRouter = (productController: ProductController, productOptionController: ProductOptionController): Router => {
    const router = express.Router();

    router.route("/").post((req, res) => productController.create(req, res));
    router.route("/").get((req, res) => productController.getAll(req, res));
    router.route("/:productId").get((req, res) => productController.getById(req, res));
    router.route("/:productId")
        .put(productController.update);

    router.route("/:productId")
        .delete(productController.delete);


    router.route("/:productId/option/")
        .get(productOptionController.getAllOptions);

    router.route("/:productId/option/:optionId")
        .get(productOptionController.getOptionById);

    router.route("/:productId/option/")
        .post(productOptionController.create);

    router.route("/:productId/option/:optionId")
        .put(productOptionController.update);

    router.route("/:productId/option/:optionId")
        .delete(productOptionController.delete);

    return router
}
export default getProductRouter;
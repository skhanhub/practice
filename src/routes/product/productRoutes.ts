import express from "express";
import ProductOptionController from "../../controllers/productOptionController";
import ProductController from "../../controllers/productController";


const router = express.Router();

router.route("/").post(ProductController.create);
router.route("/").get(ProductController.getAll);
router.route("/:productId").get(ProductController.getById);
router.route("/:productId")
    .put(ProductController.update);

router.route("/:productId")
    .delete(ProductController.delete);


router.route("/:productId/option/")
    .get(ProductOptionController.getAllOptions);

router.route("/:productId/option/:optionId")
    .get(ProductOptionController.getOptionById);

router.route("/:productId/option/")
    .post(ProductOptionController.create);

router.route("/:productId/option/:optionId")
    .put(ProductOptionController.update);

router.route("/:productId/option/:optionId")
    .delete(ProductOptionController.delete);


export default router;
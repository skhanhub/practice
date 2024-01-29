import express, { Router } from "express";
import PrimeController from "../../controllers/primeController";


const getPrimeRouter = (primeController: PrimeController): Router => {
    const router = express.Router();

    router.route("/").get((req, res) => primeController.get(req, res));

    return router
}



export default getPrimeRouter;
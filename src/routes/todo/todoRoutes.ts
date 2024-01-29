import express, { Router } from "express";
import TodoController from "../../controllers/todoController";


const getTodoRouter = (todoController: TodoController): Router => {
    const router = express.Router();

    router.route("/").get((req, res) => todoController.get(req, res));
    router.route("/").post((req, res) => todoController.create(req, res));

    return router
}



export default getTodoRouter;
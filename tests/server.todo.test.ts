import request from "supertest";
import { App } from "supertest/types";
import DB from "./mock/db.mock";
import ProductRepository from "../src/services/repositories/productRepository";
import ProductsOptionRepository from "../src/services/repositories/productOptionRepository";
import CreateWorkerFindPrimeNumber from "../src/worker/findPrimeNumber/createWorkerFindPrimeNumber";
import getAPIClient from "../src/services/apiClient/getAPIClient";
import PaymentController from "../src/controllers/paymentController";
import ProductController from "../src/controllers/productController";
import ProductOptionController from "../src/controllers/productOptionController";
import PrimeController from "../src/controllers/primeController";
import TodoController from "../src/controllers/todoController";
import initServer from "../src/server";

const axiosGetMock = jest.fn();
// jest.mock("axios", () => {
//     return {
//         get: (args: any) => axiosGetMock(args)
//     };
// });

describe("test product routes", () => {
    let app: App;

    beforeEach(async () => {
        jest.clearAllMocks();
        const db = new DB();
        const mockApiClient = {
            get: axiosGetMock
        }
        axiosGetMock.mockResolvedValue({
            data: [
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                    "userId": 1,
                    "id": 2,
                    "title": "qui est esse",
                    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                }]
        });

        const productRepository = new ProductRepository({} as any);
        const productOptionRepository = new ProductsOptionRepository({} as any);

        const createWorker = new CreateWorkerFindPrimeNumber();

        const paymentController = new PaymentController();
        const productController = new ProductController(productRepository);
        const productOptionController = new ProductOptionController(productOptionRepository);
        const primeController = new PrimeController(createWorker, 3);
        const todoController = new TodoController(mockApiClient as any);

        app = await initServer(db, {
            paymentController,
            productController,
            productOptionController,
            primeController,
            todoController
        });


    });

    it("test GET method", async () => {

        const response: any = await request(app).get("/v1/todo");

        expect(response.statusCode).toBe(200);
        expect(response.body.todos.length).toBe(2);
    });

});
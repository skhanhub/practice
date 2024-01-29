import request from "supertest";
import initServer from "../src/server";
import DB from "./mock/db.mock";
import { createMock, findAllMock, products } from "./mock/dbModel.mock";
import { App } from "supertest/types";
import { ValidationError, ValidationErrorItem } from "sequelize";
import PaymentController from "../src/controllers/paymentController";
import ProductController from "../src/controllers/productController";
import ProductOptionController from "../src/controllers/productOptionController";
import ProductsOptionRepository from "../src/services/repositories/productOptionRepository";
import ProductRepository from "../src/services/repositories/productRepository";
import CreateWorkerFindPrimeNumber from "../src/worker/findPrimeNumber/createWorkerFindPrimeNumber";
import PrimeController from "../src/controllers/primeController";

// jest.mock('../src/models/product.model',
//     () => {
//         return {
//             findAll: (arg: any) => findAllMock(arg),
//             create: (arg: any) => createMock(arg)
//         };
//     });

describe("test product routes", () => {
    let app: App;
    const id = "261d2632-0a82-44fc-b577-67ec013560a2";

    const reqBody = {
        id: "261d2632-0a82-44fc-b577-67ec013560a1",
        name: "Pen",
        description: "Very good",
        price: 10,
        deliveryPrice: 5
    };
    createMock.mockImplementation((input) => {
        return Promise.resolve({
            id,
            ...input
        });
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        const db = new DB();
        const productModelMock = {
            findAll: findAllMock,
            create: createMock
        }

        const productOptionModelMock = {
            findAll: findAllMock,
            create: createMock
        }
        const productRepository = new ProductRepository(productModelMock as any)
        const productOptionRepository = new ProductsOptionRepository(productOptionModelMock as any)

        const createWorker = new CreateWorkerFindPrimeNumber()

        const paymentController = new PaymentController()
        const productController = new ProductController(productRepository)
        const productOptionController = new ProductOptionController(productOptionRepository)
        const primeController = new PrimeController(createWorker, 3)

        app = await initServer(db, {
            paymentController,
            productController,
            productOptionController,
            primeController
        });


    });

    it("test GET method", async () => {

        const response = await request(app).get("/v1/product");

        expect(response.statusCode).toBe(200);
        expect(response.body.products.length).toBe(products.length);
    });

    it("test POST method with valid input", async () => {


        const response = await request(app)
            .post("/v1/product").send(reqBody);

        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("created");
        expect(response.header.location).toBe(`/v1/product/${reqBody.id}`);
    });


    it("test POST method with valid input and without Id", async () => {


        const reqBody = {
            name: "Pen",
            description: "Very good",
            price: 10,
            deliveryPrice: 5
        };
        const response = await request(app)
            .post("/v1/product").send(reqBody);

        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("created");
        expect(response.header.location).toBe(`/v1/product/${id}`);
    });

    it("test POST method with Id conflict", async () => {


        createMock.mockRejectedValueOnce(new ValidationError("", [{ validatorKey: "not_unique", message: "ID not unique" } as ValidationErrorItem]));
        const response = await request(app)
            .post("/v1/product").send(reqBody);

        expect(response.statusCode).toBe(409);
        expect(response.body.msg).toBe("ID not unique");

    });
});
import { createMock, findAllMock, products } from "../../mock/dbModel.mock";
import ProductRepository from "../../../src/services/repositories/productRepository";
import { ForeignKeyConstraintError, ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import ConflictError from "../../../src/errors/ConflictError";
import BadRequestError from "../../../src/errors/BadRequestError";

describe("test BaseRepository Class", () => {

    let productModel: any


    beforeEach(() => {
        productModel = {
            findAll: findAllMock,
            create: createMock
        }
        jest.clearAllMocks();
    });
    it("should return an array of record", async () => {
        const productRepository = new ProductRepository(productModel);

        const actual = await productRepository.Get();

        expect(actual).toEqual(products);
        expect(actual.length).toBe(products.length);
    });

    it("should create a new record", async () => {
        createMock.mockResolvedValueOnce(products[0]);
        const productRepository = new ProductRepository(productModel);

        const actual = await productRepository.Create(products[0]);

        expect(actual).toEqual(products[0]);
        expect(actual.id).toBe(products[0].id);
    });

    it("should throw ConflictError", async () => {
        createMock.mockRejectedValueOnce(new ValidationError("", [{ validatorKey: "not_unique", message: "ID not unique" } as ValidationErrorItem]));
        const productRepository = new ProductRepository(productModel);
        expect.assertions(2);
        try {
            await productRepository.Create(products[0]);
        } catch (error) {
            expect(error).toBeInstanceOf(ConflictError);
            expect(createMock).toHaveBeenCalled();
        }
    });

    it("should throw BadRequestError for ValidationError thats not related to not_unique key", async () => {
        createMock.mockRejectedValueOnce(new ValidationError("", [{ validatorKey: "", message: "Validation failed" } as ValidationErrorItem]));
        const productRepository = new ProductRepository(productModel);
        expect.assertions(2);
        try {
            await productRepository.Create(products[0]);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(createMock).toHaveBeenCalled();
        }
    });

    it("should throw BadRequestError for ForeignKeyConstraintError from the DB model", async () => {
        createMock.mockRejectedValueOnce(new ForeignKeyConstraintError({}));
        const productRepository = new ProductRepository(productModel);
        expect.assertions(2);
        try {
            await productRepository.Create(products[0]);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(createMock).toHaveBeenCalled();
        }
    });

});
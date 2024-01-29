
import { Request, Response } from "express";
import { IProductRepository } from "../services/repositories/productRepository";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import Product from "../domain/product";

class ProductDTO {
    public readonly product: Partial<Product>

    constructor(product: Product) {
        this.product = product
    }

    public static from(product: Product): ProductDTO {
        return new ProductDTO(product)
    }
}
class GetAllProductDTO {
    public readonly products: ProductDTO[]

    constructor(products: Product[]) {
        this.products = products.map(product => new ProductDTO(product))
    }
    public static from(products: Product[]): GetAllProductDTO {
        return new GetAllProductDTO(products)
    }
}
export default class ProductController {
    productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }
    async create(req: Request, res: Response) {

        const product = await this.productRepository.Create(req.body);

        res.location(`${req.originalUrl}/${product.id.toString()}`);
        res.status(StatusCodes.CREATED).json("created");

    }

    async getAll(req: Request, res: Response) {

        let products: Product[] = [];
        if (req.query.name) {
            products = await this.productRepository.FilterProductByName(String(req.query.name));

        }

        products = await this.productRepository.GetWithOptions();

        const response = GetAllProductDTO.from(products)
        res.status(StatusCodes.OK).json(response);

    }

    async getById(req: Request, res: Response) {
        const product = await this.productRepository.GetById(req.params.productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
        }
        const response = ProductDTO.from(product)
        return res.status(StatusCodes.OK).json(response);
    }

    async update(req: Request, res: Response) {
        const productId = req.params.productId;
        const numUpdated = await this.productRepository.Update(productId, req.body);

        const statusCode = numUpdated === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));

    }

    async delete(req: Request, res: Response) {

        const productId = req.params.productId;
        const numDelete = await this.productRepository.DeleteById(productId);

        const statusCode = numDelete === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));

    }
}

import { Request, Response } from "express";
import ProductRepository from "../services/repositories/productRepository";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const productRepository = new ProductRepository();

export default class ProductController {
    static async create(req: Request, res: Response) {

        const product = await productRepository.Create(req.body);

        res.location(`${req.originalUrl}/${product.id.toString()}`);
        res.status(StatusCodes.CREATED).json("created");

    }

    static async getAll(req: Request, res: Response) {

        let products = [];
        if (req.query.name) {
            products = await productRepository.FilterProductByName(String(req.query.name));

        }
        products = await productRepository.GetWithOptions();
        res.status(StatusCodes.OK).json({
            products
        });

    }

    static async getById(req: Request, res: Response) {
        const product = await productRepository.GetById(req.params.productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
        }
        return res.status(StatusCodes.OK).json({ product });
    }

    static async update(req: Request, res: Response) {
        const productId = req.params.productId;
        const numUpdated = await productRepository.Update(productId, req.body);

        const statusCode = numUpdated === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));

    }

    static async delete(req: Request, res: Response) {

        const productId = req.params.productId;
        const numDelete = await productRepository.DeleteById(productId);

        const statusCode = numDelete === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));

    }
}
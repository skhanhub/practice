
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { IProductOptionRepository } from "../services/repositories/productOptionRepository";


export default class ProductOptionController {
    productsOptionRepository: IProductOptionRepository;

    constructor(productsOptionRepository: IProductOptionRepository) {
        this.productsOptionRepository = productsOptionRepository
    }

    async create(req: Request, res: Response) {

        const { productId, optionId } = req.params;
        const newProductOption = {
            id: optionId,
            productId,
            ...req.body
        };

        const option = await this.productsOptionRepository.Create(newProductOption);
        res.location(`${req.originalUrl}/${option.id.toString()}`);
        res.status(StatusCodes.CREATED).json(getReasonPhrase(StatusCodes.CREATED));

    }

    async getAllOptions(req: Request, res: Response) {

        const productId = req.params.productId;
        const productOptions = await this.productsOptionRepository.GetProductOptions(String(productId));

        res.status(StatusCodes.OK).json({
            productOptions
        });

    }

    async getOptionById(req: Request, res: Response) {
        const { productId, optionId } = req.params;
        const product = await this.productsOptionRepository.GetProductOptionById(productId, optionId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
        }
        return res.status(StatusCodes.OK).json({ product });
    }

    async update(req: Request, res: Response) {
        try {
            const { productId, optionId } = req.params;
            const newProductOption = {
                id: optionId,
                productId,
                ...req.body
            };
            const numUpdated = await this.productsOptionRepository.Update(optionId, newProductOption);

            const statusCode = numUpdated === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

            return res.status(statusCode).json(getReasonPhrase(statusCode));
        }
        catch (err) {
            console.log(err);
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY));
        }
    }

    async delete(req: Request, res: Response) {

        const optionId = req.params.optionId;
        const numDelete = await this.productsOptionRepository.DeleteById(optionId);

        const statusCode = numDelete === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));

    }
}
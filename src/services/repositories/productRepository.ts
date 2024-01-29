import { ModelStatic, col, fn, where } from "sequelize";
import BaseRepository, { IBaseRepository } from "./baseRepository";
import ProductOptionModel from "../../db/models/productOption.model";
import Product from "../../domain/product";

export interface IProductRepository extends IBaseRepository<Product> {
    GetById(id: string): Promise<Product>;
    GetWithOptions(): Promise<Product[]>;
    FilterProductByName(name: string): Promise<Product[]>;
}
export default class ProductRepository extends BaseRepository<Product> implements IProductRepository {

    constructor(ProductModel: ModelStatic<any>) {
        super(ProductModel);
    }

    async GetById(id: string): Promise<Product> {
        return await this.DbModel.findOne({
            where: { id },
            include: ProductOptionModel
        });
    }

    async GetWithOptions(): Promise<Product[]> {
        return await this.DbModel.findAll({ include: ProductOptionModel });
    }
    async FilterProductByName(name: string): Promise<Product[]> {
        return await this.DbModel.findAll({
            where: {
                name: where(fn('LOWER', col('Name')), 'LIKE', `%${name}%`)
            },
            include: ProductOptionModel
        });
    }
}
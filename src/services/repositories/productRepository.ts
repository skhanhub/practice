import { col, fn, where } from "sequelize";
import Product from "../../models/product.model";
import BaseRepository from "./baseRepository";
import ProductOption from "../../models/productOption.model";


export default class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async GetById(id: string) {
        return await this.DbModel.findOne({
            where: { id },
            include: ProductOption
        });
    }

    async GetWithOptions() {
        return await this.DbModel.findAll({ include: ProductOption });
    }
    async FilterProductByName(name: string) {
        return await this.DbModel.findAll({
            where: {
                name: where(fn('LOWER', col('Name')), 'LIKE', `%${name}%`)
            },
            include: ProductOption
        });
    }
}
import { ModelStatic } from "sequelize/types/model";
import BaseRepository, { IBaseRepository } from "./baseRepository";
import ProductOption from "../../domain/productOption";

export interface IProductOptionRepository extends IBaseRepository<ProductOption> {
    GetProductOptions(productId: string): Promise<ProductOption[]>;
    GetProductOptionById(productId: string, optionId: string): Promise<ProductOption>;
}

export default class ProductsOptionRepository extends BaseRepository<ProductOption> implements IProductOptionRepository {
    constructor(ProductOptionModel: ModelStatic<any>) {
        super(ProductOptionModel);
    }
    async GetProductOptions(productId: string): Promise<ProductOption[]> {

        return await this.DbModel.findAll({
            where: {
                productId
            }
        });


    }

    async GetProductOptionById(productId: string, optionId: string): Promise<ProductOption> {
        return await this.DbModel.findOne({
            where: {
                productId,
                id: optionId
            }
        });
    }

    // async CreateProductOption(productId: string, newOption: Body) {
    //     // Only requred as table is not using unique id
    //     if (newOption.id) {

    //         const option = await this.GetProductOptionById(productId, newOption.id);
    //         if (option) {
    //             throw new Error(ID_EXISTS);
    //         }
    //     }
    //     return await this.DbModel.create({
    //         productId,
    //         ...newOption
    //     });
    // }


}
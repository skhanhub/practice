import ProductOption from "../../models/productOption.model";
import BaseRepository from "./baseRepository";

export default class ProductsOptionRepository extends BaseRepository {
    constructor() {
        super(ProductOption);
    }
    async GetProductOptions(productId: string) {

        return await this.DbModel.findAll({
            where: {
                productId
            }
        });


    }

    async GetProductOptionById(productId: string, optionId: string) {
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
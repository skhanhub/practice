import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, IsUUID, PrimaryKey, Default, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ProductModel from './product.model';

@Table({
    tableName: "product_options"
})
export default class ProductOptionModel extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(UUIDV4)
    @Column({
        type: DataType.UUIDV4,
        unique: true,
    })
    id!: string;

    @IsUUID(4)
    @ForeignKey(() => ProductModel)
    @Column({
        type: DataType.UUIDV4
    })
    productId!: string;

    @BelongsTo(() => ProductModel)
    product?: ProductModel;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.STRING
    })
    description!: string;
}

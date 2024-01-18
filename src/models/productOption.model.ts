import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, IsUUID, PrimaryKey, Default, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './product.model';

@Table({
    tableName: "product_options"
})
export default class ProductOption extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(UUIDV4)
    @Column({
        type: DataType.UUIDV4,
        unique: true,
    })
    id!: string;

    @IsUUID(4)
    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUIDV4
    })
    productId!: string;

    @BelongsTo(() => Product)
    product?: Product;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.STRING
    })
    description!: string;
}

import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, Default, Unique, BelongsTo, NotNull, DataType } from 'sequelize-typescript';
import ProductOption from './productOption.model';

@Table({
    tableName: "product",
})
export default class Product extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Unique
    @Default(UUIDV4)
    @Column({
        type: DataType.UUIDV4
    })
    id!: string;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.STRING
    })
    description!: string;


    @Column({
        type: DataType.FLOAT
    })
    price!: number;


    @Column({
        type: DataType.FLOAT
    })
    deliveryPrice!: number;

    @HasMany(() => ProductOption, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    })
    productOption?: ProductOption[];
}

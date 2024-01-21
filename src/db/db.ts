import { Sequelize } from 'sequelize-typescript';
import path from "path";
import Product from '../models/product.model';
import ProductOption from '../models/productOption.model';


export interface IDB {
    initDB(): Promise<void>;
}


class DB implements IDB {

    db: Sequelize;

    constructor() {
        this.db = new Sequelize({
            storage: process.env.DB_PATH || path.join(__filename, '../../../Test_Data/products.db'),
            dialect: 'sqlite',
            logging: false,
            define: {
                createdAt: true,
                updatedAt: true,
            },

        });
    }

    async initDB(): Promise<void> {
        this.db.addModels([Product, ProductOption]);
        await this.db.sync({ alter: true });
        await this.db.authenticate();
    }

}
export default DB;
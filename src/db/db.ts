import { Sequelize } from 'sequelize-typescript';
import path from "path";
import Product from '../models/product.model';
import ProductOption from '../models/productOption.model';



class DB {
    private static _instance: Sequelize;

    private constructor() {

    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Sequelize({
            storage: process.env.DB_PATH || path.join(__filename, '../../../Test_Data/products.db'),
            dialect: 'sqlite',
            logging: false,
            define: {
                createdAt: true,
                updatedAt: true,
            },

        });
        this._instance.addModels([Product, ProductOption]);
        this._instance.sync({ alter: true });
        return this._instance;
    }
}

export default DB;
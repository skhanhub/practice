import { IProduct } from "../../src/models/product.model";

export const products: IProduct[] = [{
    id: "261d2632-0a82-44fc-b577-67ec013560a1",
    name: "Pen",
    description: "Very good",
    price: 10,
    deliveryPrice: 5
}, {
    id: "db1ded3d-6136-4e56-8a6d-0c41a98fd36b",
    name: "Glue",
    description: "Very sticky",
    price: 20,
    deliveryPrice: 6
}];

export const createMock = jest.fn();
export const findAllMock = jest.fn();

findAllMock.mockResolvedValue(new Promise((resolve) => resolve(products)));
export default class DbModel {
    static findAll(): Promise<any[]> {
        return findAllMock();
    }

    static create(): any {
        return createMock();
    }
}
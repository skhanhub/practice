import { ModelStatic } from "sequelize";
import DbModel, { products } from "../../mock/dbModel.mock";
import BaseRepository from "../../../src/services/repositories/baseRepository";



describe("test BaseRepository Class", () => {
    it("should return an array of object", async () => {
        const baseRepository = new BaseRepository(DbModel as ModelStatic<any>);

        const actual = await baseRepository.Get();

        expect(actual).toEqual(products);
        expect(actual.length).toBe(products.length);
    });
});
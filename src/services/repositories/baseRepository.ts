import { ForeignKeyConstraintError, ModelStatic, ValidationError } from "sequelize";
import BadRequestError from "../../errors/BadRequestError";
import ConflictError from "../../errors/ConflictError";
import { INVALID_ID } from "../../consts/errorMessages";


interface IBaseRepository {
    Get(): Promise<any[]>;
    GetById(id: string): Promise<any>;
    Create(newData: any): Promise<any>;
    DeleteById(id: string): Promise<number>;
    Update(id: string, updatedData: Body): Promise<number>;
    // UpdateOrCreate(): Promise<any[]>;
}


export default class BaseRepository implements IBaseRepository {
    protected DbModel: ModelStatic<any>;

    constructor(DbModel: ModelStatic<any>) {
        this.DbModel = DbModel;
    }

    async Get() {
        return await this.DbModel.findAll();
    }

    async GetById(id: string) {
        return await this.DbModel.findOne({
            where: { id }
        });
    }

    async Create(newData: any) {
        try {

            return await this.DbModel.create(newData);

        } catch (error) {
            if (error instanceof ValidationError) {
                const firstError = error.errors.pop();
                if (firstError!.validatorKey === "not_unique") {
                    throw new ConflictError(firstError!.message);
                }
                throw new BadRequestError(firstError!.message);
            }
            if (error instanceof ForeignKeyConstraintError) {
                throw new BadRequestError(INVALID_ID);
            }

            throw error;
        }
    }

    async DeleteById(id: string) {

        return await this.DbModel.destroy({ where: { id }, cascade: true });
    }

    async Update(id: string, updatedData: Body) {

        const [numUpdated] = await this.DbModel.update({
            ...updatedData,
            id,
        }, {
            where: {
                id
            }
        });

        return numUpdated;
    }

    // async UpdateOrCreate(id: string, updatedData: Body) {

    //     const update = {
    //         ...updatedData,
    //         id,
    //     };

    //     const [numUpdated] = await this.DbModel.update(
    //         update,
    //         {
    //             where: {
    //                 id
    //             }
    //         }
    //     );
    //     if (numUpdated === 1) {
    //         return {
    //             created: false,
    //         };
    //     }

    //     await this.DbModel.create(update);

    //     return {
    //         created: true,
    //     };
    // }
}
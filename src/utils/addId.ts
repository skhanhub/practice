import { v4 as uuidv4 } from 'uuid';

interface IInputObj {
    [key: string]: any;
}

interface IIOutputObj extends IInputObj {
    id: string;
}
export default (inputObj: IInputObj) => {
    const objWithId: IIOutputObj = {
        ...inputObj,
        id: uuidv4()
    };

    return objWithId;
};
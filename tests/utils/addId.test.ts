import { v4 } from "uuid";
import addId from "../../src/utils/addId";

jest.mock('uuid');

describe("Function should add Id attribute to existing objetct", () =>
    it("should add new Id to inout object", () => {

        const id = "1234";
        (v4 as jest.Mock).mockReturnValue(id);
        const input = {
            name: "Adam"
        };

        const expected = {
            id,
            name: "Adam"
        };

        const actual = addId(input);

        expect(actual).toEqual(expected);
    }
    ));
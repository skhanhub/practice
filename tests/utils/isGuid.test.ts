import { isGuid } from "../../src/utils/isGuid";

describe("Checks if GUID is valid", () => {
    it.each([
        ["asdas", false],
        ["261d2632-0a82-44fc-b577-67ec013560a1", true],
        ["db1ded3d-6136-4e56-8a6d-0c41a98fd36b", true],
        ["22b276b5-3136-4d3f-921a-8240b8326529", true],
        ["8f262ba4-e94e-4fc3-9846-c8f1636d8dae", true]
    ])
        ("for input %s the output should be %s", (GUID, expected) => {
            const actual = isGuid(GUID);

            expect(actual).toBe(expected);
        });
});
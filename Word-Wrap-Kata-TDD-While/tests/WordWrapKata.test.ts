import { wrap } from "../src/WordWrap"

/*
    1. Text is null or is empty ==> return ""
    2. ColumnWidth is less than 1
    3. ColumnWidth is greater than text.length
    4. ("buenos dias mi gente", 4) ==> "buen-\n os \ndias\n mi \ngente"
*/

describe("Word wrap should", () => {

    it("giveErrorIfColumnWithIsLessThan1", () => {
        expect(() => wrap("bu", 0)).toThrow(Error)
        expect(() => wrap("bu", 0)).toThrow("Column Width must be greater than 0")
    })

    it("giveSameTextWithNoChange", () => {
        expect(wrap("bu", 4)).toBe("bu")
    })

    it("wrap", () => {
        expect(wrap("buenos dias", 4)).toBe("buen\nos \ndias")
        expect(wrap("hola mundo", 7)).toBe("hola \nmundo")
        expect(wrap("Nuevo test de la kata Wrapper 3.0 con grandle y helicoptero", 10)).toBe("Nuevo test \nde la kata \nWrapper \n3.0 con \ngrandle y \nhelicopter\no")
        // The rest of the cases
    })
})
import { checkNumber } from "../src/FizzBuzzKata"

describe("CheckFizzBuzzNumber should", () => {
  it("convert numbers divisible by 3", () => {
    expect(checkNumber(42)).toBe("Fizz")
  })

  it("convert numbers divisible by 5", () => {
    expect(checkNumber(10)).toBe("Buzz")
  })

  it("convert numbers divisible by 3 and 5", () => {
    expect(checkNumber(60)).toBe("FizzBuzz")
  })

  it("convert numbers that contain number 3", () => {
    expect(checkNumber(13)).toBe("Fizz")
  })

  it("convert numbers that contain number 5", () => {
    expect(checkNumber(25)).toBe("BuzzBuzz")
  })
})


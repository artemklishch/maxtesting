import { it, expect, describe } from "vitest";
import { transformToNumber, cleanNumbers } from "./numbers";

describe("transformToNumber()", () => {
  it("should return the number", () => {
    const input = "10";
    const result = transformToNumber(input);
    //   expect(result).toBeTypeOf("number");
    expect(result).toBe(+input);
  });

  it("should yield an error, when no argument was provided", () => {
    const input = "invlid";

    const result = transformToNumber(input);

    expect(result).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];

    const result = cleanNumbers(numberValues);

    expect(result[0]).toBeTypeOf("number");
    expect(result).toEqual([1, 2]);
  });

  it("should throw an error, if an array with at least ne empty string is provided", () => {
    const numberValues = ["", 2];
    const getCleanedNumbers = () => {
      return cleanNumbers(numberValues);
    };
    expect(getCleanedNumbers).toThrowError();
  });
});

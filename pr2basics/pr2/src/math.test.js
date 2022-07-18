import { test, it, expect } from "vitest"; // it and test are the same
import { add } from "./math";

it("should summarize all number valus in an array", () => {
  // Arrange
  const numbers = [1, 2, 3];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = numbers.reduce(
    (prevVal, curVal) => prevVal + curVal,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield NaN, if at least one invalid number id provided", () => {
  const inputs = ["invalid", 1];

  const result = add(inputs);

  expect(result).toBeNaN();
});

it("should yield a corect sum, if an array of numeric strings was provided", () => {
  const numbers = ["1", "2"];

  const result = add(numbers);

  const expectedResult = numbers.reduce(
    (prevVal, curVal) => prevVal + +curVal,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield a 0, if an emprty array is provided", () => {
  const numbers = [];

  const result = add(numbers);

  expect(result).toBe(0);
});

it("should throw an error, if no vale is passed into a function", () => {
  //   try {
  //     const result = add();
  //   } catch (err) {
  //     expect(err).toBeDefined();
  //   }
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow();
});

it("should throw an errow, if provided mmultiple arguments instead of array", () => {
  const num1 = 1;
  const num2 = 2;

  const resultFn = () => {
    add(num1, num2);
  };
//   expect(resultFn).toThrow();
  expect(resultFn).toThrow(/is not iterable/);
});

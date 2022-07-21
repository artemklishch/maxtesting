import { it, expect } from "vitest";
import { transformToNumber } from "./numbers";

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

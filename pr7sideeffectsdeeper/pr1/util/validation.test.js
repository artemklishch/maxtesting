import { expect, it } from "vitest";
import { validateNotEmpty } from "./validation";

it("should throw an error if an empty string is provided", () => {
  const testText = "";

  const func = () => validateNotEmpty(testText);

  expect(func).toThrow();
});


it("should throw an error if a string with spaces is provided", () => {
    const testText = "  ";
  
    const func = () => validateNotEmpty(testText);
  
    expect(func).toThrow();
  });

  it("should provide the error message, if the error is thown", () => {
    const testText = "  ";
    const errorText = "Error text";
  
    const func = () => validateNotEmpty(testText, errorText);
  
    expect(func).toThrowError(errorText);
  });
  
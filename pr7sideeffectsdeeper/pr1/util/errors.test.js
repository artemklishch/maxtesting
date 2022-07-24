import { it, expect, describe } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
  it("should create an object of HttpError class", () => {
    const statusCode = 404;
    const message = "Error occured";
    const data = "Some data";
    const createdObject = { statusCode, message, data };

    const object = new HttpError(statusCode, message, data);

    expect(object).toEqual(createdObject);
  });

  it("should contain data undefined if not provided", () => {
    const statusCode = 404;
    const message = "Error occured";

    const object = new HttpError(statusCode, message);

    expect(object.data).toBeUndefined();
  });
});

describe("class ValidationError", () => {
  it("should create an object of ValidationError class", () => {
    const message = "Error occured";
    const createdObject = { message };

    const object = new ValidationError(message);

    expect(object).toEqual(createdObject);
  });
});

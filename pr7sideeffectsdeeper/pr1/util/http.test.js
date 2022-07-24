import { describe, expect, it, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

const testResponseData = { testKey: "testKey" };

const testFn = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("Error occred");
      //   throw new Error();
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((res, rej) => {
          res(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});
vi.stubGlobal("fetch", testFn);

describe("sendDataRequest()", () => {
  it("should return any available response data", () => {
    const data = { test: "test" };

    // expect(sendDataRequest(data)).resolves.toBeDefined();

    return expect(sendDataRequest(data)).resolves.toEqual(testResponseData);
  });

  it("should convert provided data into the JSON format, before sending the request", async () => {
    const data = { test: "test" };

    let errorMessage;
    try {
      await sendDataRequest(data);
    } catch (err) {
      errorMessage = err;
    }
    expect(errorMessage).not.toBe("Error occred");
  });

  it("should throw an HTTP error in case of non-ok status", () => {
    testFn.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        const testResponse = {
          ok: false,
          json() {
            return new Promise((res, rej) => {
              res(testResponseData);
            });
          },
        };
        resolve(testResponse);
      });
    });
    const data = { test: "test" };
    return expect(sendDataRequest(data)).rejects.toBeInstanceOf(HttpError);
  });
});

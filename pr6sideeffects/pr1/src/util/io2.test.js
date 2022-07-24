vi.mock("fs"); // with jest - it should be in top - bfore imports
import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

vi.mock("path", () => {
  return {
    default: {
      join: (...args) => args[args.length - 1],
    },
  };
});

it("should execute the writeFile method1", () => {
  const testText = "Test!";
  const testFileName = "test.txt";

  writeData(testText, testFileName);
  return expect(writeData(testText, testFileName)).resolves.toBeUndefined();

  // expect(fs.writeFile).toBeCalled();
});

it("should execute the writeFile method2", () => {
  const testText = "Test!";
  const testFileName = "test.txt";

  writeData(testText, testFileName);

  expect(fs.writeFile).toBeCalledWith(testFileName, testText);
});

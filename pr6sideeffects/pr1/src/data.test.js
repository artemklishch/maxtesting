import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

// vi - is th same as 'jest' in the jest library

describe("generateReportData()", () => {
  it("should execute logFn if provided", () => {
    const logger = vi.fn();

    generateReportData(logger);

    expect(logger).toBeCalled();
  });

  it("should execute logFn if provided", () => {
    const testText1 = "Hello";
    const logger = vi.fn(() => {});
    logger.mockImplementation(() => {}); // it means, that callbak inside the 'mockImplementation
    // method replaces the callbac inside 'vi.fn''

    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});

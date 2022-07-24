import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { showError } from "./dom";
import fs from "fs";
import path from "path";
import { Window } from "happy-dom";

// vi.stubGlobal('document') // not good approach, because it is tricky
const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDomContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window();
const document = window.document;
// document.write(htmlDomContent);
vi.stubGlobal("document", document);

//afterEach doesn't work
beforeEach(() => {
  document.body.innerHTML = "";
  document.write(htmlDomContent);
});

it("should add an error paragraph to the errors container", () => {
  showError("test");

  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).toBeNull();
});

it("should output provided messagein the errors paragraph", () => {
  const errorMessage = "test";

  showError(errorMessage);

  const errorsEl = document.getElementById("errors");
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph.innerHTML).toBe(errorMessage);
});

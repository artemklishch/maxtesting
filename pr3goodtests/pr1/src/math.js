import { cleanNumbers } from "./util/numbers";

export function add(numbers) {
  // let sum;
  let sum = 0;

  // throw new Errow("Something went wrong");

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

export function calculateResult(numberInputs) {
  let result = "";
  try {
    const numbers = cleanNumbers(numberInputs);
    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }
  return result;
}

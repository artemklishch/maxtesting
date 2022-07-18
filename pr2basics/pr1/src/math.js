export function add(numbers) {
  // let sum;
  let sum = 0;

  // throw new Errow("Something went wrong");

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

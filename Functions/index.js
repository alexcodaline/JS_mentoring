function sum(a, b) {
  return a + b;
}
let num1 = 5;
let num2 = 10;
console.log(sum(num1, num2));
// --------------------------

function line(words) {
  return words.toUpperCase();
}
console.log(line("hello"));
// --------------------------
function arrFunc(numbers) {
  return numbers.map((el) => el ** 2);
}

let arrNumb = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arrFunc(arrNumb));

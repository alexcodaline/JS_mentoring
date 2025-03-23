// Створіть проміс, який резолвиться через 2 секунди з повідомленням "Promise resolved!".

// Використовуйте then для виведення повідомлення, коли проміс буде резолвлено.

// Створіть проміс, який відхиляється з помилкою "Promise rejected!" та обробіть цю помилку за допомогою catch.

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 2000);
});

promise1.then((value) => {
  console.log(value);
});

// ----------------------------

console.log(promise1);

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise");
  }, 1000);
});

promise2.catch((error)=>{
    console.error("Promise Error", error)
});
console.log(promise2);

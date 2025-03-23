// Створіть асинхронну функцію, яка повертає "Hello, World!" через 1 секунду.

// Викличте цю функцію і виведіть результат в консоль.

// Використовуйте try/catch для обробки помилки в асинхронній функції, яка кидає помилку.

async function hello() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}
async function world() {
  const result = await hello();
  console.log(result);
}
world();

// --------------------------------------------
async function trashFunc() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("error"));
      }, 1500);
    });
  }
  async function callErrorFunc() {
    try {
      await trashFunc();
    } catch (error) {
      console.error("error code", error.message);
    }
  }
  
  callErrorFunc();
  
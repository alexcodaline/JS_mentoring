// Завдання:

// Реалізуйте систему управління бібліотекою книг.
// Створіть конструктор Book, який має властивості title, author, і year. Потім створіть конструктор EBook, який наслідує Book і додає властивість fileSize та метод для завантаження книги.
// Додайте метод для виведення інформації про книгу (title і author) в прототип Book і переконайтесь, що EBook успадковує цей метод.

// Вимоги:

// Використовуйте прототипи для наслідування.

// Додайте метод для виведення інформації про книгу до прототипу Book.

// Створіть метод для завантаження електронної книги в конструкторі EBook.

// Переконайтесь, що метод для виведення інформації про книгу працює для об'єктів EBook.

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}
Book.prototype.bookInfo = function () {
  return `${this.title}, ${this.author}`;
};


function EBook(title, author, year, fileSize) {
  this.fileSize = fileSize;
  Book.call(this, title, author, year);
}

EBook.prototype = Object.create(Book.prototype);
EBook.prototype.constructor = EBook;
EBook.prototype.download = function () {
  return `Download ${this.fileSize}`;
};


const newBook = new Book("Book title", "Book author", 2025);
const newEbook = new EBook("Ebook title", "Ebook author", 2024, 5);
console.log(newBook.bookInfo());
console.log(newEbook.download())
console.log(newBook);
console.log(newEbook);

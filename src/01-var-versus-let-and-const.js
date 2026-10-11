// var-let-const-demo.js

console.log("=== Поднятие (hoisting) ===");

// С var можно обратиться до объявления — будет undefined
console.log("До объявления var:", myVar); // undefined
var myVar = "я var";
console.log("После присваивания var:", myVar); // я var

// С let/const обращение до объявления вызовет ошибку (ReferenceError)
// console.log(myLet); // раскомментируйте — получите ошибку
let myLet = "я let";

// console.log(myConst); // раскомментируйте — получите ошибку
const myConst = "я const";

console.log("\n=== Область видимости (scope) ===");

function scopeDemo() {
  var varInside = "var внутри функции";
  let letInside = "let внутри функции";
  const constInside = "const внутри функции";
}
// scopeDemo();
// console.log(varInside); // Ошибка: varInside не определена (если вне функции)
// Но если var объявлена в глобальной области — она глобальна.
// А вот блочная область:

if (true) {
  var varBlock = "var в блоке if";
  let letBlock = "let в блоке if";
  const constBlock = "const в блоке if";
}

console.log("var в блоке видна снаружи:", varBlock); // видна (из-за функциональной области)
// console.log(letBlock); // Ошибка: letBlock не определена
// console.log(constBlock); // Ошибка: constBlock не определена

console.log("\n=== Переназначение ===");

let mutableLet = "начальное значение";
mutableLet = "новое значение"; // OK
console.log("let после переназначения:", mutableLet);

const immutableConst = "неизменяемое";
// immutableConst = 'попытка изменить'; // Ошибка: нельзя переназначить const

console.log("\n=== const и мутация объектов/массивов ===");

const arr = [1, 2, 3];
arr.push(4); // OK: мутируем содержимое
arr[0] = 99; // OK: меняем элемент
console.log("const-массив после мутации:", arr); // [99, 2, 3, 4]

const obj = { name: "Иван" };
obj.name = "Пётр"; // OK: меняем свойство
console.log("const-объект после мутации:", obj); // { name: 'Пётр' }

// obj = { name: 'Новый' }; // Ошибка: нельзя переназначить саму переменную

console.log("\n=== Глобальная область и window (в браузере) ===");
var globalVar = "глобальный var";
let globalLet = "глобальный let";
const globalConst = "глобальный const";

// В браузере:
// console.log(window.globalVar); // будет видно
// console.log(window.globalLet); // не будет видно
// console.log(window.globalConst); // не будет видно

console.log("Все примеры выполнены");

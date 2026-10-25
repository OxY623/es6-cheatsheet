console.log(
  "=== IIFE: изоляция переменных (чтобы не засорять глобальную область) ===",
);

(function () {
  // Эти переменные живут только внутри IIFE и не видны снаружи
  var counter = 0;
  let message = "я внутри IIFE";
  const secret = "секретное значение";

  function increment() {
    counter++;
    console.log(`Счётчик: ${counter}, сообщение: ${message}`);
  }

  increment(); // 1
  increment(); // 2
})();

// Попытка обратиться снаружи вызовет ошибку — переменные инкапсулированы
// console.log(counter);    // ReferenceError
// console.log(message);    // ReferenceError
// console.log(secret);     // ReferenceError

console.log(
  "\n=== IIFE: эмуляция приватных данных (старый паттерн модуля) ===",
);

const MyModule = (function () {
  // «Приватные» переменные — недоступны снаружи
  var privateValue = 100;

  function getPrivate() {
    return privateValue;
  }

  function setPrivate(newValue) {
    if (newValue > 0) {
      privateValue = newValue;
    }
  }

  // Публичный API — то, что видно снаружи
  return {
    getPrivate,
    setPrivate,
    publicValue: 42,
  };
})();

console.log("publicValue:", MyModule.publicValue); // 42
console.log("getPrivate():", MyModule.getPrivate()); // 100
MyModule.setPrivate(200);
console.log("после setPrivate(200):", MyModule.getPrivate()); // 200

// Прямого доступа к privateValue нет:
// console.log(MyModule.privateValue); // undefined

console.log("\n=== IIFE с параметрами и возвратом значения ===");

const result = (function (a, b) {
  const sum = a + b;
  const product = a * b;

  return { sum, product };
})(5, 7);

console.log("Результат IIFE:", result); // { sum: 12, product: 35 }

console.log("\n=== IIFE в строгом режиме (полезно для отлова ошибок) ===");

(function () {
  "use strict";
  // В строгом режиме случайное создание глобальной переменной вызовет ошибку
  // x = 10; // Uncaught ReferenceError: x is not defined
  var x = 10;
  console.log("В строгом режиме x =", x);
})();

console.log("\n=== Современный аналог: блок вместо IIFE ===");
// Сейчас вместо IIFE часто используют просто блок {} — он даёт ту же изоляцию для let/const
{
  let blockCounter = 0;
  function inc() {
    blockCounter++;
    console.log("blockCounter:", blockCounter);
  }
  inc(); // 1
  inc(); // 2
}
// blockCounter недоступен снаружи — как и в IIFE

console.log("Все примеры с IIFE выполнены");

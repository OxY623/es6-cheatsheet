console.log("=== ЧАСТЬ 1: ДЕСТРУКТУРИЗАЦИЯ (повтор для связности) ===");

{
    const user = { name: "Анна", age: 28, city: "Казань" };
const { name, age, city = "Неизвестно" } = user;
console.log(`Деструктуризация объекта: ${name}, ${age}, ${city}`);
}

const numbers = [10, 20, 30];
const [first, , third] = numbers; // пропуск элемента
console.log(`Деструктуризация массива: ${first}, ${third}`);

console.log("\n=== ЧАСТЬ 2: МОДУЛИ ES6 (import/export) ===");

// В реальном проекте эти строки выносят в отдельные файлы.
// Здесь показываем синтаксис и эмулируем поведение через локальные объявления.

// Эмуляция экспорта из файла utils.js
export const sum = (a, b) => a + b;
export const Config = { theme: "dark", lang: "ru" };

// Эмуляция export default user.js
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Привет, ${this.name}!`;
  }
}

export { default as User };

// Эмуляция импорта в main.js
// import { PI, sum } from './utils.js';
// import User from './user.js';
// import * as Utils from './utils.js';

console.log("ES6 модули (эмуляция):");
console.log("PI:", PI);
console.log("sum(2, 3):", sum(2, 3));

const u = new User("Олег");
console.log(u.greet());

// Динамический импорт (тоже часть ES модулей, асинхронный)
async function loadModule() {
  try {
    // В реальном коде: const math = await import('./math.js');
    // Здесь просто показываем синтаксис
    console.log(
      "Динамический импорт: синтаксис await import(...) готов к использованию.",
    );
  } catch (e) {
    console.error("Ошибка динамического импорта:", e);
  }
}
loadModule();

console.log("\n=== ЧАСТЬ 3: ESNext (современные фишки) ===");

// Optional Chaining (?.) — безопасный доступ к вложенным свойствам
const profile = {
  settings: {
    notifications: { enabled: true },
  },
};
// Вместо profile.settings.notifications.enabled с проверками:
const isEnabled = profile?.settings?.notifications?.enabled;
console.log("Optional Chaining:", isEnabled); // true

const missing = profile?.settings?.prefs?.darkMode;
console.log("Если пути нет:", missing); // undefined, без ошибки

// Nullish Coalescing (??) — значение по умолчанию только для null/undefined
const port = process.env.PORT ?? 3000; // если PORT === null/undefined, будет 3000
const count = 0 ?? 10; // 0 (в отличие от ||, который взял бы 10)
console.log("Nullish Coalescing: port=", port, "count=", count);

// Top-level await (в модулях) — ожидание без async-функции
// Работает только в ES-модулях (type="module")
// Пример: const data = await fetch('/api/config').then(r => r.json());
console.log(
  "Top-level await: доступен в ES-модулях, позволяет писать await на верхнем уровне файла.",
);

// Логические присваивания (ES2021)
let x = null;
x ??= 100; // x станет 100 (nullish)
console.log("x после ??=:", x);

let y = 20;
y &&= 50; // y станет 50 (истина && значение)
console.log("y после &&=:", y);

let z = 10;
z ||= 999; // z останется 10 (уже истина)
console.log("z после ||=:", z);

// Private поля классов (ES2022)
class SecretBox {
  #secret = "пароль";
  show() {
    return this.#secret;
  }
  // this.#secret снаружи не доступен — приватное поле
}
const box = new SecretBox();
console.log("Private field:", box.show()); // пароль

// Promise.withResolvers (ES2024) — удобно для внешнего контроля промиса
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("Готово!"), 500);
promise.then((msg) => console.log("Promise.withResolvers:", msg));

console.log(
  "\n=== ПРАКТИЧЕСКИЙ ПРИМЕР: КОМБО (модули + деструктуризация + ESNext) ===",
);

// Представим, что это результат импорта:
const apiResponse = {
  data: {
    user: { name: "Мария", role: "admin" },
    meta: { total: 120 },
  },
  error: null,
};

// Деструктуризация с опциональной цепочкой и значениями по умолчанию
const {
  data: { user: { name, role = "guest" } = {}, meta: { total = 0 } = {} } = {},
  error,
} = apiResponse;

const status = error ? "ошибка" : "успех";
console.log(
  `Статус: ${status}, пользователь: ${name} (${role}), записей: ${total}`,
);

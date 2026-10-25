console.log("=== 1. Создание и базовые свойства ===");
const str1 = "обычная строка";
const str2 = "тоже строка";
const template = `шаблонная строка с ${1 + 2}`;
const long = `многострочный
текст`;

console.log(str1, str2, template, long);
console.log("Длина:", "abc".length); // 3

console.log("\n=== 2. Индексация и подстроки ===");
const s = "Hello World";
console.log(s[0]); // 'H'
console.log(s.charAt(1)); // 'e'
console.log(s.slice(0, 5)); // 'Hello'
console.log(s.substring(6)); // 'World'
console.log(s.substr(6, 3)); // 'Wor' (устаревший, но встречается в старом коде)

console.log("\n=== 3. Поиск и проверка вхождения ===");
console.log(s.includes("World")); // true
console.log(s.indexOf("o")); // 4 (первое вхождение)
console.log(s.lastIndexOf("o")); // 7 (последнее вхождение)
console.log(s.startsWith("He")); // true
console.log(s.endsWith("ld")); // true

console.log("\n=== 4. Регистр и нормализация ===");
const mixed = "HeLLo WoRLd";
console.log(mixed.toLowerCase()); // 'hello world'
console.log(mixed.toUpperCase()); // 'HELLO WORLD'

// Для i18n и корректного сравнения лучше использовать localeAware
console.log(mixed.toLocaleLowerCase("ru"));
console.log(mixed.toLocaleUpperCase("ru"));

// Сравнение без учёта регистра
const a = "привет";
const b = "ПРИВЕТ";
console.log(a.toLowerCase() === b.toLowerCase()); // true

console.log("\n=== 5. Разбиение и соединение ===");
const csv = "apple,banana,cherry";
const parts = csv.split(",");
console.log(parts); // [ 'apple', 'banana', 'cherry' ]

const joined = parts.join(" | ");
console.log(joined); // 'apple | banana | cherry'

console.log("\n=== 6. Замена и очистка ===");
const dirty = "   spaces and\ttabs\n ";
console.log(dirty.trim()); // убирает пробелы по краям
console.log(dirty.trimStart()); // только слева
console.log(dirty.trimEnd()); // только справа

const replaced = "foo bar foo".replace("foo", "baz"); // заменяет только первое
console.log(replaced); // 'baz bar foo'

const replacedAll = "foo bar foo".replaceAll("foo", "baz");
console.log(replacedAll); // 'baz bar baz'

console.log("\n=== 7. Регулярные выражения для строк ===");
const text = "Цена: 123 руб.";
const match = text.match(/\d+/);
console.log(match); // [ '123' ]

const cleaned = text.replace(/[^\d]/g, ""); // оставить только цифры
console.log(cleaned); // '123'

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(validEmail.test("test@example.com")); // true
console.log(validEmail.test("bad-email")); // false

console.log("\n=== 8. Кодировка и символы (важно для валидации токенов) ===");
// Unicode-символы
console.log("\u0041"); // 'A'
console.log("🧠".codePointAt(0)); // 129482

// Длина строки с эмодзи (иногда отличается от количества «видимых» символов)
console.log("🚀".length); // 2 (потому что эмодзи — суррогатная пара)

// Нормализация для сравнения (полезно для поиска/валидации)
const nfd = "é".normalize("NFD"); // разложение
console.log(nfd.length); // 2

console.log("\n=== 9. Практические кейсы под ваш стек ===");

// Валидация токена (GREEN API MAX и аналоги)
function isValidToken(token) {
  if (!token || typeof token !== "string") return false;
  return /^[A-Za-z0-9_-]{10,64}$/.test(token);
}
console.log(isValidToken("abc123-XYZ"));

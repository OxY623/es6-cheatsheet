
console.log('=== ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТОВ ===');

// 1. Базовая деструктуризация объекта
{
const user = { name: 'Иван', age: 30, city: 'Москва' };
const { name, age, city } = user;
console.log('1. Базовая:', name, age, city); // Иван 30 Москва

}
// 2. Переименование переменных
const { name: userName, age: userAge } = user;
console.log('2. Переименование:', userName, userAge); // Иван 30

// 3. Значения по умолчанию
const userPartial = { name: 'Анна' };
const { name: uName, city = 'Неизвестно', country = 'Россия' } = userPartial;
console.log('3. По умолчанию:', uName, city, country); // Анна Неизвестно Россия

// 4. Вложенные объекты
const profile = {
  profile: {
    name: 'Олег',
    contacts: {
      email: 'oleg@example.com',
      phone: '123-456-7890'
    }
  }
};
const { profile: { name, contacts: { email } } } = profile;
console.log('4. Вложенность:', name, email); // Олег oleg@example.com

// 5. Остаток (rest) в объекте
const userRest = { id: 1, name: 'Мария', age: 25, city: 'Казань' };
const { id, ...restInfo } = userRest;
console.log('5. Rest в объекте:', id, restInfo); // 1 { name: 'Мария', age: 25, city: 'Казань' }


console.log('\n=== ДЕСТРУКТУРИЗАЦИЯ МАССИВОВ ===');

// 6. Базовая деструктуризация массива
const numbers = [10, 20, 30, 40];
const [a, b, c] = numbers;
console.log('6. Базовый массив:', a, b, c); // 10 20 30

// 7. Пропуск элементов
const fullName = 'Илья Петрович Смирнов'.split(' ');
const [firstName, , lastName] = fullName;
console.log('7. Пропуск:', firstName, lastName); // Илья Смирнов

// 8. Значения по умолчанию в массиве
const shortList = [1];
const [x, y = 99] = shortList;
console.log('8. По умолчанию в массиве:', x, y); // 1 99

// 9. Остаток (rest) в массиве
const nums = [5, 10, 15, 20, 25];
const [first, ...remaining] = nums;
console.log('9. Rest в массиве:', first, remaining); // 5 [10, 15, 20, 25]

// 10. Многоуровневые массивы
const coordinates = [[1, 2], [3, 4], [5, 6]];
const [[x1, y1], , [x3, y3]] = coordinates;
console.log('10. Вложенные массивы:', x1, y1, x3, y3); // 1 2 5 6


console.log('\n=== ПРАКТИЧЕСКИЕ СЦЕНАРИИ ===');

// 11. Обмен значений переменных
let p = 100;
let q = 200;
[p, q] = [q, p];
console.log('11. Обмен:', p, q); // 200 100

// 12. Деструктуризация в параметрах функции
function formatUser({ name = 'Гость', age = 0 }) {
  return `${name} (${age} лет)`;
}
console.log('12. Параметры функции:', formatUser({ name: 'Дима', age: 27 })); // Дима (27 лет)
console.log('12. Параметры с дефолтами:', formatUser({})); // Гость (0 лет)

// 13. Деструктуризация результата split/match
const dateStr = '2024-12-10';
const [year, month, day] = dateStr.split('-');
console.log('13. split:', year, month, day); // 2024 12 10

// 14. Перебор Object.entries с деструктуризацией
const stats = { views: 1500, likes: 320, comments: 45 };
for (const [key, value] of Object.entries(stats)) {
  console.log(`14. ${key}: ${value}`);
}

// 15. Возврат нескольких значений из функции
function getDimensions() {
  return [800, 600]; // ширина, высота
}
const [width, height] = getDimensions();
console.log('15. Возврат из функции:', width, height); // 800 600

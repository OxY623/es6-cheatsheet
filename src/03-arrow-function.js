console.log('=== 1. Базовый синтаксис и неявный return ===');

const add = (a, b) => a + b;                 // неявный возврат выражения
const greet = name => `Привет, ${name}!`;   // один параметр — скобки можно опустить
const logNothing = () => {                   // с фигурными скобками нужен явный return
  console.log('Я выполняюсь');
  return undefined;
};

console.log(add(2, 3));                      // 5
console.log(greet('Алекс'));                 // Привет, Алекс!
logNothing();                                // Я выполняюсь


console.log('\n=== 2. this: стрелочные функции берут this из окружающего контекста ===');

function Person(name) {
  this.name = name;
}

Person.prototype.prefixNameArrow = function (arr) {
  // this здесь — это экземпляр Person (например, s)
  return arr.map(character => {
    // внутри стрелочной функции this такой же, как в prefixNameArrow
    console.log('this в arrow:', this.name);
    return this.name + character;
  });
};

const s = new Person('a');
console.log('Результат prefixNameArrow:', s.prefixNameArrow(['b', 'c']));
// Вывод: ['ab', 'ac']


console.log('\n=== 3. Возврат объекта из стрелочной функции: нужны скобки ===');

// Без скобок JS думает, что это тело функции — вернёт undefined
// const badUser = id => { id: id, active: true }; // ❌ ошибка логики

// Правильно: оборачиваем объект в скобки
const goodUser = id => ({ id: id, active: true }); // ✅

console.log('badUser:', badUser(1));   // undefined
console.log('goodUser:', goodUser(1)); // { id: 1, active: true }


console.log('\n=== 4. Стрелочные функции в массивах (map/filter/reduce) — самый частый кейс ===');

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log('doubled:', doubled); // [2,4,6,8,10]
console.log('evens:', evens);     // [2,4]
console.log('sum:', sum);         // 15


console.log('\n=== 5. Обработчики событий и setTimeout — где стрелочные функции спасают от потери this ===');

const button = {
  label: 'Нажми меня',
  count: 0,
  init() {
    // Обычная функция потеряла бы this (он стал бы элементом или window)
    // Стрелочная функция сохраняет this из init()
    const handler = () => {
      this.count++;
      console.log(`${this.label}: клик #${this.count}`);
    };

    // Эмуляция подписки (в браузере это был бы button.addEventListener('click', handler))
    handler(); // 1
    handler(); // 2
  }
};

button.init();


console.log('\n=== 6. Чего нельзя делать со стрелочными функциями ===');

// Нельзя использовать как конструктор
// const Bad = () => {};
// new Bad(); // TypeError: Bad is not a constructor

// У них нет собственного arguments — используйте rest-параметры
const sumAll = (...args) => args.reduce((a, b) => a + b, 0);
console.log('sumAll:', sumAll(1, 2, 3, 4)); // 10


console.log('\n=== 7. Пример, близкий к  стеку: React-подобный хук ===');

function useCounter(initial) {
  let count = initial;

  const increment = () => {
    count += 1;
    console.log('Новое значение:', count);
  };

  const reset = () => {
    count = initial;
    console.log('Счётчик сброшен:', count);
  };

  return { count, increment, reset }; // в реальном React это замыкание внутри компонента
}

const counter = useCounter(0);
counter.increment(); // Новое значение: 1
counter.increment(); // Новое значение: 2
counter.reset();      // Счётчик сброшен: 0


console.log('\n=== 8. Важное для TypeScript и тестов (Jest) ===');

// В TS типизация стрелочных функций выглядит так:
// const typedAdd = (a: number, b: number): number => a + b;

// В тестах это помогает избегать ошибок контекста:
const testUtils = {
  value: 10,
  run: () => {
    // this сохраняется благодаря стрелочной функции
    return this.value + 5;
  }
};

console.log('testUtils.run():', testUtils.run()); // 15

console.log('Все примеры выполнены');

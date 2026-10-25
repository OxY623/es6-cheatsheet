# Шпаргалка es6

Шпаргалка с советами, хитростями, лучшими практиками и кодом ES2015 [ES6] Фрагменты примеров для вашего повседневного рабочего процесса. Вклады приветствуются!
Исходники матеала в папке './src/' можно запустить в node.js или в браузере.

## Содержание

- [var против let / const](#var-против-let--const)
- [Замена IIFEs на Блоки](#замена-iifes-на-блоки)
- [Стрелочные функции](#стрелочные-функции)
- [Строки](#строки)
- [Деструкторизация](#деструкторизация)
- [Модули](#модули)
- [Параметры](#параметры)
- [Rest](#rest)
- [Classes](#classes)
- [Symbols](#symbols)
- [Maps](#maps)
- [WeakMaps](#weakmaps)
- [Promises](#promises)
- [Generators](#generators)
- [Async Await](#async-await)
- [Getter/Setter функции](#getter-and-setter-functions)

## var против let / const

> Кроме `var`, сейчас мы имеем домтуп к двум новым индефикаторам для хранения значений
> —`let` и `const`. В отличии от `var`, `let` и `const` утверждения не поднимаются
> на вершину их окружающего скопа.

Пример использования `var`:

```javascript
var snack = "Meow Mix";

function getFood(food) {
  if (food) {
    var snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false); // undefined
```

Однако, обратите внимание, что произойдет, если мы `var` заменим на `let`:

```javascript
let snack = "Meow Mix";

function getFood(food) {
  if (food) {
    let snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false); // 'Meow Mix'
```

Эти изменения в поведении подчеркивают, что мы должны быть осторожны, когда изменяем легаси код, который использует `var`. Слепая замена `var` на `let` может привести к неожиданному поведению.

> **Примечание**: `let` и `const` имеют блочную область видимости. Следовательно, ссылаясь на индификаторы в блочной области видимости до их определения приведет к ошибке типа `ReferenceError`.

```javascript
console.log(x);

let x = "hi"; // ReferenceError: x is not defined
```

> **Лучшая практика**: Оставляйте `var` декларации внутри легаси кода обозначив
> что это нужно будет внимательно переосмыслить при рефакторинге. Когда работаете в новой кодовой базой, используйте
> `let` для переменных которые будут изменяться со временем, и `const` для переменных, которые нельзя переназначать.

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Замена IIFEs на Блоки

> Распространенное применение **Immediately Invoked Function Expressions** (самовызывающейся функции) - это заключение
> переменных в своем собственном скопе видимости. В ES6, теперь у нас есть возможность создавать блочные область видимости и,
> следовательно, не ограничиваються только функциональной областью.

```javascript
(function () {
  var food = "Meow Mix";
})();

console.log(food); // Reference Error
```

Использование блочной области видимости в ES6:

```javascript
{
  let food = "Meow Mix";
}

console.log(food); // Reference Error
```

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Стрелочные функции

Часто мы имеем вложенные функции в которых мы бы хотели like сохранить
контекст `this` из лексической области видимости. Как в примере ниже:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(function (character) {
    return this.name + character; // Cannot read property 'name' of undefined
  });
};
```

Одно из решений этой проблемы это сохранене контекста `this` используя переменную:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  var that = this; // Store the context of this
  return arr.map(function (character) {
    console.log("this is " + this); // this is [object Object]
    return that.name + character;
  });
};
```

Мы можем прямо передать контекст `this`:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(function (character) {
    return this.name + character;
  }, this);
};
```

Так же можно привязать контекст с помощью bind:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(
    function (character) {
      return this.name + character;
    }.bind(this),
  );
};
```

Используя **стрелочные функции**, лексическое значение `this` не изменяется и мы не можем его переопределить:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map((character) => this.name + character);
};
```

> **Лучшая практика**: Используйте **стрелочные функции** когда вам нужно сохранить
> лексическое значение `this`. Стрелочная функция не имеет собственного this и берёт его из окружающего контекста.

Стрелочные функции можно использовать, когда просто мы что-то возвращаем:

```javascript
var squares = arr.map(function (x) {
  return x * x;
}); // Function Expression
```

```javascript
const arr = [1, 2, 3, 4, 5];
const squares = arr.map((x) => x * x); // Arrow Function for terser implementation
```

> **Лучшая практика**: Используй **стрелочные функции** вместо функциональных выражений
> когда это возможно.

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Строки

Начиная с ES6 стандартная библиятека методов значительно выросла. Вместе с этими изминениями
появляются новые методы, которые мы можем использовать со строками, такие как `.includes()` и
`.repeat()`.

### .includes( )

```javascript
var string = "food";
var substring = "foo";

console.log(string.indexOf(substring) > -1);
```

Вместо проверки на возврат значения `> -1` обозначающую содержание в строке,
мы можем просто использовать `.includes()`, который вернет булево значение:

```javascript
const string = "food";
const substring = "foo";

console.log(string.includes(substring)); // true
```

### .repeat( )

```javascript
function repeat(string, count) {
  var strings = [];
  while (strings.length < count) {
    strings.push(string);
  }
  return strings.join("");
}
```

В ES6 у нас есть возможность более потрясающей реализации:

```javascript
// String.repeat(numberOfRepetitions)
"meow".repeat(3); // 'meowmeowmeow'
```

### Шаблонные литералы

Используя **шаблонные литералы**, мы можем конструировать строки так, что больше нет нужно беспокоиться о экранировании.

```javascript
var text = 'This string contains "double quotes" which are escaped.';
```

```javascript
let text = `This string contains "double quotes" which are escaped.`;
```

**Шаблонные литералы** также поддерживают интерполяцию, мы можем легко складывать строки и вставлять нужные нам значения:

```javascript
var name = "Tiger";
var age = 13;

console.log("My cat is named " + name + " and is " + age + " years old.");
```

Намного проще:

```javascript
const name = "Tiger";
const age = 13;

console.log(`My cat is named ${name} and is ${age} years old.`);
```

В ES5, мы выполняли перевод на новую строку, как ниже:

```javascript
var text = "cat\n" + "dog\n" + "nickelodeon";
```

Или:

```javascript
var text = ["cat", "dog", "nickelodeon"].join("\n");
```

**Шаблонные литералы** сохраняют пененос на новую строку без необходимости явно его определять:

```javascript
let text = `cat
dog
nickelodeon`;
```

**Шаблонные литералы** могут принимать выражения, например:

```javascript
let today = new Date();
let text = `The time and date is ${today.toLocaleString()}`;
```

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Деструкторизация

Деструкторизация позволяет нам распаковывать начения из массивов и обьектов (даже разположенные в глубине) и сохранять их в переменных через более удобный синтаксис.

### Деструкторизация массивов

```javascript
var arr = [1, 2, 3, 4];
var a = arr[0];
var b = arr[1];
var c = arr[2];
var d = arr[3];
```

```javascript
let [a, b, c, d] = [1, 2, 3, 4];

console.log(a); // 1
console.log(b); // 2
```

### Деструкторизация обьектов

```javascript
var luke = { occupation: "jedi", father: "anakin" };
var occupation = luke.occupation; // 'jedi'
var father = luke.father; // 'anakin'
```

```javascript
let luke = { occupation: "jedi", father: "anakin" };
let { occupation, father } = luke;

console.log(occupation); // 'jedi'
console.log(father); // 'anakin'
```

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Модули

Перед ES6, мы использовали такие библиотеки, как [Browserify](http://browserify.org/) для создания модулей на стороне клиета, и [require](https://nodejs.org/api/modules.html#modules_module_require_id) в **Node.js**. Начиная с ES6, мы можем сейчас прямо использовать модули всех типов (AMD and CommonJS).

### Экспорт в CommonJS

```javascript
module.export = 1;
module.export = { foo: "bar" };
module.export = ["foo", "bar", "foobar"];
module.export = function foo() {};
```

### Экспорт в ES6

Начиная с ES6, мы имеем различные варианты экспорта. Мы можем выполнить **именованный экспорт**:

```javascript
export let name = "Artsiom";
export let age = 36;
```

так же как **экспорт списка**

```javascript
function sumTwo(a, b) {
  return a + b;
}

function sumThree(a, b, c) {
  return a + b + c;
}

export { sumTwo, sumThree };
```

Мы также можем экспортировать функции, обьекты и значения просто используя ключевое слово`export`:

```javascript
export function sumTwo(a, b) {
  return a + b;
}

export function sumThree(a, b, c) {
  return a + b + c;
}
```

И наконец, что не менее важно мы имеем **экспорт по дефолту**:

```javascript
function sumTwo(a, b) {
  return a + b;
}

function sumThree(a, b, c) {
  return a + b + c;
}

const api = {
  sumTwo,
  sumThree,
};

export default api;

/* одинаково
 * export { api as default };
 */
```

> **Лучшие практики**: всегда используйте `export default` в **конце** модуля. Это делает код более чище и читабельнее, а также экономит время, избавляя от необходимости выяснять, под каким именем экспортируется то или иное значение. Более того, общая практика в CommonJS модули экспортируются отдельными значениями или обьектами. Застревая на этой парадигме, мы делаем код читабельнее и позволяя себе использовать синтаксис - как и CommonJs, так и ES6 модули

### Импорт в ES6

ES6 предоставляет нам варианты импортов. Мы можем импортировать целый файл:

```javascript
import "underscore";
```

> Важно заметить, что импорт всего файла выполнит весь код на верхнем уровне этого файла

Что-то похожее в Python, мы имеем именованные импорты:

```javascript
import * as additionUtill from "math/addition";

const { sumTwo, sumThree } = additionUtill;
```

Дефолтный импорт:

```javascript
import api from "math/addition";
// Также как import {default as api} from 'math/addition';
```

Пока лучше брать обычный экспорт, но мы можем иногда миксовать импорты. Когда мы экспортируем так:

```javascript
// foo.js
export { foo as default, foo1, foo2 };
```

Мы можем импортировать все так:

```javascript
import foo, { foo1, foo2 } from "foo";
```

Когда импорт модуля, экспортированный, как CommonJS (как в React) мы можем сделать:

```javascript
import React from "react";
const { Component, PropTypes } = React;
```

Это можно упростить:

```javascript
import React, { Component, PropTypes } from "react";
```

> **Примечание**: Экспортируемые значения - это **привязки**(bindings), не ссылки. Поэтому изменение привязки переменной в одном модуле отразится на значении в модуле, который её экспортирует. Старайтесь не изменять публичный интерфейс этих экспортируемых значений.

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Параметры

В ES5 существовали различные способы работы с функциями, которым требовались **значения по умолчанию**, **произвольное количество аргументов** и **именованные параметры**. В ES6 всё это — и даже больше — можно реализовать с помощью более лаконичного синтаксиса.

```javascript
function addTwoNums(x, y) {
  x = x | 0;
  y = y | 0;
  return x + y;
}
```

В ES6, мы можем просто сразу указать дефолтные параметры функции:

```javascript
function addTwoNums(x = 0, y = 0) {
  return x + y;
}
```

```javascript
addTwoNumbers(2, 4); // 6
addTwoNumbers(2); // 2
addTwoNumbers(); // 0
```

## Rest

Остаточные параметры

В ES5 для работы с произвольным количеством аргументов использовался следующий подход:

```javascript
function logArguments() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
```

С помощью оператора **rest** («остаточные параметры») можно передать в функцию любое количество аргументов:

```javascript
function logArguments(...args) {
  for (let arg of args) {
    console.log(arg);
  }
}
```

### Именованные параметры

Одним из способов реализации именованных параметров в ES5 был паттерн «объект опций» (**options object**), заимствованный из jQuery:

```javascript
function initializeCanvas(options) {
  var height = options.height || 600;
  var width = options.width || 400;
  var lineStroke = options.lineStroke || "black";
}
```

Того же результата можно добиться, используя деструктуризацию непосредственно в списке параметров функции:

```javascript
function initializeCanvas({ height = 600, width = 400, lineStroke = "black" }) {
  // Здесь можно использовать переменные height, width, lineStroke
}
```

Если нужно сделать весь объект параметров необязательным, можно задать пустой объект в качестве значения по умолчанию при деструктуризации:

```javascript
function initializeCanvas({
  height = 600,
  width = 400,
  lineStroke = "black",
} = {}) {
  // ...
}
```

### Оператор расширения (Spread Operator)

В ES5 для поиска максимального значения в массиве можно было воспользоваться методом `apply` у `Math.max`:

````javascript
Math.max.apply(null, [-1, 100, 9001, -32]);
``` // 9001
````

В ES6 появился оператор расширения (spread operator), который позволяет передавать массив значений в качестве аргументов функции:

```javascript
Math.max(...[-1, 100, 9001, -32]); // 9001
```

С помощью этого интуитивно понятного синтаксиса можно легко объединять массивы:

```javascript
let cities = ["San Francisco", "Los Angeles"];
let places = ["Miami", ...cities, "Chicago"]; // ['Miami', 'San Francisco', 'Los Angeles', 'Chicago']
```

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Classes

До появления ES6 классы реализовывались через создание функции-конструктора и добавление свойств в прототип:

```javascript
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

Person.prototype.incrementAge = function () {
  return (this.age += 1);
};
```

А расширение классов выполнялось следующим образом:

```javascript
function Personal(name, age, gender, occupation, hobby) {
  Person.call(this, name, age, gender);
  this.occupation = occupation;
  this.hobby = hobby;
}

Personal.prototype = Object.create(Person.prototype);
Personal.prototype.constructor = Personal;
Personal.prototype.incrementAge = function () {
  Person.prototype.incrementAge.call(this);
  this.age += 20;
  console.log(this.age);
};
```

В ES6 появился долгожданный «синтаксический сахар» для решения этих задач. Теперь можно создавать классы напрямую:

```javascript
class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  incrementAge() {
    this.age += 1;
  }
}
```

А расширить их можно с помощью ключевого слова `extends`:

```javascript
class Personal extends Person {
  constructor(name, age, gender, occupation, hobby) {
    super(name, age, gender);
    this.occupation = occupation;
    this.hobby = hobby;
  }

  incrementAge() {
    super.incrementAge();
    this.age += 20;
    console.log(this.age);
  }
}
```

> **Рекомендация**: Хотя синтаксис создания классов в ES6 скрывает механизмы реализации и работы прототипов «под капотом», это отличное решение для начинающих, позволяющее писать более чистый код.

<sup>[(Вернуться к содержанию)](#содержание)</sup>

## Symbols

Символы существовали и до появления ES6, но теперь у нас есть открытый интерфейс для прямого взаимодействия с ними. Символы — это неизменяемые и уникальные сущности, которые можно использовать в качестве ключей в любых хеш-структурах (объектах).

### Symbol( )

Вызов `Symbol()` или `Symbol(description)` создает уникальный символ, который невозможно найти через глобальный реестр. Один из сценариев использования `Symbol()` — дополнение объектов или пространств имен сторонних библиотек собственной логикой; при этом вы можете быть уверены, что ваш код не вступит в конфликт с обновлениями этой библиотеки. Например, если вы хотите добавить метод `refreshComponent` в класс `React.Component` и быть уверенными, что не перезапишете метод, который может появиться в одной из будущих версий библиотеки:

```javascript
const refreshComponent = Symbol();

React.Component.prototype[refreshComponent] = () => {
  // выполнение какого-либо действия
};
```

### Symbol.for(key)

Метод `Symbol.for(key)` создает символ, который также является неизменяемым и уникальным, но при этом доступен через глобальный реестр. Два вызова `Symbol.for(key)` с одним и тем же ключом вернут один и тот же экземпляр символа. ПРИМЕЧАНИЕ: Это не относится к
`Symbol(description)`:

```javascript
Symbol("foo") === Symbol("foo"); // false
Symbol.for("foo") === Symbol("foo"); // false
Symbol.for("foo") === Symbol.for("foo"); // true
```

Распространенный сценарий использования символов (Symbols) — в частности, с применением `Symbol.for(key)` — заключается в обеспечении взаимодействия между различными частями кода. Этого можно добиться, если ваш код будет искать наличие свойства, заданного символом, в...

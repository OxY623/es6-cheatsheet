# Шпаргалка es6

Шпаргалка с советами, хитростями, лучшими практиками и кодом ES2015 [ES6] Фрагменты примеров для вашего повседневного рабочего процесса. Вклады приветствуются!
Исходники матеала в папке './src/' можно запустить в node.js или в браузере.

## Содержание

- [var против let / const](#var-против-let--const)
- [Замена IIFEs на Блоки](#замена-iifes-на-блоки)
- [Стрелочные функции](#стрелочные-функции)
- [Строки](#strings)
- [Деструкторизация](#destructuring)
- [Модули](#modules)
- [Параметры](#parameters)
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

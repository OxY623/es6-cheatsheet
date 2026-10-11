# Шпаргалка es6

Шпаргалка с советами, хитростями, лучшими практиками и кодом ES2015 [ES6] Фрагменты примеров для вашего повседневного рабочего процесса. Вклады приветствуются!

## Содержание

- [var против let / const](#var-versus-let--const)
- [Замена IIFEs на блоки](#replacing-iifes-with-blocks)
- [Стрелочные функции](#arrow-functions)
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

> Кроме `var`, сейчас мы имеем домтуп к двум новым индефикаторам  для хранения значений
—`let` и `const`. В отличии от `var`, `let` и `const` утверждения не поднимаются
на вершину их окружающего скопа.

Пример использования `var`:

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false); // undefined
```

Однако, обратите внимание, что произойдет, если мы `var` заменим на `let`:

```javascript
let snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        let snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false); // 'Meow Mix'
```

Эти изменения в поведении подчеркивают, что мы должны быть осторожны, когда изменяем легаси код, который использует `var`. Слепая замена `var` на `let` может привести к неожиданному поведению.

> **Примечание**: `let` и `const` имеют блочную область видимости. Следовательно, ссылаясь на индификаторы в блочной области видимости до  их определения приведет к ошибке типа `ReferenceError`.

```javascript
console.log(x);

let x = 'hi'; // ReferenceError: x is not defined
```
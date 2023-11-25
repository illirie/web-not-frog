//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return (n ^ 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let m = [];
    for (let i = 2; i <= 20; i = i+2) {
        m.push(i);
    }
    return m;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sumToN = 0;
    for (let i = 0; i <= n; i++) {
        sumToN += i;
    }
    return sumToN;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    let sum = 0;
    if (n === 1) {
        return 1;
    }
    sum += recSumTo(n - 1) + n;
    return sum;
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let f = 1;
    for (let i = 1; i <= n; i++) {
        f *= i;
    }
    return f;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    if (n === 0) {
        return false;
    }
    if (n === 1) {
        return true;
    }
    while (n > 1) {
        if (n % 2 === 1) {
            return false;
        }
        n = (n - n % 2) / 2;
    }
    return true;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (arguments.length === 1 && isFinite(initialValue)) {
        return function (newValue) {
            return initialValue;
        };
    }
    if (arguments.length === 2 && isFinite(initialValue) && typeof operatorFn === 'function') {
        return function (newValue) {
            initialValue = operatorFn(initialValue, newValue);
            return initialValue;
        };
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    start -= step;
    return function() {
        return start += step;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (Object.is(firstObject, secondObject)) return true;
    if((typeof firstObject != "object") || (typeof secondObject != "object") || (firstObject === null) || (secondObject === null)) return firstObject === secondObject;
    else {
      if (Object.keys(firstObject).length != Object.keys(secondObject).length) return false;
      for (let key in firstObject) {
        if (secondObject.hasOwnProperty(key)) {
          if (!deepEqual(firstObject[key], secondObject[key]))
            return false;
        }
        else
          return false;
      }
      return true;
    }
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};

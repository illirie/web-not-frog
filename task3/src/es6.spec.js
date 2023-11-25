const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it('на вставку неправильной пары возвращается значение undefined', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.push([0, 1, 2], "word"), undefined);
            assert.strictEqual(dic.push("word", [0, 1]), undefined);
            assert.strictEqual(dic.push(null, "word"), undefined);
            assert.strictEqual(dic.push("word", null), undefined);
            assert.strictEqual(dic.push(null, null), undefined);
            assert.strictEqual(dic.push(undefined, undefined), undefined);
            assert.strictEqual(dic.push(undefined, "word"), undefined);
            assert.strictEqual(dic.push("word", undefined), undefined);
        });

        it('получение по несуществующему ключу', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.get("word"), undefined);
            assert.strictEqual(dic.get(undefined), undefined);
        });

        it('получение по существующему ключу', () => {
            const dic = new core.Dictionary();
            dic.push("bank", "tinkoff");
            assert.strictEqual(dic.get("bank"), "tinkoff");
        });
    });
});
import * as assert from 'assert';
import oc from '../src/lib';

describe('Basic tests', function () {

  it('Should recognize same plain object', function () {
    const obj = { a: 10, b: 10, c: 10 };
    assert.deepStrictEqual(oc(obj, obj), true);
  });

  it('Should recognize objects with optional properties', function () {
    const model = { a: null, b: null, c: null, d: '?' };
    const obj1 = { a: 10, b: 10, c: 10 };
    const obj2 = { a: 10, b: 10, c: 10, d: null };
    assert.deepStrictEqual(oc(obj2, model), true);
    assert.deepStrictEqual(oc(obj1, model), true);
  });

  it('Should recognize nested objects', function () {
    const model = { a: null, b: { c: null, d: { f: [{ g: null }, { m: null }] } } };
    const obj1 = { a: 10, b: { c: null, d: { f: [{ g: true }, { m: false }] } } };
    const obj2 = { a: 10, b: { c: null, d: { f: [{ g: true }, { M: true }] } } };
    assert.deepStrictEqual(oc(obj2, model), false);
    assert.deepStrictEqual(oc(obj1, model), true);
  });


  describe('Strict mode (also compare the values types)', function () {
    const strict = true;

    it('Should recognize same plain object with exact same types as model', function () {
      const model = { a: 'number', b: 'string' };
      const obj = { a: 10, b: 'meh' };
      assert.deepStrictEqual(oc(obj, model, strict), true);
    });

    it('Should recognize objects with optional properties', function () {
      const model = { a: null, b: null, c: null, d: '?' };
      const obj1 = { a: 10, b: 10, c: 10 };
      const obj2 = { a: 10, b: 10, c: 10, d: null };
      assert.deepStrictEqual(oc(obj2, model, strict), true);
      assert.deepStrictEqual(oc(obj1, model, strict), true);
    });

    it('Should recognize nested objects', function () {
      const model = { a: null, b: { c: null, d: { f: [{ g: null }, { m: null }] } } };
      const obj1 = { a: 10, b: { c: null, d: { f: [{ g: true }, { m: false }] } } };
      const obj2 = { a: 10, b: { c: null, d: { f: [{ g: true }, { M: true }] } } };
      assert.deepStrictEqual(oc(obj2, model, strict), false);
      assert.deepStrictEqual(oc(obj1, model, strict), true);
    });
  });
});

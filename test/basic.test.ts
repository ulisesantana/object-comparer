import * as assert from 'assert';
import oc from '../src/lib';

describe('Basic tests', function () {

  it('Should recognize same plain object', function () {
    const obj = { a: 10, b: 10, c: 10 };
    assert.deepStrictEqual(oc(obj, obj), true);
  });

  it('Should reject objects with different length', function () {
    const obj1 = { a: 10, b: 10, c: 10 };
    const obj2 = { a: 10, b: 10, c: 10, d: null };
    assert.deepStrictEqual(oc(obj1, obj2), false);
    assert.deepStrictEqual(oc(obj2, obj1), false);
  });

  it('Should recognize nested objects', function () {
    const obj1 = { a: 10, b: { c: null, d: { f: [{ g: true }, { m: false }] } } };
    const obj2 = { a: 10, b: { c: null, d: { f: [{ g: true }, { M: true }] } } };
    assert.deepStrictEqual(oc(obj1, obj2), false);
    assert.deepStrictEqual(oc(obj1, obj1), true);
  });

});

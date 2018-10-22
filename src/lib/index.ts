function checkType(modelValue: string, value): boolean {
  switch (modelValue) {
    case 'string':
      return isAString(value);
    case 'number':
      return typeof value === 'number';
    case 'array':
      return value instanceof Array;
    case 'object':
    default:
      return isAnObject(value);
  }
}

function hasProperty(obj: object, model: object, key: string, strict: boolean): boolean {
  return strict
    ? obj.hasOwnProperty(key) && checkTypes(processModelType(model[key]), obj[key])
    : obj.hasOwnProperty(key);
}

function isAString(s): boolean {
  return typeof s === 'string';
}

function isAnObject(o): boolean {
  return typeof o === 'object' && o !== null;
}

export function checkTypes(types: string[] | null, value): boolean {
  return !!types
    ? types.some((v) => checkType(v, value))
    : true
}

export default function objectComparer(obj: object, model: object, strict = false): boolean {
  return Object.entries(model).every(([key, value]) => {
    if (isAnObject(value)) {
      return objectComparer(obj[key], model[key]);
    } else if (hasProperty(obj, model, key, strict) || propertyIsOptional(model, key)) {
      return true
    }
    return false;
  });
}

export function processModelType(string: string): string[] | null {
  return isAString(string) && string !== '?'
    ? string.toLowerCase().replace(/\?/g, '').split('|')
    : null;
}

export function propertyIsOptional(model: object, key: string) {
  return !!model[key] && isAString(model[key]) && model[key].includes('?')
}
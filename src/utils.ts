export const isAString = (x): boolean => typeof x === 'string';
export const isANumber = (x): boolean => !isNaN(x);
export const isAnObject = (x): boolean => typeof x === 'object' && x !== null;
export const isAnArray = (x): boolean => x instanceof Array && x !== null;

export const hasProperty = (obj: object, model: object, key: string, strict: boolean): boolean => strict
  ? obj.hasOwnProperty(key) && checkTypes(processModelType(model[key]), obj[key])
  : obj.hasOwnProperty(key);

export const processModelType = (string: string): string[] | null => isAString(string) && string !== '?'
  ? string.toLowerCase().replace(/\?/g, '').split('|')
  : null;

export const propertyIsOptional = (model: object, key: string) =>
  !!model[key] && isAString(model[key]) && model[key].includes('?');

export function checkType(modelValue: string, value): boolean {
  switch (modelValue) {
    case 'string':
      return isAString(value);
    case 'number':
      return isANumber(value);
    case 'array':
      return isAnArray(value);
    case 'object':
    default:
      return isAnObject(value);
  }
}

export const checkTypes = (types: string[] | null, value): boolean => !!types
  ? types.some((v) => checkType(v, value))
  : true;

export default function objectComparer(obj: object, model: object, strict=false): boolean {
  return Object.entries(model).every(([key, value]) => {
    if (value instanceof Object) {
      return objectComparer(obj[key], model[key]);
    } else if (propertyIsOptional(model[key])) {
        return strict ? hasProperty(obj,model,key,strict) : true
    } else if (hasProperty(obj,model,key,strict)) {
      return true
    }
    return false;
  });
}

function hasProperty(obj: object, model: object, key: string, strict: boolean): boolean{
  return strict
    ? obj.hasOwnProperty(key) && checkTypes(processValue(model[key]), obj[key])
    : obj.hasOwnProperty(key);
}

function propertyIsOptional(modelValue: string | any): boolean{
  return typeof modelValue === 'string' && modelValue.includes('?')
}

function checkTypes(types: any[], value): boolean{
  return types.every((v) => checkType(value, v))
}

function checkType(value, modelValue): boolean{
  switch (modelValue){
    case 'string':
      return value instanceof String || typeof value === 'string';
    case 'number':
      return value instanceof Number || typeof value === 'number';
    case 'array':
      return value instanceof Array;
    case 'object':
    default:
      return value instanceof Object || typeof value === 'object';
  }
}

function processValue(string): string[] | null[]{
  return typeof string === 'string'
    ? string.toLowerCase().replace(/\?/g,'').split('|')
    : [null];
}
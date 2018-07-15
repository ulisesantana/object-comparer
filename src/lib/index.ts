export default function objectComparer(obj: object, model: object, strict=false): boolean {
  return Object.entries(model).every(([key, value]) => {
    if (value instanceof Object) {
      return objectComparer(obj[key], model[key]);
    } else if (hasProperty(obj,model,key,strict) || propertyIsOptional(model,key)) {
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

function propertyIsOptional(model: object, key: string){
  return model[key] && model[key] instanceof String && model[key].includes('?')
}

function checkTypes(types: any[], value): boolean{
  return types.every((v) => checkType(value, v))
}

function checkType(value, modelValue): boolean{
  switch (modelValue){
    case 'string':
      return value instanceof String;
    case 'number':
      return value instanceof Number;
    case 'array':
      return value instanceof Array;
    case 'object':
    default:
      return value instanceof Object || typeof value === 'object';
  }
}

function processValue(string): string[] | null[]{
  return string instanceof String 
    ? string.toLowerCase().replace(/\?/g,'').split('|')
    : [null];
}
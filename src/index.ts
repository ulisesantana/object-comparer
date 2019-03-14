import {hasProperty, isAnObject, propertyIsOptional} from "./utils";

function objectComparer(obj: object, model: object, strict = false): boolean {
  return Object.entries(model).every(([key, value]) => {
    if (isAnObject(value)) {
      return objectComparer(obj[key], model[key]);
    } else if (hasProperty(obj, model, key, strict) || propertyIsOptional(model, key)) {
      return true
    }
    return false;
  });
}

export function hasTheSameStructure(obj: object, model: object) {
  return objectComparer(obj, model);
}

export function hasTheSameModel(obj: object, model: object) {
  return objectComparer(obj, model, true);
}

export default {hasTheSameStructure, hasTheSameModel};
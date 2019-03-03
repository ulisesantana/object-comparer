import {hasProperty, isAnObject, propertyIsOptional} from "./utils";

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

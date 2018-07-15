export default function objectComparer(obj: object, model: object): boolean {
  if (Object.keys(obj).length > Object.keys(model).length) {
    return false;
  } else {
    return Object.entries(model).every(([key, value]) => {
      if (value instanceof Object) {
        return objectComparer(obj[key], model[key]);
      } else if (obj.hasOwnProperty(key)) {
        return true
      }
      return false;
    });
  }
}

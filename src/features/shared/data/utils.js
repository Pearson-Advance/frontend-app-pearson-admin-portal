export function removeNullOrEmptyObjectAttributes(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== null && object[key] !== '')
    .reduce((arr, key) => ({ ...arr, [key]: object[key] }), {});
}

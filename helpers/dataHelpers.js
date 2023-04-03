export const uniqueArrayElements = (arr1, arr2) => {
  const mergedArray = [...arr1, ...arr2];
  return [...new Set(mergedArray)];
};

export const flatten = (arr) => {
  return arr.reduce(function (flat, current) {
    return flat.concat(Array.isArray(current) ? flatten(current) : current);
  }, []);
}

export const uniqueArrayElements = (arr1, arr2) => {
  const mergedArray = [...arr1, ...arr2];
  return [...new Set(mergedArray)];
};

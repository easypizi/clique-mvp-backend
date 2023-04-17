export const uniqueArrayElements = (arr1, arr2) => {
  const mergedArray = [...arr1, ...arr2];
  return [...new Set(mergedArray)];
};

export const flatten = (arr) => {
  return arr.reduce(function (flat, current) {
    return flat.concat(Array.isArray(current) ? flatten(current) : current);
  }, []);
};

export const formatFileSize = (bytes) => {
  const units = ["bytes", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return bytes.toFixed(2) + " " + units[i];
};

export const getFileExtension = (filename) => {
  if (!filename) {
    return null;
  }

  return filename.split(".").pop();
};

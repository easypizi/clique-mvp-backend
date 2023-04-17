export const formatFilesData = (files) => {
  if (!files || !files.length) {
    return [];
  }

  return files.map(
    ({ space_id, file_name, file_id, file_size, file_type, file_url }) => {
      return {
        spaceId: space_id,
        name: file_name,
        id: file_id,
        size: file_size,
        type: file_type,
        url: file_url,
        date: file_date,
      };
    }
  );
};

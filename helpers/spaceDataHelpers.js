export const mergeSpacePermissions = (arr1, arr2) => {
  const mergedPermissions = [];
  const lookup = {};
  for (const permission of [...arr1, ...arr2]) {
    if (!lookup[permission.module_name]) {
      lookup[permission.module_name] = true;
      mergedPermissions.push(permission);
    } else {
      const index = mergedPermissions.findIndex(
        (p) => p.module_name === permission.module_name
      );
      if (index !== -1) {
        mergedPermissions[index].is_allowed = permission.is_allowed;
      }
    }
  }

  return mergedPermissions;
};

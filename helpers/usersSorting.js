export const sortUsers = (users) => {
  if (!users || !users.length) {
    return users;
  }

  const sortedUsers = users.sort((a, b) => {
    const nameComparison = a.userName.localeCompare(b.userName);
    const lastNameA = a.userLastName || "";
    const lastNameB = b.userLastName || "";
    const lastNameComparison = lastNameA.localeCompare(lastNameB);
    return nameComparison !== 0 ? nameComparison : lastNameComparison;
  });

  return sortedUsers;
};

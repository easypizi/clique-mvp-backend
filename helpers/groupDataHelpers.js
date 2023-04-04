export const formatGroupsData = (groups) => {
  if (!groups || !groups.length) {
    return [];
  }

  return groups.map(({ group_name, group_id, group_link, group_type }) => {
    return {
      groupId: group_id,
      groupName: group_name,
      groupLink: group_link,
      groupType: group_type
    };
  });
};

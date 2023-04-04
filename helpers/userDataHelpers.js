export const formatUsersData = (users) => {
  if (!users || !users.length) {
    return [];
  }
  return users.map(
    ({
      user_id,
      user_name,
      user_telegram_link,
      user_last_name,
      user_description,
      is_visible,
      user_image,
    }) => {
      return {
        userId: user_id,
        userName: user_name,
        userLastName: user_last_name,
        userLink: user_telegram_link,
        userDescription: user_description,
        isVisible: is_visible,
        userImage: user_image,
      };
    }
  );
};
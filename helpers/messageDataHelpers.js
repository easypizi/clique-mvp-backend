export const formatMessagesData = (messages) => {
  if (!messages || !messages.length) {
    return [];
  }

  return messages.map(
    ({
      message_id,
      message_group_id,
      message_date,
      message_text,
      message_tags,
      message_link,
      message_user_photo,
      message_user_name,
      message_space,
    }) => {
      return {
        date: message_date,
        userName: message_user_name,
        id: message_id,
        group_id: message_group_id,
        tags: message_tags,
        text: message_text,
        link: message_link,
        userPhoto: message_user_photo,
        spaces: message_space,
      };
    }
  );
};
